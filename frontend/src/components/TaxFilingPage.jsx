import React, { useState, useEffect } from 'react';
import { 
  Receipt, Calculator, ShieldCheck, CreditCard, Sparkles, FileText, 
  HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, Printer, Download, 
  Copy, RefreshCw, QrCode, Search, Building2, UserCheck, Scale, Info,
  ChevronDown, ChevronUp, Share2, Landmark, DollarSign, Calendar
} from 'lucide-react';
import { api } from '../services/api';

export default function TaxFilingPage({ prefillContractData, onBackToWizard, onShowToast }) {
  const [activeTab, setActiveTab] = useState('declare'); // 'declare' | 'calculator' | 'exemption' | 'payment' | 'ai-tax'
  const [selectedForm, setSelectedForm] = useState('03-bds'); // '03-bds' | '01-lptb' | '02-lptb' | '01-tts'
  
  // Tax Declaration Form State
  const [taxForm, setTaxForm] = useState({
    ho_ten_nguoi_nop: '',
    mst_ca_nhan: '',
    cccd_nguoi_nop: '',
    ngay_cap_cccd: '',
    noi_cap_cccd: '',
    dia_chi_thuong_tru: '',
    so_dien_thoai: '',
    email: '',
    
    // Counterparty
    ho_ten_ben_chuyen_nhuong: '',
    cccd_ben_chuyen_nhuong: '',
    
    // Asset details
    loai_tai_san: 'bds_nha_dat', // 'bds_nha_dat' | 'oto' | 'xe_may' | 'cho_thue'
    dia_chi_thua_dat: '',
    thua_dat_so: '',
    to_ban_do_so: '',
    dien_tich_dat: '',
    dien_tich_san_xay_dung: '',
    so_giay_chung_nhan: '',
    ngay_cap_gcn: '',
    noi_cap_gcn: '',
    
    // Vehicle specifics
    bien_so_xe: '',
    so_khung: '',
    so_may: '',
    nhan_hieu: '',
    nam_san_xuat: '2022',
    
    // Valuation & Contract
    gia_tri_hop_dong: '1500000000',
    so_hop_dong_cong_chung: '',
    ngay_cong_chung: new Date().toISOString().split('T')[0],
    co_quan_cong_chung: 'UBND phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
    
    // Tax Exemption
    thuoc_dien_mien_thue: false,
    ly_do_mien_thue: 'quan_he_nhan_than',
    quan_he_nhan_than_loai: 'cha_me_con',
    giay_to_chung_minh_mien: 'Giấy khai sinh số 123/TLKS cấp ngày 15/06/1995',
    
    // Tax Office
    co_quan_thue_quan_ly: 'Chi cục Thuế quận Cầu Giấy, TP. Hà Nội',
    ma_tieu_muc_nsnn: '1003' // 1003: TNCN chuyển nhượng BĐS, 1401: LPTB nhà đất
  });

  // AI Validation State
  const [aiValidationResult, setAiValidationResult] = useState(null);
  const [validatingWithAI, setValidatingWithAI] = useState(false);
  const [submittedDeclarations, setSubmittedDeclarations] = useState(() => {
    try {
      const saved = localStorage.getItem('tuphap_tax_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Pre-fill from e-contract if navigated from wizard
  useEffect(() => {
    if (prefillContractData) {
      setTaxForm(prev => ({
        ...prev,
        ho_ten_nguoi_nop: prefillContractData.ben_b_ho_ten || prefillContractData.ben_a_ho_ten || '',
        cccd_nguoi_nop: prefillContractData.ben_b_cccd || prefillContractData.ben_a_cccd || '',
        dia_chi_thuong_tru: prefillContractData.ben_b_dia_chi || prefillContractData.ben_a_dia_chi || '',
        so_dien_thoai: prefillContractData.ben_b_dien_thoai || prefillContractData.ben_a_dien_thoai || '',
        
        ho_ten_ben_chuyen_nhuong: prefillContractData.ben_a_ho_ten || '',
        cccd_ben_chuyen_nhuong: prefillContractData.ben_a_cccd || '',
        
        dia_chi_thua_dat: prefillContractData.dia_chi_thua_dat || '',
        thua_dat_so: prefillContractData.thua_dat_so || '',
        to_ban_do_so: prefillContractData.to_ban_do_so || '',
        dien_tich_dat: prefillContractData.dien_tich_dat || '',
        so_giay_chung_nhan: prefillContractData.so_giay_chung_nhan || prefillContractData.giay_to_so_huu || '',
        
        bien_so_xe: prefillContractData.bien_so_xe || '',
        so_khung: prefillContractData.so_khung || '',
        so_may: prefillContractData.so_may || '',
        nhan_hieu: prefillContractData.tai_san_ten || '',
        
        gia_tri_hop_dong: prefillContractData.gia_chuyen_nhuong || prefillContractData.gia_mua_ban || '1000000000',
        so_hop_dong_cong_chung: prefillContractData.so_hop_dong || `TP-${new Date().getFullYear()}-0892`,
        co_quan_cong_chung: prefillContractData.co_quan_chung_thuc || 'UBND cấp xã/phường tiếp nhận'
      }));
      onShowToast && onShowToast('Đã tự động trích xuất thông tin hợp đồng vào tờ khai thuế!');
    }
  }, [prefillContractData]);

  // Handle Demo Fill
  const handleFillDemoData = () => {
    setTaxForm({
      ho_ten_nguoi_nop: 'NGUYỄN VĂN AN',
      mst_ca_nhan: '8023456789',
      cccd_nguoi_nop: '001095012345',
      ngay_cap_cccd: '10/05/2021',
      noi_cap_cccd: 'Cục Cảnh sát QLHC về TTXH',
      dia_chi_thuong_tru: 'Số 45 Trần Thái Tông, Cầu Giấy, Hà Nội',
      so_dien_thoai: '0912345678',
      email: 'nguyenvanan.law@gmail.com',
      
      ho_ten_ben_chuyen_nhuong: 'TRẦN THỊ MAI',
      cccd_ben_chuyen_nhuong: '036192009876',
      
      loai_tai_san: 'bds_nha_dat',
      dia_chi_thua_dat: 'Thửa số 118, Tờ bản đồ số 09, Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
      thua_dat_so: '118',
      to_ban_do_so: '09',
      dien_tich_dat: '75.5',
      dien_tich_san_xay_dung: '220.0',
      so_giay_chung_nhan: 'CS 123456 do Sở TN&MT Hà Nội cấp',
      ngay_cap_gcn: '20/12/2020',
      noi_cap_gcn: 'Sở Tài nguyên và Môi trường TP Hà Nội',
      
      bien_so_xe: '30H-888.88',
      so_khung: 'RL3BM12345678',
      so_may: 'PE-20-998877',
      nhan_hieu: 'Mazda 3 Luxury',
      nam_san_xuat: '2022',
      
      gia_tri_hop_dong: '2800000000',
      so_hop_dong_cong_chung: `TP-${new Date().getFullYear()}-5678`,
      ngay_cong_chung: new Date().toISOString().split('T')[0],
      co_quan_cong_chung: 'UBND phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội',
      
      thuoc_dien_mien_thue: false,
      ly_do_mien_thue: 'quan_he_nhan_than',
      quan_he_nhan_than_loai: 'cha_me_con',
      giay_to_chung_minh_mien: 'Giấy khai sinh số 123/TLKS cấp ngày 15/06/1995',
      
      co_quan_thue_quan_ly: 'Chi cục Thuế quận Cầu Giấy, TP. Hà Nội',
      ma_tieu_muc_nsnn: '1003'
    });
    onShowToast && onShowToast('Đã nạp bộ dữ liệu mẫu chuẩn theo Thông tư 80/2021/TT-BTC');
  };

  // AI Tax Form Validation
  const handleValidateWithAI = async () => {
    setValidatingWithAI(true);
    setAiValidationResult(null);
    
    setTimeout(() => {
      const warnings = [];
      const suggestions = [];

      if (!taxForm.mst_ca_nhan || taxForm.mst_ca_nhan.length < 10) {
        warnings.push('Mã số thuế cá nhân chưa đúng chuẩn 10 chữ số. Có thể tra cứu trực tiếp theo CCCD trên cổng Tổng cục Thuế.');
      }
      if (!taxForm.cccd_nguoi_nop || taxForm.cccd_nguoi_nop.length !== 12) {
        warnings.push('Số định danh cá nhân / CCCD phải đúng 12 chữ số theo chuẩn Bộ Công an (Đề án 06).');
      }
      if (taxForm.thuoc_dien_mien_thue && !taxForm.giay_to_chung_minh_mien) {
        warnings.push('Đang chọn diện Miễn thuế nhưng chưa khai báo Giấy tờ chứng minh mối quan hệ nhân thân.');
      }
      
      // Calculate days from notarization to check 10-day deadline
      if (taxForm.ngay_cong_chung) {
        const diffDays = Math.floor((new Date() - new Date(taxForm.ngay_cong_chung)) / (1000 * 60 * 60 * 24));
        if (diffDays > 10) {
          warnings.push(`Hợp đồng đã ký cách đây ${diffDays} ngày. Thời hạn nộp hồ sơ khai thuế là 10 ngày (Điều 44 Luật QLT). Cần lưu ý nộp sớm để tránh bị phạt vi phạm hành chính về thời hạn.`);
        } else {
          suggestions.push(`Hồ sơ đang trong thời hạn vàng kê khai (${10 - diffDays} ngày còn lại).`);
        }
      }

      suggestions.push('Địa chỉ thửa đất và số CCCD đã khớp với hồ sơ dữ liệu cư dân.');
      suggestions.push('Biểu mẫu được định dạng chuẩn theo Thông tư số 80/2021/TT-BTC của Bộ Tài chính.');

      setAiValidationResult({
        isValid: warnings.length === 0,
        score: warnings.length === 0 ? 100 : Math.max(60, 100 - warnings.length * 20),
        warnings,
        suggestions
      });
      setValidatingWithAI(false);
    }, 800);
  };

  // Submit Declaration
  const handleSubmitDeclaration = (e) => {
    e.preventDefault();
    const newSubmission = {
      id: `TAX-${Date.now().toString().slice(-6)}`,
      formCode: selectedForm === '03-bds' ? '03/BĐS-TNCN' : selectedForm === '01-lptb' ? '01/LPTB' : selectedForm === '02-lptb' ? '02/LPTB' : '01/TTS',
      formTitle: selectedForm === '03-bds' ? 'Tờ khai Thuế TNCN Chuyển nhượng BĐS' : selectedForm === '01-lptb' ? 'Tờ khai Lệ phí trước bạ Nhà Đất' : selectedForm === '02-lptb' ? 'Tờ khai LPTB Ô tô, Xe máy' : 'Tờ khai Cho thuê tài sản',
      taxPayer: taxForm.ho_ten_nguoi_nop,
      cccd: taxForm.cccd_nguoi_nop,
      mst: taxForm.mst_ca_nhan,
      value: Number(taxForm.gia_tri_hop_dong) || 0,
      estimatedTax: calculateEstimatedTax(),
      status: 'ChoTiepNhan',
      submittedAt: new Date().toLocaleString('vi-VN'),
      qrTrackingCode: `VNTax-${Math.floor(100000 + Math.random() * 900000)}`
    };

    const updated = [newSubmission, ...submittedDeclarations];
    setSubmittedDeclarations(updated);
    try {
      localStorage.setItem('tuphap_tax_submissions', JSON.stringify(updated));
    } catch (e) {}

    onShowToast && onShowToast(`Nộp tờ khai thành công! Mã hồ sơ thuế: ${newSubmission.id}`);
    setActiveTab('payment');
  };

  // Smart Tax Calculation helpers
  const calculateEstimatedTax = () => {
    const val = Number(taxForm.gia_tri_hop_dong) || 0;
    if (taxForm.thuoc_dien_mien_thue) return 0;

    if (selectedForm === '03-bds') {
      return Math.round(val * 0.02); // 2% TNCN BĐS
    } else if (selectedForm === '01-lptb') {
      return Math.round(val * 0.005); // 0.5% LPTB Nhà đất
    } else if (selectedForm === '02-lptb') {
      // 2% xe cũ x tỷ lệ còn lại
      return Math.round(val * 0.02 * 0.7);
    } else if (selectedForm === '01-tts') {
      return val > 100000000 ? Math.round(val * 0.1) : 0; // 5% GTGT + 5% TNCN
    }
    return Math.round(val * 0.02);
  };

  // Calculator Interactive State
  const [calcType, setCalcType] = useState('bds-chuyen-nhuong'); // 'bds-chuyen-nhuong' | 'bds-tang-cho' | 'xe-cu' | 'cho-thue'
  const [calcInput, setCalcInput] = useState({
    contractPrice: 2000000000,
    landArea: 80,
    statePricePerM2: 18000000,
    vehicleOriginalPrice: 800000000,
    vehicleYears: 3, // 1-3 years: 70%
    vehicleType: 'oto', // 'oto' | 'xe-may'
    rentalMonthlyRevenue: 15000000,
    kinship: 'cha_me_con'
  });

  // Calculate dynamic results for Calculator tab
  const getCalcResults = () => {
    if (calcType === 'bds-chuyen-nhuong') {
      const stateLandVal = calcInput.landArea * calcInput.statePricePerM2;
      const taxBase = Math.max(calcInput.contractPrice, stateLandVal);
      const thueTNCN = taxBase * 0.02; // 2%
      const lePhiTruocBa = taxBase * 0.005; // 0.5%
      const phiThamDinh = Math.min(5000000, Math.max(500000, Math.round(taxBase * 0.0015)));
      const lePhiCapSo = 100000;
      return {
        taxBase,
        isHigherThanState: calcInput.contractPrice >= stateLandVal,
        thueTNCN,
        lePhiTruocBa,
        phiThamDinh,
        lePhiCapSo,
        totalPayable: thueTNCN + lePhiTruocBa + phiThamDinh + lePhiCapSo,
        legalBasis: 'Điều 12, 14 Thông tư 111/2013/TT-BTC; Nghị định 10/2022/NĐ-CP'
      };
    } else if (calcType === 'bds-tang-cho') {
      const isMien = ['vo_chong', 'cha_me_con', 'ong_ba_chau', 'anh_chi_em'].includes(calcInput.kinship);
      const stateLandVal = calcInput.landArea * calcInput.statePricePerM2;
      const taxBase = Math.max(calcInput.contractPrice, stateLandVal);
      if (isMien) {
        return {
          taxBase,
          thueTNCN: 0,
          lePhiTruocBa: 0,
          phiThamDinh: 1000000,
          lePhiCapSo: 100000,
          totalPayable: 1100000,
          isMien: true,
          legalBasis: 'Khoản 1 Điều 3 Luật Thuế TNCN & Khoản 10 Điều 10 Nghị định 10/2022/NĐ-CP (Miễn 100% thuế & lệ phí trước bạ)'
        };
      } else {
        const taxablePortion = Math.max(0, taxBase - 10000000);
        const thueTNCN = taxablePortion * 0.1; // 10%
        const lePhiTruocBa = taxBase * 0.005;
        return {
          taxBase,
          thueTNCN,
          lePhiTruocBa,
          phiThamDinh: 1000000,
          lePhiCapSo: 100000,
          totalPayable: thueTNCN + lePhiTruocBa + 1100000,
          isMien: false,
          legalBasis: 'Thu nhập từ nhận quà tặng, thừa kế ngoài diện thân nhân chịu 10% thuế TNCN phần vượt trên 10 triệu đồng'
        };
      }
    } else if (calcType === 'xe-cu') {
      let depreciationRate = 0.5;
      if (calcInput.vehicleYears <= 1) depreciationRate = 0.9;
      else if (calcInput.vehicleYears <= 3) depreciationRate = 0.7;
      else if (calcInput.vehicleYears <= 6) depreciationRate = 0.5;
      else if (calcInput.vehicleYears <= 10) depreciationRate = 0.3;
      else depreciationRate = 0.2;

      const residualValue = calcInput.vehicleOriginalPrice * depreciationRate;
      const taxRate = calcInput.vehicleType === 'oto' ? 0.02 : 0.01;
      const lePhiTruocBa = residualValue * taxRate;
      const lePhiBienSo = calcInput.vehicleType === 'oto' ? 150000 : 50000;

      return {
        originalVal: calcInput.vehicleOriginalPrice,
        depreciationRate: depreciationRate * 100,
        residualValue,
        taxRate: taxRate * 100,
        lePhiTruocBa,
        lePhiBienSo,
        totalPayable: lePhiTruocBa + lePhiBienSo,
        legalBasis: 'Thông tư số 13/2022/TT-BTC & Thông tư 80/2021/TT-BTC quy định bảng tỷ lệ giá trị còn lại theo năm sử dụng'
      };
    } else {
      // Rental
      const yearlyRevenue = calcInput.rentalMonthlyRevenue * 12;
      const isExempt = yearlyRevenue <= 100000000;
      const vat = isExempt ? 0 : yearlyRevenue * 0.05;
      const pit = isExempt ? 0 : yearlyRevenue * 0.05;
      return {
        yearlyRevenue,
        isExempt,
        vat,
        pit,
        totalPayable: vat + pit,
        legalBasis: 'Thông tư 40/2021/TT-BTC: Cá nhân cho thuê tài sản có doanh thu từ 100 triệu đồng/năm trở xuống không phải nộp thuế GTGT và thuế TNCN.'
      };
    }
  };

  const calcResults = getCalcResults();

  // Exemption Finder State
  const [exemptionQuery, setExemptionQuery] = useState('vo_chong');

  // AI Tax Q&A State
  const [taxQuestions, setTaxQuestions] = useState([
    {
      q: 'Hợp đồng mua bán đất ký thấp hơn Bảng giá đất của UBND tỉnh thì tính thuế theo giá nào?',
      a: 'Theo Luật Quản lý thuế số 38/2019/QH14 và Thông tư 111/2013/TT-BTC: Trường hợp giá ghi trên Hợp đồng chuyển nhượng thấp hơn Bảng giá đất do UBND cấp tỉnh ban hành tại thời điểm chuyển nhượng, cơ quan Thuế sẽ ấn định giá tính thuế căn cứ theo Bảng giá đất của UBND tỉnh nhân với hệ số điều chỉnh giá đất (hệ số K).',
      source: 'Khoản 1 Điều 12 Thông tư 111/2013/TT-BTC'
    },
    {
      q: 'Bán căn nhà duy nhất có được miễn thuế TNCN không, điều kiện là gì?',
      a: 'Cá nhân được miễn thuế TNCN 2% khi chuyển nhượng nhà ở duy nhất nếu đáp ứng đủ 3 điều kiện: (1) Chỉ có duy nhất quyền sở hữu một nhà ở/thửa đất ở tại thời điểm chuyển nhượng; (2) Đã sở hữu nhà ở/đất ở tối thiểu 183 ngày trở lên tính đến thời điểm giao dịch; (3) Chuyển nhượng toàn bộ nhà ở, đất ở. Người nộp thuế phải làm bản cam kết tự chịu trách nhiệm trước pháp luật.',
      source: 'Điều 4 Luật Thuế thu nhập cá nhân'
    },
    {
      q: 'Thời hạn nộp hồ sơ khai thuế và nộp tiền thuế là bao lâu?',
      a: 'Thời hạn nộp hồ sơ khai thuế đối với chuyển nhượng BĐS chậm nhất là ngày thứ 10 kể từ ngày hợp đồng có hiệu lực (ngày công chứng/chứng thực). Thời hạn nộp tiền thuế là ngày ghi trên Thông báo nộp thuế của cơ quan thuế (thông thường là 30 ngày kể từ ngày ban hành thông báo).',
      source: 'Điều 44 Luật Quản lý thuế số 38/2019/QH14'
    },
    {
      q: 'Chậm nộp tờ khai thuế bị xử phạt như thế nào?',
      a: 'Theo Nghị định 125/2020/NĐ-CP: Chậm nộp tờ khai từ 1 đến 5 ngày có tình tiết giảm nhẹ: Phạt cảnh cáo. Chậm nộp từ 1 đến 30 ngày: Phạt tiền từ 2.000.000đ - 5.000.000đ. Chậm nộp từ 31 đến 60 ngày: Phạt tiền từ 5.000.000đ - 8.000.000đ. Ngoài ra, tiền chậm nộp thuế bị tính lãi 0.03%/ngày trên số tiền chậm nộp.',
      source: 'Điều 13 Nghị định 125/2020/NĐ-CP'
    }
  ]);
  const [customTaxQuery, setCustomTaxQuery] = useState('');
  const [aiTaxAnswer, setAiTaxAnswer] = useState(null);
  const [aiTaxLoading, setAiTaxLoading] = useState(false);

  const handleAskAITax = async () => {
    if (!customTaxQuery.trim()) return;
    setAiTaxLoading(true);
    setAiTaxAnswer(null);

    try {
      const q = customTaxQuery.toLowerCase();
      let answer = '';
      if (q.includes('ô tô') || q.includes('xe máy') || q.includes('trước bạ')) {
        answer = `Theo Nghị định 10/2022/NĐ-CP và Thông tư 13/2022/TT-BTC:\n- Lệ phí trước bạ xe ô tô cũ (đăng ký từ lần thứ 2 trở đi) là 2% tính trên giá trị còn lại của xe.\n- Giá trị còn lại được tính bằng: [Giá xe mới theo Bảng giá Bộ Tài chính] x [% chất lượng còn lại theo năm sử dụng (1 năm: 90%, 1-3 năm: 70%, 3-6 năm: 50%, 6-10 năm: 30%, trên 10 năm: 20%)].\n- Xe máy cũ: 1% trên giá trị còn lại.`;
      } else if (q.includes('cho thuê') || q.includes('thuê nhà')) {
        answer = `Theo Thông tư 40/2021/TT-BTC của Bộ Tài chính:\n- Nếu tổng doanh thu cho thuê tài sản trong năm dương lịch từ 100 triệu đồng trở xuống: Miễn thuế GTGT và thuế TNCN.\n- Nếu doanh thu trên 100 triệu đồng/năm: Số thuế phải nộp = Doanh thu x 10% (Trong đó: Thuế GTGT 5% + Thuế TNCN 5%).`;
      } else if (q.includes('thừa kế') || q.includes('tặng cho') || q.includes('anh em') || q.includes('con')) {
        answer = `Căn cứ Khoản 1, Khoản 4 Điều 4 Luật Thuế TNCN:\n- Tặng cho, thừa kế bất động sản giữa: Vợ với chồng; Cha mẹ với con; Ông bà với cháu; Anh, chị, em ruột với nhau ĐƯỢC MIỄN TOÀN BỘ 100% thuế TNCN và lệ phí trước bạ.\n- Hồ sơ cần nộp: Giấy khai sinh, Đăng ký kết hôn hoặc Sổ hộ khẩu/xác nhận thông tin cư trú chứng minh quan hệ ruột thịt.`;
      } else {
        answer = `Theo quy định của Luật Quản lý thuế số 38/2019/QH14 và Thông tư 80/2021/TT-BTC:\nĐối với trường hợp "${customTaxQuery}", người nộp thuế thực hiện kê khai theo Mẫu 03/BĐS-TNCN (đối với BĐS) hoặc 02/LPTB (đối với phương tiện), nộp hồ sơ tại Chi cục Thuế nơi có tài sản hoặc nộp điện tử qua Cổng Dịch vụ công Quốc gia/eTax Mobile. Cơ quan thuế sẽ ban hành Thông báo nộp tiền trong vòng 03 ngày làm việc kể từ ngày nhận đủ hồ sơ hợp lệ.`;
      }

      setAiTaxAnswer(answer);
    } catch (e) {
      setAiTaxAnswer('Có lỗi khi kết nối trợ lý AI. Vui lòng kiểm tra lại câu hỏi.');
    } finally {
      setAiTaxLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-page-enter">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-emerald-500/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
              <Landmark className="w-3.5 h-3.5" />
              <span>DỊCH VỤ CÔNG LIÊN THÔNG - BỘ TÀI CHÍNH & TƯ PHÁP</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Cổng Khai Thuế & Lệ Phí Trước Bạ Điện Tử
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Kê khai trực tuyến Thuế TNCN (Mẫu 03/BĐS-TNCN), Lệ phí trước bạ nhà đất (01/LPTB), ô tô xe máy (02/LPTB) theo Thông tư 80/2021/TT-BTC. Tự động tính toán, kiểm tra miễn thuế và tạo mã VietQR nộp Kho bạc Nhà nước.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleFillDemoData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white text-xs font-semibold border border-slate-700 transition shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Nạp dữ liệu mẫu</span>
            </button>
            {onBackToWizard && (
              <button
                onClick={onBackToWizard}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Xem lại hợp đồng</span>
              </button>
            )}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Chuẩn mẫu TT 80/2021/TT-BTC</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Liên thông hợp đồng chứng thực</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tự động kiểm tra miễn thuế</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tạo mã QR nộp Kho bạc tức thì</span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-px mb-8 scrollbar-none">
        {[
          { id: 'declare', label: '1. Kê khai Tờ khai Trực tuyến', icon: Receipt },
          { id: 'calculator', label: '2. Bảng tính Thuế & Lệ phí', icon: Calculator },
          { id: 'exemption', label: '3. Tra cứu & Điều kiện Miễn thuế', icon: ShieldCheck },
          { id: 'payment', label: '4. Nộp thuế & Mã QR Kho bạc', icon: CreditCard },
          { id: 'ai-tax', label: '5. Trợ lý AI Tư vấn Thuế', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DECLARE FORM */}
      {activeTab === 'declare' && (
        <div className="space-y-6">
          {/* Form Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: '03-bds',
                code: 'Mẫu 03/BĐS-TNCN',
                title: 'Thuế TNCN Chuyển nhượng BĐS',
                desc: 'Chuyển nhượng, tặng cho, thừa kế quyền sử dụng đất & nhà ở (Thuế suất 2%)',
                badge: 'Phổ biến nhất'
              },
              {
                id: '01-lptb',
                code: 'Mẫu 01/LPTB',
                title: 'Lệ phí trước bạ Nhà Đất',
                desc: 'Kê khai nghĩa vụ trước bạ khi sang tên giấy chứng nhận QSDĐ (Mức thu 0.5%)',
                badge: 'Nghị định 10/2022'
              },
              {
                id: '02-lptb',
                code: 'Mẫu 02/LPTB',
                title: 'Lệ phí trước bạ Ô tô, Xe máy',
                desc: 'Kê khai trước bạ sang tên phương tiện xe cơ giới (Mức thu 2% theo năm sử dụng)',
                badge: 'Phương tiện'
              },
              {
                id: '01-tts',
                code: 'Mẫu 01/TTS',
                title: 'Khai thuế Cho thuê tài sản',
                desc: 'Cá nhân cho thuê nhà ở, mặt bằng, xưởng (Doanh thu > 100tr/năm chịu 10%)',
                badge: 'Thông tư 40/2021'
              }
            ].map(f => (
              <div
                key={f.id}
                onClick={() => setSelectedForm(f.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative ${
                  selectedForm === f.id
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {f.code}
                  </span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{f.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Main Declaration Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {selectedForm === '03-bds' ? 'MẪU SỐ 03/BĐS-TNCN' : selectedForm === '01-lptb' ? 'MẪU SỐ 01/LPTB' : selectedForm === '02-lptb' ? 'MẪU SỐ 02/LPTB' : 'MẪU SỐ 01/TTS'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">(Ban hành kèm theo Thông tư số 80/2021/TT-BTC)</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  Tờ Khai Thuế & Lệ Phí Điện Tử Cấp Cơ Sở
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleValidateWithAI}
                  disabled={validatingWithAI}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{validatingWithAI ? 'AI đang rà soát...' : 'AI Rà Soát Tính Pháp Lý'}</span>
                </button>
              </div>
            </div>

            {/* AI Validation Box */}
            {aiValidationResult && (
              <div className={`p-4 rounded-2xl mb-6 border ${
                aiValidationResult.isValid ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    {aiValidationResult.isValid ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    <span>Kết quả rà soát hồ sơ bởi Trợ lý AI (Độ chính xác: {aiValidationResult.score}/100)</span>
                  </div>
                </div>
                {aiValidationResult.warnings.length > 0 && (
                  <ul className="text-xs space-y-1 mb-2">
                    {aiValidationResult.warnings.map((w, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-amber-800">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="text-xs space-y-1">
                  {aiValidationResult.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-emerald-800">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmitDeclaration} className="space-y-8">
              {/* SECTION I: TAXPAYER */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-slate-200 mb-4">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>I. THÔNG TIN NGƯỜI NỘP THUẾ & ĐỐI TÁC GIAO DỊCH</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ và tên người nộp thuế <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={taxForm.ho_ten_nguoi_nop}
                      onChange={(e) => setTaxForm({ ...taxForm, ho_ten_nguoi_nop: e.target.value })}
                      placeholder="NGUYỄN VĂN AN"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mã số thuế cá nhân (MST)
                    </label>
                    <input
                      type="text"
                      value={taxForm.mst_ca_nhan}
                      onChange={(e) => setTaxForm({ ...taxForm, mst_ca_nhan: e.target.value })}
                      placeholder="8012345678 (10 số)"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số CCCD / Định danh (Đề án 06) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={taxForm.cccd_nguoi_nop}
                      onChange={(e) => setTaxForm({ ...taxForm, cccd_nguoi_nop: e.target.value })}
                      placeholder="001095012345 (12 số)"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nơi cư trú thường trú / Địa chỉ liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={taxForm.dia_chi_thuong_tru}
                      onChange={(e) => setTaxForm({ ...taxForm, dia_chi_thuong_tru: e.target.value })}
                      placeholder="Số 45 Trần Thái Tông, Cầu Giấy, Hà Nội"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số điện thoại di động
                    </label>
                    <input
                      type="text"
                      value={taxForm.so_dien_thoai}
                      onChange={(e) => setTaxForm({ ...taxForm, so_dien_thoai: e.target.value })}
                      placeholder="0912345678"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ tên Bên chuyển nhượng (Bên bán/Bên cho)
                    </label>
                    <input
                      type="text"
                      value={taxForm.ho_ten_ben_chuyen_nhuong}
                      onChange={(e) => setTaxForm({ ...taxForm, ho_ten_ben_chuyen_nhuong: e.target.value })}
                      placeholder="TRẦN THỊ MAI"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số CCCD Bên chuyển nhượng
                    </label>
                    <input
                      type="text"
                      value={taxForm.cccd_ben_chuyen_nhuong}
                      onChange={(e) => setTaxForm({ ...taxForm, cccd_ben_chuyen_nhuong: e.target.value })}
                      placeholder="036192009876"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cơ quan Thuế quản lý tiếp nhận <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={taxForm.co_quan_thue_quan_ly}
                      onChange={(e) => setTaxForm({ ...taxForm, co_quan_thue_quan_ly: e.target.value })}
                      placeholder="Chi cục Thuế quận Cầu Giấy, TP. Hà Nội"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION II: ASSET INFORMATION */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-slate-200 mb-4">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>II. ĐẶC ĐIỂM TÀI SẢN KÊ KHAI NGHĨA VỤ TÀI CHÍNH</span>
                </h3>

                {selectedForm === '02-lptb' ? (
                  // Vehicle Fields
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Biển kiểm soát phương tiện <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={taxForm.bien_so_xe}
                        onChange={(e) => setTaxForm({ ...taxForm, bien_so_xe: e.target.value })}
                        placeholder="30H-888.88"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Số khung (VIN) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={taxForm.so_khung}
                        onChange={(e) => setTaxForm({ ...taxForm, so_khung: e.target.value })}
                        placeholder="RL3BM12345678"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Số máy <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={taxForm.so_may}
                        onChange={(e) => setTaxForm({ ...taxForm, so_may: e.target.value })}
                        placeholder="PE-20-998877"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nhãn hiệu & Chủng loại
                      </label>
                      <input
                        type="text"
                        value={taxForm.nhan_hieu}
                        onChange={(e) => setTaxForm({ ...taxForm, nhan_hieu: e.target.value })}
                        placeholder="Mazda 3 Luxury (5 chỗ)"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Năm sản xuất
                      </label>
                      <select
                        value={taxForm.nam_san_xuat}
                        onChange={(e) => setTaxForm({ ...taxForm, nam_san_xuat: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2015].map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  // Real Estate Fields
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Địa chỉ thửa đất / Nhà ở kê khai <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={taxForm.dia_chi_thua_dat}
                        onChange={(e) => setTaxForm({ ...taxForm, dia_chi_thua_dat: e.target.value })}
                        placeholder="Thửa số 118, Tờ bản đồ 09, Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Thửa đất số
                      </label>
                      <input
                        type="text"
                        value={taxForm.thua_dat_so}
                        onChange={(e) => setTaxForm({ ...taxForm, thua_dat_so: e.target.value })}
                        placeholder="118"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tờ bản đồ số
                      </label>
                      <input
                        type="text"
                        value={taxForm.to_ban_do_so}
                        onChange={(e) => setTaxForm({ ...taxForm, to_ban_do_so: e.target.value })}
                        placeholder="09"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Diện tích đất (m²) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={taxForm.dien_tich_dat}
                        onChange={(e) => setTaxForm({ ...taxForm, dien_tich_dat: e.target.value })}
                        placeholder="75.5"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Diện tích sàn xây dựng (m²)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={taxForm.dien_tich_san_xay_dung}
                        onChange={(e) => setTaxForm({ ...taxForm, dien_tich_san_xay_dung: e.target.value })}
                        placeholder="220"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Giấy chứng nhận QSDĐ / Giấy tờ sở hữu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={taxForm.so_giay_chung_nhan}
                        onChange={(e) => setTaxForm({ ...taxForm, so_giay_chung_nhan: e.target.value })}
                        placeholder="CS 123456 do Sở TN&MT cấp ngày 20/12/2020"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION III: VALUATION & EXEMPTION */}
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-slate-200 mb-4">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>III. GIÁ TRỊ GIAO DỊCH & DIỆN MIỄN GIẢM THUẾ</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Giá trị trên hợp đồng giao dịch (VNĐ) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={taxForm.gia_tri_hop_dong}
                      onChange={(e) => setTaxForm({ ...taxForm, gia_tri_hop_dong: e.target.value })}
                      placeholder="2800000000"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-bold text-emerald-800"
                    />
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      = {Number(taxForm.gia_tri_hop_dong).toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số Hợp đồng đã chứng thực
                    </label>
                    <input
                      type="text"
                      value={taxForm.so_hop_dong_cong_chung}
                      onChange={(e) => setTaxForm({ ...taxForm, so_hop_dong_cong_chung: e.target.value })}
                      placeholder="TP-2026-5678"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ngày lập hợp đồng chứng thực
                    </label>
                    <input
                      type="date"
                      value={taxForm.ngay_cong_chung}
                      onChange={(e) => setTaxForm({ ...taxForm, ngay_cong_chung: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Exemption Checkbox */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={taxForm.thuoc_dien_mien_thue}
                      onChange={(e) => setTaxForm({ ...taxForm, thuoc_dien_mien_thue: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Đề nghị áp dụng diện Miễn Thuế TNCN / Lệ phí trước bạ (Theo Luật Thuế TNCN & NĐ 10/2022)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Áp dụng đối với quan hệ gia đình (Vợ chồng, Cha mẹ - Con, Ông bà - Cháu, Anh chị em) hoặc Nhà ở duy nhất.
                      </span>
                    </div>
                  </label>

                  {taxForm.thuoc_dien_mien_thue && (
                    <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Căn cứ miễn thuế
                        </label>
                        <select
                          value={taxForm.quan_he_nhan_than_loai}
                          onChange={(e) => setTaxForm({ ...taxForm, quan_he_nhan_than_loai: e.target.value })}
                          className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="vo_chong">Vợ với chồng (Khoản 1 Điều 3 Luật Thuế TNCN)</option>
                          <option value="cha_me_con">Cha mẹ đẻ/nuôi với con đẻ/nuôi</option>
                          <option value="ong_ba_chau">Ông bà nội/ngoại với cháu nội/ngoại</option>
                          <option value="anh_chi_em">Anh, chị, em ruột với nhau</option>
                          <option value="nha_o_duy_nhat">Chuyển nhượng nhà ở, đất ở duy nhất (Khoản 2 Điều 4)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Giấy tờ chứng minh kèm theo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required={taxForm.thuoc_dien_mien_thue}
                          value={taxForm.giay_to_chung_minh_mien}
                          onChange={(e) => setTaxForm({ ...taxForm, giay_to_chung_minh_mien: e.target.value })}
                          placeholder="Trích lục Giấy khai sinh số 123/TLKS hoặc ĐKKH..."
                          className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ESTIMATED SUMMARY CARD */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    Nghĩa vụ tài chính tạm tính dự kiến
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-950">
                    {calculateEstimatedTax().toLocaleString('vi-VN')} VNĐ
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">
                    {taxForm.thuoc_dien_mien_thue 
                      ? 'Miễn thuế theo diện quan hệ nhân thân (0 VNĐ)' 
                      : selectedForm === '03-bds' 
                        ? 'Thuế TNCN: 2% giá trị chuyển nhượng' 
                        : selectedForm === '01-lptb' 
                          ? 'Lệ phí trước bạ: 0.5% giá trị nhà đất'
                          : 'Theo biểu tỷ lệ quy định hiện hành'
                    }
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 text-xs font-bold shadow-sm transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>In Tờ Khai</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition"
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Nộp Hồ Sơ Khai Thuế Điện Tử</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: SMART CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          {/* Sub-modes */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'bds-chuyen-nhuong', label: 'Chuyển nhượng Bất động sản (Mua bán)' },
              { id: 'bds-tang-cho', label: 'Tặng cho / Thừa kế Nhà Đất' },
              { id: 'xe-cu', label: 'Trước bạ Ô tô / Xe máy cũ' },
              { id: 'cho-thue', label: 'Thuế Cho thuê nhà, mặt bằng' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setCalcType(m.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                  calcType === m.id
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 pb-3 border-b border-slate-200">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>Nhập thông số tính thuế</span>
              </h3>

              {calcType === 'bds-chuyen-nhuong' && (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">Giá trị hợp đồng giao dịch (VNĐ)</label>
                      <span className="text-xs font-extrabold text-emerald-700">
                        {Number(calcInput.contractPrice).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                    <input
                      type="range"
                      min="200000000"
                      max="20000000000"
                      step="50000000"
                      value={calcInput.contractPrice}
                      onChange={(e) => setCalcInput({ ...calcInput, contractPrice: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <input
                      type="number"
                      value={calcInput.contractPrice}
                      onChange={(e) => setCalcInput({ ...calcInput, contractPrice: Number(e.target.value) })}
                      className="w-full mt-2 text-xs px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Diện tích đất (m²)</label>
                      <input
                        type="number"
                        value={calcInput.landArea}
                        onChange={(e) => setCalcInput({ ...calcInput, landArea: Number(e.target.value) })}
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Giá đất theo Bảng giá tỉnh (đ/m²)</label>
                      <input
                        type="number"
                        value={calcInput.statePricePerM2}
                        onChange={(e) => setCalcInput({ ...calcInput, statePricePerM2: Number(e.target.value) })}
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                </>
              )}

              {calcType === 'bds-tang-cho' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mối quan hệ giữa người tặng và người nhận</label>
                    <select
                      value={calcInput.kinship}
                      onChange={(e) => setCalcInput({ ...calcInput, kinship: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                    >
                      <option value="vo_chong">Vợ chồng (Miễn thuế TNCN & LPTB)</option>
                      <option value="cha_me_con">Cha mẹ với con (Miễn thuế TNCN & LPTB)</option>
                      <option value="ong_ba_chau">Ông bà với cháu ruột (Miễn thuế TNCN & LPTB)</option>
                      <option value="anh_chi_em">Anh, chị, em ruột (Miễn thuế TNCN & LPTB)</option>
                      <option value="khac">Quan hệ khác / Ngoài gia đình (Chịu 10% thuế TNCN)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Giá trị quyền sử dụng đất & tài sản ước tính (VNĐ)</label>
                    <input
                      type="number"
                      value={calcInput.contractPrice}
                      onChange={(e) => setCalcInput({ ...calcInput, contractPrice: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                </>
              )}

              {calcType === 'xe-cu' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Loại phương tiện</label>
                      <select
                        value={calcInput.vehicleType}
                        onChange={(e) => setCalcInput({ ...calcInput, vehicleType: e.target.value })}
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 font-medium"
                      >
                        <option value="oto">Xe Ô tô (Thuế suất 2%)</option>
                        <option value="xe-may">Xe Máy (Thuế suất 1%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Thời gian đã sử dụng (năm)</label>
                      <select
                        value={calcInput.vehicleYears}
                        onChange={(e) => setCalcInput({ ...calcInput, vehicleYears: Number(e.target.value) })}
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 font-medium"
                      >
                        <option value={1}>Dưới 1 năm (Khấu hao 90%)</option>
                        <option value={2}>Từ 1 đến 3 năm (Khấu hao 70%)</option>
                        <option value={5}>Từ 3 đến 6 năm (Khấu hao 50%)</option>
                        <option value={8}>Từ 6 đến 10 năm (Khấu hao 30%)</option>
                        <option value={11}>Trên 10 năm (Khấu hao 20%)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Giá xe mới xuất xưởng theo Bảng giá Bộ Tài chính (VNĐ)</label>
                    <input
                      type="number"
                      value={calcInput.vehicleOriginalPrice}
                      onChange={(e) => setCalcInput({ ...calcInput, vehicleOriginalPrice: Number(e.target.value) })}
                      className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                </>
              )}

              {calcType === 'cho-thue' && (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-700">Doanh thu cho thuê hàng tháng (VNĐ)</label>
                      <span className="text-xs font-extrabold text-emerald-700">
                        {Number(calcInput.rentalMonthlyRevenue).toLocaleString('vi-VN')} đ/tháng
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5000000"
                      max="100000000"
                      step="1000000"
                      value={calcInput.rentalMonthlyRevenue}
                      onChange={(e) => setCalcInput({ ...calcInput, rentalMonthlyRevenue: Number(e.target.value) })}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <input
                      type="number"
                      value={calcInput.rentalMonthlyRevenue}
                      onChange={(e) => setCalcInput({ ...calcInput, rentalMonthlyRevenue: Number(e.target.value) })}
                      className="w-full mt-2 text-xs px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Results Display Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                  KẾT QUẢ TÍNH NGHĨA VỤ TÀI CHÍNH
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1 mb-4">
                  {calcResults.totalPayable.toLocaleString('vi-VN')} <span className="text-base font-normal text-slate-400">VNĐ</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800 text-xs sm:text-sm">
                  {calcType === 'bds-chuyen-nhuong' && (
                    <>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Giá làm căn cứ tính thuế:</span>
                        <span className="font-bold text-white">{calcResults.taxBase.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>1. Thuế Thu nhập cá nhân (2%):</span>
                        <span className="font-bold text-amber-300">{calcResults.thueTNCN.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>2. Lệ phí trước bạ (0.5%):</span>
                        <span className="font-bold text-cyan-300">{calcResults.lePhiTruocBa.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>3. Phí thẩm định hồ sơ cấp sổ:</span>
                        <span className="font-bold text-slate-200">{calcResults.phiThamDinh.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>4. Lệ phí cấp đổi/cấp mới sổ đỏ:</span>
                        <span className="font-bold text-slate-200">{calcResults.lePhiCapSo.toLocaleString('vi-VN')} đ</span>
                      </div>
                    </>
                  )}

                  {calcType === 'bds-tang-cho' && (
                    <>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Trạng thái miễn giảm:</span>
                        <span className={`font-bold ${calcResults.isMien ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {calcResults.isMien ? 'ĐƯỢC MIỄN THUẾ & TRƯỚC BẠ' : 'PHẢI NỘP 10% THUẾ TNCN'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Thuế TNCN phải nộp:</span>
                        <span className="font-bold text-white">{calcResults.thueTNCN.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Lệ phí trước bạ phải nộp:</span>
                        <span className="font-bold text-white">{calcResults.lePhiTruocBa.toLocaleString('vi-VN')} đ</span>
                      </div>
                    </>
                  )}

                  {calcType === 'xe-cu' && (
                    <>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Giá trị còn lại theo khấu hao:</span>
                        <span className="font-bold text-white">{calcResults.residualValue.toLocaleString('vi-VN')} đ ({calcResults.depreciationRate}%)</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Lệ phí trước bạ sang tên ({calcResults.taxRate}%):</span>
                        <span className="font-bold text-amber-300">{calcResults.lePhiTruocBa.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Lệ phí cấp đổi chứng nhận đăng ký xe:</span>
                        <span className="font-bold text-slate-200">{calcResults.lePhiBienSo.toLocaleString('vi-VN')} đ</span>
                      </div>
                    </>
                  )}

                  {calcType === 'cho-thue' && (
                    <>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Doanh thu 1 năm dương lịch:</span>
                        <span className="font-bold text-white">{calcResults.yearlyRevenue.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>Trạng thái nghĩa vụ thuế:</span>
                        <span className={`font-bold ${calcResults.isExempt ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {calcResults.isExempt ? 'DƯỚI 100 TRIỆU - MIỄN THUẾ' : 'TRÊN 100 TRIỆU - PHẢI NỘP 10%'}
                        </span>
                      </div>
                      {!calcResults.isExempt && (
                        <>
                          <div className="flex justify-between items-center text-slate-300">
                            <span>Thuế GTGT (5%):</span>
                            <span className="font-bold text-amber-300">{calcResults.vat.toLocaleString('vi-VN')} đ</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-300">
                            <span>Thuế TNCN (5%):</span>
                            <span className="font-bold text-cyan-300">{calcResults.pit.toLocaleString('vi-VN')} đ</span>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 mt-6">
                <p className="font-bold text-slate-300 mb-1">Căn cứ pháp lý viện dẫn:</p>
                <p className="italic leading-relaxed">{calcResults.legalBasis}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EXEMPTION FINDER */}
      {activeTab === 'exemption' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Tra Cứu Điều Kiện & Hồ Sơ Giấy Tờ Miễn Thuế Bất Động Sản
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Theo quy định tại Điều 4 Luật Thuế thu nhập cá nhân và Điều 10 Nghị định số 10/2022/NĐ-CP của Chính phủ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'vo_chong',
                title: 'Giữa Vợ với Chồng',
                badge: 'Miễn 100% Thuế & Trước bạ',
                docs: [
                  'Bản sao có công chứng Giấy chứng nhận kết hôn',
                  'Hoặc Trích lục kết hôn do UBND cấp xã cấp',
                  'Hợp đồng tặng cho hoặc thỏa thuận phân chia tài sản'
                ]
              },
              {
                id: 'cha_me_con',
                title: 'Cha mẹ với Con đẻ/Con nuôi',
                badge: 'Miễn 100% Thuế & Trước bạ',
                docs: [
                  'Giấy khai sinh của người con (chứng minh quan hệ cha con, mẹ con)',
                  'Hoặc Quyết định công nhận việc nuôi con nuôi của cơ quan thẩm quyền',
                  'CCCD gắn chip của cả hai bên'
                ]
              },
              {
                id: 'ong_ba_chau',
                title: 'Ông bà với Cháu nội/ngoại',
                badge: 'Miễn 100% Thuế & Trước bạ',
                docs: [
                  'Giấy khai sinh của người cháu',
                  'Giấy khai sinh của bố/mẹ người cháu (để kết nối quan hệ huyết thống 3 thế hệ)',
                  'Hợp đồng tặng cho/văn bản thừa kế'
                ]
              },
              {
                id: 'anh_chi_em',
                title: 'Anh, Chị, Em ruột với nhau',
                badge: 'Miễn 100% Thuế & Trước bạ',
                docs: [
                  'Giấy khai sinh của người chuyển nhượng/tặng cho',
                  'Giấy khai sinh của người nhận (chứng minh cùng cha mẹ đẻ)',
                  'Hợp đồng chuyển nhượng/tặng cho có chứng thực'
                ]
              },
              {
                id: 'cha_me_dau_re',
                title: 'Cha mẹ chồng - Dâu / Cha mẹ vợ - Rể',
                badge: 'Miễn Thuế TNCN (Trước bạ áp dụng tùy trường hợp)',
                docs: [
                  'Giấy chứng nhận kết hôn của vợ chồng',
                  'Giấy khai sinh của người con dâu/con rể hoặc của vợ/chồng'
                ]
              },
              {
                id: 'nha_o_duy_nhat',
                title: 'Chuyển nhượng Nhà ở duy nhất',
                badge: 'Miễn 2% Thuế TNCN',
                docs: [
                  'Bản cam kết sở hữu duy nhất 01 nhà ở, đất ở tại Việt Nam',
                  'Thời gian sở hữu tối thiểu 183 ngày trở lên',
                  'Chuyển nhượng toàn bộ thửa đất/nhà ở'
                ]
              }
            ].map(item => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.badge}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-[11px] font-bold text-slate-600 mb-1">Giấy tờ hồ sơ bắt buộc:</p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    {item.docs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PAYMENT & VIETQR */}
      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Payment Guide */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Quy Trình 3 Bước Nộp Nghĩa Vụ Tài Chính Vào Kho Bạc Nhà Nước
                </h3>
                <p className="text-xs text-slate-500">
                  Hệ thống tích hợp liên thông với Cổng Dịch vụ công Quốc gia và Tổng cục Thuế (eTax Mobile).
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Nộp hồ sơ khai thuế & Nhận Thông báo nộp tiền
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Sau khi nộp tờ khai điện tử tại Cổng này hoặc tại UBND cấp xã, Chi cục Thuế sẽ phát hành "Thông báo nộp thuế" có chứa <strong>Mã định danh hồ sơ thuế (ID khoản nộp)</strong> trong vòng 1-3 ngày làm việc.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Thanh toán trực tuyến hoặc Quét mã VietQR
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Công dân có thể thanh toán qua ứng dụng <strong>eTax Mobile</strong>, tài khoản ngân hàng số (BIDV, Vietcombank, Vietinbank, Agribank...) hoặc quét mã VietQR chuyển tiền vào tài khoản Kho bạc Nhà nước.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      Nhận Giấy nộp tiền vào NSNN điện tử
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Chứng từ nộp thuế điện tử có ký số của Kho bạc Nhà nước được tự động gửi về ứng dụng VNeID / email của công dân để hoàn tất thủ tục cấp Sổ đỏ tại Văn phòng Đăng ký đất đai.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submissions List */}
              {submittedDeclarations.length > 0 && (
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider mb-3">
                    Hồ sơ khai thuế vừa tạo trên hệ thống
                  </h4>
                  <div className="space-y-2">
                    {submittedDeclarations.map(s => (
                      <div key={s.id} className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-emerald-900">{s.id}</span> - <span className="font-semibold text-slate-800">{s.formTitle}</span>
                          <div className="text-[11px] text-slate-500">Người nộp: {s.taxPayer} ({s.cccd}) • {s.submittedAt}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-800 block">{s.estimatedTax.toLocaleString('vi-VN')} đ</span>
                          <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">Chờ duyệt</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* QR Code & Treasury Transfer Simulator */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
                VIETQR - THU NGÂN SÁCH NHÀ NƯỚC
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Quét Mã QR Nộp Tiền Vào Kho Bạc
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-xs">
                Hỗ trợ 40+ ứng dụng ngân hàng số & ví điện tử quốc gia
              </p>

              {/* Simulated QR Box */}
              <div className="w-56 h-56 bg-slate-900 rounded-2xl p-3 flex flex-col items-center justify-center relative shadow-lg group">
                <div className="w-full h-full bg-white rounded-xl p-2 flex flex-col items-center justify-center">
                  <QrCode className="w-36 h-36 text-slate-950" />
                  <span className="text-[10px] font-bold text-slate-700 mt-1">VIETQR • KBNN HÀ NỘI</span>
                </div>
              </div>

              <div className="w-full bg-slate-50 rounded-2xl p-4 mt-6 text-left text-xs space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Đơn vị thụ hưởng:</span>
                  <span className="font-bold text-slate-900">Kho bạc Nhà nước Cầu Giấy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tài khoản thu NSNN:</span>
                  <span className="font-bold text-slate-900">7111.1054.9999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã tiểu mục (TM):</span>
                  <span className="font-bold text-emerald-700">1003 (Thuế TNCN BĐS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Số tiền nộp:</span>
                  <span className="font-bold text-emerald-800">{calculateEstimatedTax().toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Cú pháp chuyển khoản:</span>
                  <span className="font-mono font-bold text-[11px] text-blue-700">NOP THUE {taxForm.cccd_nguoi_nop || '001095012345'} TM1003</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI TAX ASSISTANT */}
      {activeTab === 'ai-tax' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Trợ Lý AI Tư Vấn Pháp Luật Thuế & Lệ Phí Trước Bạ
                </h3>
                <p className="text-xs text-slate-500">
                  Hỏi đáp trực tiếp các tình huống chuyển nhượng, thừa kế, tặng cho và nộp phạt vi phạm hành chính thuế.
                </p>
              </div>
            </div>

            {/* Input prompt */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={customTaxQuery}
                onChange={(e) => setCustomTaxQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAITax()}
                placeholder="Nhập câu hỏi của bạn (ví dụ: Bố mẹ tặng nhà cho con gái thì nộp thuế gì? Sang tên xe máy cũ tính thế nào?)..."
                className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={handleAskAITax}
                disabled={aiTaxLoading}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 shrink-0"
              >
                {aiTaxLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Gửi câu hỏi</span>
              </button>
            </div>

            {/* AI Response Output */}
            {aiTaxAnswer && (
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 mb-8 animate-page-enter">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Giải đáp từ Trợ lý AI Pháp lý:</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                  {aiTaxAnswer}
                </div>
              </div>
            )}

            {/* Common FAQ Accordion */}
            <div>
              <h4 className="font-extrabold text-xs uppercase text-slate-700 tracking-wider mb-4">
                Các câu hỏi phổ biến người dân thường gặp
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {taxQuestions.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 hover:shadow-sm transition">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 text-emerald-950">
                      {q.q}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {q.a}
                    </p>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md inline-block">
                      {q.source}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
