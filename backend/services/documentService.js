const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');
const storage = require('./storage');

const TEMPLATES_DIR = path.join(__dirname, '..', 'storage', 'templates');
const GENERATED_DIR = path.join(__dirname, '..', 'storage', 'generated');

if (!fs.existsSync(GENERATED_DIR)) {
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
}

class DocumentService {
  // Generate HTML preview for real-time split screen
  generatePreview(procedureId, formData) {
    const procedure = storage.getProcedure(procedureId);
    if (!procedure) throw new Error("Thủ tục không tồn tại");

    let content = procedure.templateContent || this.getDefaultHtmlTemplate(procedure);

    // Prepare date values
    const today = new Date();
    const replacements = {
      ngay_lap: String(today.getDate()).padStart(2, '0'),
      thang_lap: String(today.getMonth() + 1).padStart(2, '0'),
      nam_lap: String(today.getFullYear()),
      so_hop_dong: formData.so_hop_dong || `TP-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      co_quan_chung_thuc: formData.co_quan_chung_thuc || "xã Tiền Phong, huyện Mê Linh, thành phố Hà Nội",
      ...formData
    };

    // Replace all placeholders {{key}}
    let filled = content;
    for (const [key, val] of Object.entries(replacements)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      const displayVal = val ? String(val) : `<span class="bg-amber-100 text-amber-800 px-1 rounded font-medium border border-amber-300">[${key}]</span>`;
      filled = filled.replace(regex, displayVal);
    }

    // Add affirmation statement (Lời chứng chứng thực) at the end if not present
    if (!filled.includes("LỜI CHỨNG CỦA NGƯỜI THỰC HIỆN CHỨNG THỰC")) {
      filled += this.getAffirmationStatement(procedure, replacements);
    }

    return filled;
  }

  // Generate downloadable Word (.docx) file
  async generateDocx(procedureId, formData) {
    const procedure = storage.getProcedure(procedureId);
    if (!procedure) throw new Error("Thủ tục không tồn tại");

    const customDocxPath = path.join(TEMPLATES_DIR, `${procedureId}.docx`);

    // Check if an admin uploaded a real .docx template for this procedure
    if (fs.existsSync(customDocxPath)) {
      return this.fillExistingDocx(customDocxPath, formData);
    }

    // Otherwise, generate a fresh, perfectly formatted .docx using docx library
    return this.buildStandardDocx(procedure, formData);
  }

  fillExistingDocx(filePath, formData) {
    const content = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const today = new Date();
    const data = {
      ngay_lap: String(today.getDate()).padStart(2, '0'),
      thang_lap: String(today.getMonth() + 1).padStart(2, '0'),
      nam_lap: String(today.getFullYear()),
      ...formData
    };

    doc.render(data);
    const buf = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
    return buf;
  }

  async buildStandardDocx(procedure, formData) {
    const today = new Date();
    const d = String(today.getDate()).padStart(2, '0');
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = String(today.getFullYear());

    // Generate paragraphs
    const paragraphs = [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", bold: true, size: 26, font: "Times New Roman" }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "Độc lập - Tự do - Hạnh phúc", bold: true, size: 28, font: "Times New Roman" }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: "---------------------------------", size: 24, font: "Times New Roman" }),
        ],
      }),
      new Paragraph({ text: "", spacing: { after: 200 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: (procedure.title || "VĂN BẢN TƯ PHÁP").toUpperCase(), bold: true, size: 32, font: "Times New Roman", color: "1A365D" }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: `(Số: TP-${y}/${procedure.code || 'TP'})`, italics: true, size: 24, font: "Times New Roman" }),
        ],
        spacing: { after: 300 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Hôm nay, ngày ${d} tháng ${m} năm ${y}, chúng tôi gồm có:`, font: "Times New Roman", size: 26 }),
        ],
        spacing: { after: 150 }
      })
    ];

    // Add Fields content grouped
    const fields = procedure.fields || [];
    const benA = fields.filter(f => f.group === 'bena');
    const benB = fields.filter(f => f.group === 'benb');
    const taiSan = fields.filter(f => f.group === 'taisan');
    const dieuPhap = fields.filter(f => f.group === 'dieuphap');

    if (benA.length > 0) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: "I. BÊN THỨ NHẤT (BÊN A):", bold: true, font: "Times New Roman", size: 26 })],
        spacing: { before: 150, after: 100 }
      }));
      benA.forEach(f => {
        const val = formData[f.key] || "....................................................";
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `- ${f.label}: `, font: "Times New Roman", size: 26 }),
            new TextRun({ text: String(val), bold: true, font: "Times New Roman", size: 26 })
          ]
        }));
      });
    }

    if (benB.length > 0) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: "II. BÊN THỨ HAI (BÊN B):", bold: true, font: "Times New Roman", size: 26 })],
        spacing: { before: 200, after: 100 }
      }));
      benB.forEach(f => {
        const val = formData[f.key] || "....................................................";
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `- ${f.label}: `, font: "Times New Roman", size: 26 }),
            new TextRun({ text: String(val), bold: true, font: "Times New Roman", size: 26 })
          ]
        }));
      });
    }

    if (taiSan.length > 0) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: "III. TÀI SẢN VÀ HỒ SƠ PHÁP LÝ LIÊN QUAN:", bold: true, font: "Times New Roman", size: 26 })],
        spacing: { before: 200, after: 100 }
      }));
      taiSan.forEach(f => {
        const val = formData[f.key] || "....................................................";
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `- ${f.label}: `, font: "Times New Roman", size: 26 }),
            new TextRun({ text: String(val), font: "Times New Roman", size: 26 })
          ]
        }));
      });
    }

    if (dieuPhap.length > 0) {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: "IV. THỎA THUẬN VÀ NỘI DUNG CAM KẾT (ĐƯỢC CHUẨN HÓA BỞI AI PHÁP LÝ):", bold: true, font: "Times New Roman", size: 26 })],
        spacing: { before: 200, after: 100 }
      }));
      dieuPhap.forEach(f => {
        const val = formData[f.key] || "Hai bên tự nguyện cam kết thực hiện đúng quy định của pháp luật.";
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `${f.label}: `, bold: true, font: "Times New Roman", size: 26 }),
            new TextRun({ text: String(val), font: "Times New Roman", size: 26 })
          ],
          spacing: { after: 150 }
        }));
      });
    }

    // Signatures Table
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BÊN A", bold: true, size: 26, font: "Times New Roman" })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(Ký và ghi rõ họ tên)", italics: true, size: 24, font: "Times New Roman" })] }),
                new Paragraph({ text: "", spacing: { after: 800 } }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: formData.ben_a_ho_ten || formData.nguoi_lap_di_chuc || "", bold: true, size: 26, font: "Times New Roman" })] })
              ]
            }),
            new TableCell({
              borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BÊN B", bold: true, size: 26, font: "Times New Roman" })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(Ký và ghi rõ họ tên)", italics: true, size: 24, font: "Times New Roman" })] }),
                new Paragraph({ text: "", spacing: { after: 800 } }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: formData.ben_b_ho_ten || "", bold: true, size: 26, font: "Times New Roman" })] })
              ]
            })
          ]
        })
      ]
    });

    paragraphs.push(new Paragraph({ text: "", spacing: { before: 300 } }));
    paragraphs.push(table);

    // Official Affirmation Statement (Lời chứng)
    paragraphs.push(new Paragraph({ text: "", spacing: { before: 400 } }));
    paragraphs.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "LỜI CHỨNG CỦA NGƯỜI THỰC HIỆN CHỨNG THỰC", bold: true, size: 28, font: "Times New Roman", color: "9B2C2C" })
      ],
      spacing: { after: 150 }
    }));
    paragraphs.push(new Paragraph({
      children: [
        new TextRun({
          text: `Ngày ${d} tháng ${m} năm ${y}, tại Bộ phận Tiếp nhận và Trả kết quả UBND ${formData.co_quan_chung_thuc || "xã/phường..."}, Tôi là người tiếp nhận hồ sơ chứng nhận các bên tham gia giao dịch đã tự nguyện thỏa thuận, có đầy đủ năng lực hành vi dân sự, đã tự đọc lại toàn bộ văn bản và ký/điểm chỉ trước mặt tôi.`,
          font: "Times New Roman",
          size: 24
        })
      ]
    }));
    paragraphs.push(new Paragraph({
      children: [
        new TextRun({ text: `Số chứng thực: ......../2026/SCT/HĐGD    -    Quyển số: 01-TP/CC`, bold: true, font: "Times New Roman", size: 24 })
      ],
      spacing: { before: 100, after: 200 }
    }));

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1134, // ~2.0cm
              bottom: 1134,
              left: 1701, // ~3.0cm
              right: 1134 // ~2.0cm
            }
          }
        },
        children: paragraphs
      }]
    });

    return await Packer.toBuffer(doc);
  }

  getDefaultHtmlTemplate(procedure) {
    return `<div class="text-center font-bold text-lg mb-1">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
<div class="text-center font-semibold text-sm mb-4">Độc lập - Tự do - Hạnh phúc</div>
<div class="border-b-2 border-slate-700 w-48 mx-auto mb-6"></div>

<div class="text-center font-bold text-xl text-blue-900 mb-2 uppercase">${procedure.title}</div>
<div class="text-center italic text-sm text-slate-500 mb-6">Mã số: ${procedure.code} | Ngày lập: {{ngay_lap}}/{{thang_lap}}/{{nam_lap}}</div>

<div class="mb-4">Hôm nay, ngày {{ngay_lap}} tháng {{thang_lap}} năm {{nam_lap}}, chúng tôi gồm có:</div>

<div class="font-bold text-slate-800 text-base mb-2 border-b pb-1">I. THÔNG TIN BÊN GIAO KẾT THỨ NHẤT:</div>
${(procedure.fields || []).filter(f => f.group === 'bena').map(f => `<div class="mb-1 pl-2"><strong>${f.label}:</strong> {{${f.key}}}</div>`).join('')}

<div class="font-bold text-slate-800 text-base mt-4 mb-2 border-b pb-1">II. THÔNG TIN BÊN GIAO KẾT THỨ HAI:</div>
${(procedure.fields || []).filter(f => f.group === 'benb').map(f => `<div class="mb-1 pl-2"><strong>${f.label}:</strong> {{${f.key}}}</div>`).join('')}

<div class="font-bold text-slate-800 text-base mt-4 mb-2 border-b pb-1">III. THÔNG TIN TÀI SẢN & HỒ SƠ PHÁP LÝ:</div>
${(procedure.fields || []).filter(f => f.group === 'taisan').map(f => `<div class="mb-1 pl-2"><strong>${f.label}:</strong> {{${f.key}}}</div>`).join('')}

<div class="font-bold text-slate-800 text-base mt-4 mb-2 border-b pb-1">IV. NỘI DUNG THỎA THUẬN & CAM KẾT (TRỢ LÝ AI CHUỐT VĂN PHONG):</div>
${(procedure.fields || []).filter(f => f.group === 'dieuphap').map(f => `<div class="mb-2 p-3 bg-blue-50/70 border-l-4 border-blue-600 rounded">
  <div class="font-bold text-blue-900 mb-1">${f.label}:</div>
  <div class="leading-relaxed text-slate-800">{{${f.key}}}</div>
</div>`).join('')}

<div class="grid grid-cols-2 gap-8 text-center mt-12 mb-8">
  <div>
    <div class="font-bold uppercase">BÊN THỨ NHẤT</div>
    <div class="italic text-xs text-slate-500">(Ký và ghi rõ họ tên)</div>
    <div class="h-24"></div>
  </div>
  <div>
    <div class="font-bold uppercase">BÊN THỨ HAI</div>
    <div class="italic text-xs text-slate-500">(Ký và ghi rõ họ tên)</div>
    <div class="h-24"></div>
  </div>
</div>
`;
  }

  getAffirmationStatement(procedure, replacements) {
    return `
<div class="mt-8 pt-6 border-t-2 border-dashed border-red-300 bg-red-50/50 p-6 rounded-lg">
  <div class="text-center font-bold text-red-900 text-base uppercase mb-3">LỜI CHỨNG CỦA NGƯỜI THỰC HIỆN CHỨNG THỰC</div>
  <div class="text-sm text-slate-700 leading-relaxed mb-4">
    Ngày ${replacements.ngay_lap} tháng ${replacements.thang_lap} năm ${replacements.nam_lap}, tại Bộ phận Tiếp nhận và Trả kết quả UBND ${replacements.co_quan_chung_thuc || "xã Tiền Phong, huyện Mê Linh, thành phố Hà Nội"}.<br/>
    Tôi là người có thẩm quyền thực hiện chứng thực theo Nghị định 23/2015/NĐ-CP và Thông tư 01/2020/TT-BTP, chứng nhận các bên tham gia giao dịch đã tự nguyện giao kết, hoàn toàn minh mẫn, tự đọc lại toàn bộ nội dung văn bản này và đã cùng ký/điểm chỉ trước mặt tôi.
  </div>
  <div class="flex justify-between items-center text-xs font-semibold text-slate-600">
    <div>Số chứng thực: <span class="text-red-700 font-bold">....... / ${replacements.nam_lap} / SCT/HĐGD</span></div>
    <div>Quyển số: <span class="text-red-700 font-bold">01 - TP/CC-SCT</span></div>
  </div>
  <div class="text-right mt-6">
    <div class="text-xs font-bold uppercase text-slate-700">NGƯỜI THỰC HIỆN CHỨNG THỰC</div>
    <div class="italic text-xs text-slate-500">(Ký, đóng dấu và ghi rõ họ tên, chức vụ)</div>
    <div class="h-20"></div>
  </div>
</div>`;
  }
}

module.exports = new DocumentService();
