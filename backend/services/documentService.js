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

    // Official Affirmation Statement (Lời chứng theo Nghị định số 280/2025/NĐ-CP ngày 27/10/2025)
    paragraphs.push(new Paragraph({ text: "", spacing: { before: 300 } }));
    paragraphs.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: "────────────────────────────────────────", color: "94A3B8", font: "Times New Roman", size: 20 })
      ],
      spacing: { after: 150 }
    }));

    const certType = formData.loi_chung_loai || (procedure.category === 'thua-ke' ? (procedure.id.includes('di-chuc') ? 'mau_17' : 'mau_11') : 'mau_09');
    const hinhThucKy = formData.hinh_thuc_ky || "ký"; // 'ký', 'điểm chỉ', 'ký và điểm chỉ'
    const coQuan = formData.co_quan_chung_thuc || "Ủy ban nhân dân cấp xã";
    const diaDiem = formData.dia_diem_chung_thuc || `trụ sở ${coQuan}`;
    const soBanGoc = formData.so_ban_goc || "03";
    const soTo = formData.so_to || "02";
    const soTrang = formData.so_trang || "03";

    if (certType === 'mau_17') {
      // Mẫu số 17: Lời chứng chứng thực di chúc
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Mẫu số 17", bold: true, font: "Times New Roman", size: 24 })]
      }));
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "LỜI CHỨNG CHỨNG THỰC DI CHÚC", bold: true, font: "Times New Roman", size: 28, color: "1E3A8A" })],
        spacing: { after: 200 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Ngày ${d} tháng ${m} năm ${y} (Bằng chữ: ..........................................................................)`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `Tại: ${diaDiem}`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `Tôi: ................................................................, là: ................................................................`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: "Chứng thực:", bold: true, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `- Ông/bà: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_a_ho_ten || formData.nguoi_lap_di_chuc || "....................................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: ` Giấy tờ tùy thân số: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_a_cccd || formData.nguoi_lap_di_chuc_cccd || "........................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: ` đã tự nguyện lập di chúc này và đã cam đoan chịu trách nhiệm trước pháp luật về nội dung của di chúc.`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `- Tại thời điểm chứng thực, ông/bà `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_a_ho_ten || formData.nguoi_lap_di_chuc || "....................................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: ` minh mẫn, sáng suốt, nhận thức và làm chủ được hành vi của mình, tự nguyện lập di chúc và đã ${hinhThucKy} vào di chúc này trước mặt tôi.`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));
      if (formData.co_nguoi_lam_chung) {
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `(*) Người làm chứng: Ông/bà ${formData.nguoi_lam_chung_ten || "................................"}, Giấy tờ tùy thân số ${formData.nguoi_lam_chung_cccd || "................................"} do ${formData.nguoi_lam_chung_noi_cap || "Bộ Công an"} cấp ngày ${formData.nguoi_lam_chung_ngay_cap || "...................."}, có đủ điều kiện theo quy định của pháp luật, đã trực tiếp chứng kiến việc chứng thực và cam đoan chịu trách nhiệm trước pháp luật về việc làm chứng của mình, đã ký vào từng trang của di chúc trước sự chứng kiến của người thực hiện chứng thực.`, font: "Times New Roman", size: 24, italics: true })
          ],
          spacing: { after: 100 }
        }));
      }
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Di chúc này được lập thành ${soBanGoc} bản gốc (mỗi bản gốc gồm ${soTo} tờ, ${soTrang} trang); giao cho người lập di chúc 01 bản; lưu tại ${coQuan} 01 (một) bản.`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 150 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Số chứng thực: ........ quyển số: ........ -SCT/GD`, bold: true, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 200 }
      }));

      // Signature
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ text: "Người thực hiện chứng thực ký, ghi rõ họ, tên và đóng dấu", bold: true, italics: true, font: "Times New Roman", size: 24 })
        ],
        spacing: { after: 1000 }
      }));
    } else if (certType === 'mau_10') {
      // Mẫu số 10: Lời chứng chứng thực giao dịch tại Trung tâm Phục vụ hành chính công
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Mẫu số 10", bold: true, font: "Times New Roman", size: 24 })]
      }));
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "LỜI CHỨNG CHỨNG THỰC GIAO DỊCH\nTẠI TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG", bold: true, font: "Times New Roman", size: 28, color: "1E3A8A" })],
        spacing: { after: 200 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `Ngày ${d} tháng ${m} năm ${y} (Bằng chữ: ..........................................................................)`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `Tại: ${diaDiem}`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `Tôi: ................................................................, là: ................................................................`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: "Chứng thực:", bold: true, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `- Giao dịch: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: procedure.name || "Hợp đồng giao dịch", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: ` được giao kết giữa:\n`, font: "Times New Roman", size: 26 }),
          new TextRun({ text: `  Bên A: Ông/bà: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_a_ho_ten || "....................................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: `\n  Giấy tờ tùy thân số: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_a_cccd || "........................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: `\n  Bên B: Ông/bà: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_b_ho_ten || "....................................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: `\n  Giấy tờ tùy thân số: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_b_cccd || "........................................", bold: true, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `- Các bên tham gia giao dịch cam đoan chịu trách nhiệm trước pháp luật về nội dung của giao dịch.`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `- Tại thời điểm tiếp nhận hồ sơ yêu cầu và chứng thực, các bên tham gia giao dịch minh mẫn, nhận thức và làm chủ được hành vi của mình; tự nguyện thỏa thuận giao kết giao dịch và đã ${hinhThucKy} vào giao dịch này trước mặt ông/bà ................................................................ là người tiếp nhận hồ sơ.`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Giao dịch này được lập thành ${soBanGoc} bản gốc (mỗi bản gốc gồm ${soTo} tờ, ${soTrang} trang), cấp cho:\n+ Bên A: 01 bản gốc;\n+ Bên B: 01 bản gốc;\nLưu tại Trung tâm Phục vụ hành chính công: 01 (một) bản gốc.`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 150 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Số chứng thực: ........ quyển số: ........ -SCT/GD`, bold: true, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 200 }
      }));

      // Dual Signatures: Người tiếp nhận hồ sơ & Người thực hiện chứng thực
      const signTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Người tiếp nhận hồ sơ ký,\nghi rõ họ, tên", bold: true, italics: true, size: 24, font: "Times New Roman" })] }),
                  new Paragraph({ text: "", spacing: { after: 800 } })
                ]
              }),
              new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Người thực hiện chứng thực ký,\nghi rõ họ, tên và đóng dấu", bold: true, italics: true, size: 24, font: "Times New Roman" })] }),
                  new Paragraph({ text: "", spacing: { after: 800 } })
                ]
              })
            ]
          })
        ]
      });
      paragraphs.push(signTable);
    } else {
      // Mặc định Mẫu số 09: Lời chứng chứng thực giao dịch (Nghị định 280/2025/NĐ-CP trang 23-24)
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Mẫu số 09", bold: true, font: "Times New Roman", size: 24 })]
      }));
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "LỜI CHỨNG CHỨNG THỰC GIAO DỊCH", bold: true, font: "Times New Roman", size: 28, color: "1E3A8A" })],
        spacing: { after: 200 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Ngày ${d} tháng ${m} năm ${y} (Bằng chữ: ..........................................................................) (1)`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `Tại: ${diaDiem} (2)`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `Tôi (3): ......................................................................, là (4): ......................................................................`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: "Chứng thực", bold: true, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `- Giao dịch (5) `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: procedure.name || "Hợp đồng giao dịch", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: ` được giao kết giữa:\n`, font: "Times New Roman", size: 26 }),
          new TextRun({ text: `Bên A: Ông/bà: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_a_ho_ten || ".......................................................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: ` (6)\nGiấy tờ tùy thân (7) số `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_a_cccd || "...........................................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: `\nBên B: Ông/bà: `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_b_ho_ten || ".......................................................................", bold: true, font: "Times New Roman", size: 26 }),
          new TextRun({ text: ` (6)\nGiấy tờ tùy thân (7) số `, font: "Times New Roman", size: 26 }),
          new TextRun({ text: formData.ben_b_cccd || "...........................................................", bold: true, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: `- Các bên tham gia giao dịch đã cam đoan chịu trách nhiệm trước pháp luật về nội dung của giao dịch.`, font: "Times New Roman", size: 26 })],
        spacing: { after: 100 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `- Tại thời điểm chứng thực, các bên tham gia giao dịch minh mẫn, nhận thức và làm chủ được hành vi của mình; tự nguyện thỏa thuận giao kết giao dịch và đã ${hinhThucKy} (8) vào giao dịch này trước mặt tôi.`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 100 }
      }));

      // Bổ sung người làm chứng (*) nếu có
      if (formData.co_nguoi_lam_chung) {
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `(*) Trường hợp có người làm chứng: Ông/bà ${formData.nguoi_lam_chung_ten || "...................................................."}, Giấy tờ tùy thân số ${formData.nguoi_lam_chung_cccd || "........................................"} do ${formData.nguoi_lam_chung_noi_cap || "Bộ Công an"} cấp ngày ${formData.nguoi_lam_chung_ngay_cap || "...................."}, lý do: ${formData.nguoi_lam_chung_ly_do || "người yêu cầu chứng thực không tự đọc/ký được"}; người làm chứng có đủ điều kiện theo quy định của pháp luật, đã trực tiếp chứng kiến việc chứng thực; người làm chứng cam đoan chịu trách nhiệm trước pháp luật về việc làm chứng của mình, đã ký vào từng trang của giao dịch trước sự chứng kiến của người thực hiện chứng thực.`, font: "Times New Roman", size: 24, italics: true })
          ],
          spacing: { after: 100 }
        }));
      }

      // Bổ sung người phiên dịch (**) nếu có
      if (formData.co_nguoi_phien_dich) {
        paragraphs.push(new Paragraph({
          children: [
            new TextRun({ text: `(**) Trường hợp có người phiên dịch: Ông/bà ${formData.nguoi_phien_dich_ten || "...................................................."}, Giấy tờ tùy thân số ${formData.nguoi_phien_dich_cccd || "........................................"} do ${formData.nguoi_phien_dich_noi_cap || "Bộ Công an"} cấp ngày ${formData.nguoi_phien_dich_ngay_cap || "...................."}, lý do: ${formData.nguoi_phien_dich_ly_do || "người yêu cầu chứng thực không thạo tiếng Việt"}; người phiên dịch có đủ điều kiện theo quy định của pháp luật, đã dịch đầy đủ, chính xác nội dung của giao dịch, nội dung lời chứng; cam đoan chịu trách nhiệm trước pháp luật về việc phiên dịch và đã ký vào từng trang của giao dịch trước sự chứng kiến của người thực hiện chứng thực.`, font: "Times New Roman", size: 24, italics: true })
          ],
          spacing: { after: 100 }
        }));
      }

      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Giao dịch này được lập thành ${soBanGoc} bản gốc (mỗi bản gốc gồm ${soTo} tờ, ${soTrang} trang), cấp cho:\n+ Bên A: 01 bản gốc;\n+ Bên B: 01 bản gốc;\nLưu tại ${coQuan} 01 (một) bản gốc.`, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 150 }
      }));
      paragraphs.push(new Paragraph({
        children: [
          new TextRun({ text: `Số chứng thực: ........ quyển số: ........ (9) -SCT/GD`, bold: true, font: "Times New Roman", size: 26 })
        ],
        spacing: { after: 200 }
      }));

      // Signature block
      paragraphs.push(new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ text: "Người thực hiện chứng thực ký, ghi rõ họ, tên và đóng dấu", bold: true, italics: true, font: "Times New Roman", size: 24 })
        ],
        spacing: { after: 1000 }
      }));
    }

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
    const certType = replacements.loi_chung_loai || (procedure.category === 'thua-ke' ? (procedure.id.includes('di-chuc') ? 'mau_17' : 'mau_11') : 'mau_09');
    const hinhThucKy = replacements.hinh_thuc_ky || "ký"; // 'ký', 'điểm chỉ', 'ký và điểm chỉ'
    const coQuan = replacements.co_quan_chung_thuc || "Ủy ban nhân dân cấp xã";
    const diaDiem = replacements.dia_diem_chung_thuc || `trụ sở ${coQuan}`;
    const soBanGoc = replacements.so_ban_goc || "03";
    const soTo = replacements.so_to || "02";
    const soTrang = replacements.so_trang || "03";
    const d = replacements.ngay_lap || new Date().getDate();
    const m = replacements.thang_lap || (new Date().getMonth() + 1);
    const y = replacements.nam_lap || new Date().getFullYear();

    if (certType === 'mau_17') {
      // Mẫu số 17: Lời chứng chứng thực di chúc
      return `
<div class="mt-8 pt-6 border-t-2 border-dashed border-blue-400 bg-blue-50/40 p-6 rounded-xl font-serif text-slate-900">
  <div class="text-right text-xs font-bold text-slate-600 mb-1">Mẫu số 17</div>
  <div class="text-center font-bold text-blue-950 text-base uppercase mb-1">LỜI CHỨNG CHỨNG THỰC DI CHÚC</div>
  <div class="text-center text-xs italic text-slate-500 mb-4">(Ban hành kèm theo Nghị định số 280/2025/NĐ-CP ngày 27/10/2025 của Chính phủ)</div>

  <div class="text-sm leading-relaxed space-y-2 mb-4">
    <p>Ngày <strong>${d}</strong> tháng <strong>${m}</strong> năm <strong>${y}</strong> (Bằng chữ: ....................................................................) <sup>(1)</sup></p>
    <p>Tại: <strong>${diaDiem}</strong> <sup>(2)</sup></p>
    <p>Tôi <sup>(3)</sup>: ...................................................................., là <sup>(4)</sup>: ....................................................................</p>
    <p class="font-bold">Chứng thực</p>
    <p>- Ông/bà: <strong>${replacements.ben_a_ho_ten || replacements.nguoi_lap_di_chuc || "...................................................."}</strong> <sup>(5)</sup> Giấy tờ tùy thân <sup>(6)</sup> số <strong>${replacements.ben_a_cccd || replacements.nguoi_lap_di_chuc_cccd || "...................................."}</strong> đã tự nguyện lập di chúc này và đã cam đoan chịu trách nhiệm trước pháp luật về nội dung của di chúc.</p>
    <p>- Tại thời điểm chứng thực, ông/bà <strong>${replacements.ben_a_ho_ten || replacements.nguoi_lap_di_chuc || "...................................................."}</strong> <sup>(5)</sup> minh mẫn, sáng suốt, nhận thức và làm chủ được hành vi của mình, tự nguyện lập di chúc và đã <strong>${hinhThucKy}</strong> <sup>(7)</sup> vào di chúc này trước mặt tôi.</p>
    ${replacements.co_nguoi_lam_chung ? `
    <div class="p-3 bg-amber-50/80 border-l-4 border-amber-500 rounded text-xs italic text-slate-800">
      <strong>(*) Người làm chứng:</strong> Ông/bà <strong>${replacements.nguoi_lam_chung_ten || "................................"}</strong>, Giấy tờ tùy thân số <strong>${replacements.nguoi_lam_chung_cccd || "................................"}</strong> cấp ngày ${replacements.nguoi_lam_chung_ngay_cap || "................"} tại ${replacements.nguoi_lam_chung_noi_cap || "Bộ Công an"}; có đủ điều kiện làm chứng theo quy định của pháp luật, trực tiếp chứng kiến việc chứng thực, cam đoan chịu trách nhiệm trước pháp luật về việc làm chứng của mình và đã ký vào từng trang của di chúc trước sự chứng kiến của người thực hiện chứng thực.
    </div>` : ''}
    <p>Di chúc này được lập thành <strong>${soBanGoc}</strong> bản gốc (mỗi bản gốc gồm ${soTo} tờ, ${soTrang} trang); giao cho người lập di chúc 01 bản; lưu tại UBND cấp xã 01 (một) bản.</p>
  </div>

  <div class="flex justify-between items-center text-xs font-semibold text-slate-700 pt-3 border-t border-blue-200">
    <div>Số chứng thực: <span class="text-blue-900 font-bold">...................</span> quyển số <span class="text-blue-900 font-bold">.......... <sup>(8)</sup> -SCT/GD</span></div>
  </div>

  <div class="text-right mt-6">
    <div class="text-xs font-bold uppercase text-slate-800">Người thực hiện chứng thực ký, ghi rõ họ, tên và đóng dấu</div>
    <div class="h-20"></div>
  </div>
</div>`;
    }

    if (certType === 'mau_10') {
      // Mẫu số 10: Giao dịch tại Trung tâm Phục vụ hành chính công
      return `
<div class="mt-8 pt-6 border-t-2 border-dashed border-blue-400 bg-blue-50/40 p-6 rounded-xl font-serif text-slate-900">
  <div class="text-right text-xs font-bold text-slate-600 mb-1">Mẫu số 10</div>
  <div class="text-center font-bold text-blue-950 text-base uppercase mb-1">LỜI CHỨNG CHỨNG THỰC GIAO DỊCH<br/>TẠI TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG</div>
  <div class="text-center text-xs italic text-slate-500 mb-4">(Ban hành kèm theo Nghị định số 280/2025/NĐ-CP ngày 27/10/2025 của Chính phủ)</div>

  <div class="text-sm leading-relaxed space-y-2 mb-4">
    <p>Ngày <strong>${d}</strong> tháng <strong>${m}</strong> năm <strong>${y}</strong> (Bằng chữ: ....................................................................) <sup>(1)</sup></p>
    <p>Tại: <strong>${diaDiem}</strong> <sup>(2)</sup></p>
    <p>Tôi <sup>(3)</sup>: ...................................................................., là <sup>(4)</sup>: ....................................................................</p>
    <p class="font-bold">Chứng thực</p>
    <p>- Giao dịch <sup>(5)</sup>: <strong>${procedure.name || "Giao dịch"}</strong> được giao kết giữa:</p>
    <div class="pl-4">
      <p>Bên A: Ông/bà: <strong>${replacements.ben_a_ho_ten || "...................................................."}</strong> <sup>(6)</sup></p>
      <p>Giấy tờ tùy thân <sup>(7)</sup> số: <strong>${replacements.ben_a_cccd || "...................................."}</strong></p>
      <p>Bên B: Ông/bà: <strong>${replacements.ben_b_ho_ten || "...................................................."}</strong> <sup>(6)</sup></p>
      <p>Giấy tờ tùy thân <sup>(7)</sup> số: <strong>${replacements.ben_b_cccd || "...................................."}</strong></p>
    </div>
    <p>- Các bên tham gia giao dịch cam đoan chịu trách nhiệm trước pháp luật về nội dung của giao dịch.</p>
    <p>- Tại thời điểm tiếp nhận hồ sơ yêu cầu và chứng thực, các bên tham gia giao dịch minh mẫn, nhận thức và làm chủ được hành vi của mình; tự nguyện thỏa thuận giao kết giao dịch và đã <strong>${hinhThucKy}</strong> <sup>(8)</sup> vào giao dịch này trước mặt ông/bà ................................................................ là người tiếp nhận hồ sơ.</p>
    <p>Giao dịch này được lập thành <strong>${soBanGoc}</strong> bản gốc (mỗi bản gốc gồm ${soTo} tờ, ${soTrang} trang), cấp cho:<br/>
    + Bên A: 01 bản gốc;<br/>
    + Bên B: 01 bản gốc;<br/>
    Lưu tại <sup>(9)</sup> Trung tâm Phục vụ hành chính công: 01 (một) bản gốc.</p>
  </div>

  <div class="flex justify-between items-center text-xs font-semibold text-slate-700 pt-3 border-t border-blue-200">
    <div>Số chứng thực: <span class="text-blue-900 font-bold">...................</span> quyển số <span class="text-blue-900 font-bold">.......... <sup>(10)</sup> -SCT/GD</span></div>
  </div>

  <div class="grid grid-cols-2 gap-6 text-center mt-6">
    <div>
      <div class="text-xs font-bold text-slate-800">Người tiếp nhận hồ sơ ký,<br/>ghi rõ họ, tên</div>
      <div class="h-20"></div>
    </div>
    <div>
      <div class="text-xs font-bold text-slate-800">Người thực hiện chứng thực ký,<br/>ghi rõ họ, tên và đóng dấu</div>
      <div class="h-20"></div>
    </div>
  </div>
</div>`;
    }

    // Mặc định Mẫu số 09: Lời chứng chứng thực giao dịch (UBND xã / VP Công chứng)
    return `
<div class="mt-8 pt-6 border-t-2 border-dashed border-red-300 bg-red-50/40 p-6 rounded-xl font-serif text-slate-900">
  <div class="text-right text-xs font-bold text-slate-600 mb-1">Mẫu số 09</div>
  <div class="text-center font-bold text-red-950 text-base uppercase mb-1">LỜI CHỨNG CHỨNG THỰC GIAO DỊCH</div>
  <div class="text-center text-xs italic text-slate-500 mb-4">(Ban hành kèm theo Nghị định số 280/2025/NĐ-CP ngày 27/10/2025 của Chính phủ sửa đổi Nghị định 23/2015/NĐ-CP)</div>

  <div class="text-sm leading-relaxed space-y-2 mb-4">
    <p>Ngày <strong>${d}</strong> tháng <strong>${m}</strong> năm <strong>${y}</strong> (Bằng chữ: ....................................................................) <sup>(1)</sup></p>
    <p>Tại: <strong>${diaDiem}</strong> <sup>(2)</sup></p>
    <p>Tôi <sup>(3)</sup>: ...................................................................., là <sup>(4)</sup>: ....................................................................</p>
    <p class="font-bold">Chứng thực</p>
    <p>- Giao dịch <sup>(5)</sup>: <strong>${procedure.name || "Giao dịch"}</strong> được giao kết giữa:</p>
    <div class="pl-4">
      <p>Bên A: Ông/bà: <strong>${replacements.ben_a_ho_ten || "...................................................."}</strong> <sup>(6)</sup></p>
      <p>Giấy tờ tùy thân <sup>(7)</sup> số: <strong>${replacements.ben_a_cccd || "...................................."}</strong></p>
      <p>Bên B: Ông/bà: <strong>${replacements.ben_b_ho_ten || "...................................................."}</strong> <sup>(6)</sup></p>
      <p>Giấy tờ tùy thân <sup>(7)</sup> số: <strong>${replacements.ben_b_cccd || "...................................."}</strong></p>
    </div>
    <p>- Các bên tham gia giao dịch đã cam đoan chịu trách nhiệm trước pháp luật về nội dung của giao dịch.</p>
    <p>- Tại thời điểm chứng thực, các bên tham gia giao dịch minh mẫn, nhận thức và làm chủ được hành vi của mình; tự nguyện thỏa thuận giao kết giao dịch và đã <strong>${hinhThucKy}</strong> <sup>(8)</sup> vào giao dịch này trước mặt tôi.</p>
    
    ${replacements.co_nguoi_lam_chung ? `
    <div class="p-3 bg-amber-50/80 border-l-4 border-amber-500 rounded text-xs italic text-slate-800">
      <strong>(*) Người làm chứng:</strong> Ông/bà <strong>${replacements.nguoi_lam_chung_ten || "................................"}</strong>, Giấy tờ tùy thân số <strong>${replacements.nguoi_lam_chung_cccd || "................................"}</strong> do ${replacements.nguoi_lam_chung_noi_cap || "Bộ Công an"} cấp ngày ${replacements.nguoi_lam_chung_ngay_cap || "................"}; lý do: ${replacements.nguoi_lam_chung_ly_do || "người yêu cầu chứng thực không tự đọc/ký được"}; có đủ điều kiện làm chứng theo quy định của pháp luật, trực tiếp chứng kiến việc chứng thực, cam đoan chịu trách nhiệm trước pháp luật về việc làm chứng của mình và đã ký vào từng trang của giao dịch trước sự chứng kiến của người thực hiện chứng thực.
    </div>` : ''}

    ${replacements.co_nguoi_phien_dich ? `
    <div class="p-3 bg-emerald-50/80 border-l-4 border-emerald-500 rounded text-xs italic text-slate-800">
      <strong>(**) Người phiên dịch:</strong> Ông/bà <strong>${replacements.nguoi_phien_dich_ten || "................................"}</strong>, Giấy tờ tùy thân số <strong>${replacements.nguoi_phien_dich_cccd || "................................"}</strong> do ${replacements.nguoi_phien_dich_noi_cap || "Bộ Công an"} cấp ngày ${replacements.nguoi_phien_dich_ngay_cap || "................"}; lý do: ${replacements.nguoi_phien_dich_ly_do || "người yêu cầu chứng thực không thạo tiếng Việt"}; có đủ điều kiện theo quy định của pháp luật, đã dịch đầy đủ, chính xác nội dung giao dịch và lời chứng; cam đoan chịu trách nhiệm trước pháp luật về việc phiên dịch và đã ký vào từng trang của giao dịch trước sự chứng kiến của người thực hiện chứng thực.
    </div>` : ''}

    <p>Giao dịch này được lập thành <strong>${soBanGoc}</strong> bản gốc (mỗi bản gốc gồm ${soTo} tờ, ${soTrang} trang), cấp cho:<br/>
    + Bên A: 01 bản gốc;<br/>
    + Bên B: 01 bản gốc;<br/>
    Lưu tại <strong>${coQuan}</strong> 01 (một) bản gốc.</p>
  </div>

  <div class="flex justify-between items-center text-xs font-semibold text-slate-700 pt-3 border-t border-red-200">
    <div>Số chứng thực: <span class="text-red-700 font-bold">...................</span> quyển số <span class="text-red-700 font-bold">.......... <sup>(9)</sup> -SCT/GD</span></div>
  </div>

  <div class="text-right mt-6">
    <div class="text-xs font-bold uppercase text-slate-800">Người thực hiện chứng thực ký, ghi rõ họ, tên và đóng dấu</div>
    <div class="h-20"></div>
  </div>
</div>`;
  }
}

module.exports = new DocumentService();
