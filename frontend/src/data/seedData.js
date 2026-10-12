export const initialData = {
  "categories": [
    {
      "id": "dong-san",
      "name": "1. Giao dịch liên quan đến động sản",
      "icon": "Car",
      "description": "Hợp đồng mua bán, tặng cho, trao đổi xe cộ, máy móc, vay mượn tài sản...",
      "procedures": [
        {
          "id": "mua-ban-dong-san",
          "title": "Hợp đồng mua bán động sản (Ô tô, Xe máy, Máy móc...)",
          "code": "HD-MB-DS",
          "aiFieldKey": "thoa_thuan_khac",
          "aiFieldLabel": "Thỏa thuận hiện trạng & cam kết giải quyết phát sinh (AI hỗ trợ chuốt văn phong)",
          "description": "Chứng thực hợp đồng mua bán tài sản là động sản thuộc diện đăng ký quyền sở hữu hoặc không phải đăng ký.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ và tên Bên bán (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD/Định danh Bên A",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "ben_a_ngay_cap",
              "label": "Ngày cấp CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "15/05/2021"
            },
            {
              "key": "ben_a_noi_cap",
              "label": "Nơi cấp CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Cục Cảnh sát QLHC về TTXH"
            },
            {
              "key": "ben_a_dia_chi",
              "label": "Nơi cư trú Bên A",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Số 123 Đường Láng, Đống Đa, Hà Nội"
            },
            {
              "key": "ben_a_dien_thoai",
              "label": "Số điện thoại Bên A",
              "type": "text",
              "required": false,
              "group": "bena",
              "placeholder": "0912345678"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ và tên Bên mua (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "TRẦN THỊ B"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD/Định danh Bên B",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "036195009876"
            },
            {
              "key": "ben_b_ngay_cap",
              "label": "Ngày cấp CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "20/10/2022"
            },
            {
              "key": "ben_b_noi_cap",
              "label": "Nơi cấp CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Cục Cảnh sát QLHC về TTXH"
            },
            {
              "key": "ben_b_dia_chi",
              "label": "Nơi cư trú Bên B",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            },
            {
              "key": "ben_b_dien_thoai",
              "label": "Số điện thoại Bên B",
              "type": "text",
              "required": false,
              "group": "benb",
              "placeholder": "0987654321"
            },
            {
              "key": "tai_san_ten",
              "label": "Tên loại tài sản động sản",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Xe ô tô con 5 chỗ nhãn hiệu Mazda 3"
            },
            {
              "key": "bien_so_xe",
              "label": "Biển kiểm soát / Số nhận dạng",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "30H-123.45"
            },
            {
              "key": "so_khung",
              "label": "Số khung",
              "type": "text",
              "required": false,
              "group": "taisan",
              "placeholder": "RL3BM..."
            },
            {
              "key": "so_may",
              "label": "Số máy",
              "type": "text",
              "required": false,
              "group": "taisan",
              "placeholder": "PE-20..."
            },
            {
              "key": "giay_to_so_huu",
              "label": "Giấy tờ sở hữu (Số Giấy ĐK xe/Hóa đơn)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Giấy chứng nhận đăng ký xe ô tô số 123456 do CA Hà Nội cấp ngày..."
            },
            {
              "key": "gia_mua_ban",
              "label": "Giá mua bán thỏa thuận (VNĐ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "500.000.000 (Năm trăm triệu đồng)"
            },
            {
              "key": "phuong_thuc_thanh_toan",
              "label": "Phương thức thanh toán",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Chuyển khoản qua tài khoản ngân hàng..."
            },
            {
              "key": "thoa_thuan_khac",
              "label": "Thỏa thuận hiện trạng & Cam kết bảo hành (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap",
              "placeholder": "Nhập tự do về tình trạng xe, thỏa thuận bên nào nộp thuế phí, trách nhiệm phạt nếu chậm giao xe..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nHỢP ĐỒNG MUA BÁN ĐỘNG SẢN\n(Số: {{so_hop_dong}} /HĐMB-DS)\n\nHôm nay, ngày {{ngay_lap}} tháng {{thang_lap}} năm {{nam_lap}}, tại Bộ phận Tiếp nhận và Trả kết quả UBND {{co_quan_chung_thuc}}, chúng tôi gồm có:\n\nBÊN BÁN (Sau đây gọi tắt là BÊN A):\n- Ông/Bà: {{ben_a_ho_ten}}\n- Sinh ngày: {{ben_a_ngay_sinh}}\n- Số định danh cá nhân (CCCD): {{ben_a_cccd}}, cấp ngày {{ben_a_ngay_cap}} tại {{ben_a_noi_cap}}\n- Nơi cư trú thường trú: {{ben_a_dia_chi}}\n- Điện thoại liên hệ: {{ben_a_dien_thoai}}\n\nBÊN MUA (Sau đây gọi tắt là BÊN B):\n- Ông/Bà: {{ben_b_ho_ten}}\n- Sinh ngày: {{ben_b_ngay_sinh}}\n- Số định danh cá nhân (CCCD): {{ben_b_cccd}}, cấp ngày {{ben_b_ngay_cap}} tại {{ben_b_noi_cap}}\n- Nơi cư trú thường trú: {{ben_b_dia_chi}}\n- Điện thoại liên hệ: {{ben_b_dien_thoai}}\n\nHai bên tự nguyện thỏa thuận giao kết Hợp đồng mua bán động sản với các nội dung sau:\n\nĐIỀU 1: ĐỐI TƯỢNG CỦA HỢP ĐỒNG\nBên A đồng ý bán và Bên B đồng ý mua tài sản thuộc quyền sở hữu hợp pháp của Bên A với các đặc điểm sau:\n- Tên tài sản: {{tai_san_ten}}\n- Biển kiểm soát / Mã số: {{bien_so_xe}}\n- Số khung: {{so_khung}}\n- Số máy: {{so_may}}\n- Giấy tờ chứng minh quyền sở hữu: {{giay_to_so_huu}}\n\nĐIỀU 2: GIÁ CẢ VÀ PHƯƠNG THỨC THANH TOÁN\n1. Giá mua bán tài sản nêu trên do hai bên tự nguyện thỏa thuận là: {{gia_mua_ban}} VNĐ.\n2. Phương thức thanh toán: {{phuong_thuc_thanh_toan}}.\n3. Việc thanh toán được các bên tự thực hiện và chịu trách nhiệm trước pháp luật.\n\nĐIỀU 3: HIỆN TRẠNG TÀI SẢN VÀ THỎA THUẬN CAM KẾT\n{{thoa_thuan_khac}}\n\nĐIỀU 4: NGHĨA VỤ NỘP THUẾ, LỆ PHÍ\nCác khoản thuế, phí và lệ phí liên quan đến việc chuyển quyền sở hữu tài sản này theo quy định do Bên B (hoặc theo thỏa thuận giữa hai bên) chịu trách nhiệm kê khai nộp.\n\nĐIỀU 5: CAM ĐOAN CỦA CÁC BÊN\n1. Tài sản mua bán không bị kê biên để bảo đảm thi hành án, không bị thế chấp, cầm cố hoặc tranh chấp.\n2. Việc giao kết hợp đồng này hoàn toàn tự nguyện, không bị lừa dối, đe dọa hoặc ép buộc.\n3. Hợp đồng này được lập thành 03 bản chính có giá trị pháp lý như nhau, mỗi bên giữ 01 bản, 01 bản lưu tại cơ quan chứng thực.\n\n           BÊN A (BÊN BÁN)                                 BÊN B (BÊN MUA)\n         (Ký và ghi rõ họ tên)                           (Ký và ghi rõ họ tên)\n"
        },
        {
          "id": "tang-cho-dong-san",
          "title": "Hợp đồng tặng cho động sản",
          "code": "HD-TC-DS",
          "aiFieldKey": "dieu_kien_tang_cho",
          "aiFieldLabel": "Điều kiện tặng cho & Nguyện vọng (AI hỗ trợ)",
          "description": "Hợp đồng tặng cho ô tô, xe máy, tiền hoặc động sản giá trị khác.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ và tên Bên tặng cho (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_dia_chi",
              "label": "Nơi cư trú Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ và tên Bên nhận tặng cho (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_dia_chi",
              "label": "Nơi cư trú Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "tai_san_ten",
              "label": "Tên tài sản tặng cho",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "giay_to_so_huu",
              "label": "Giấy tờ chứng minh sở hữu",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "dieu_kien_tang_cho",
              "label": "Điều kiện tặng cho / Cam kết (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap",
              "placeholder": "Ghi rõ điều kiện tặng cho (ví dụ: dùng vào mục đích học tập, sinh hoạt, không được chuyển nhượng trong bao nhiêu năm...)"
            }
          ]
        },
        {
          "id": "vay-muon-tai-san",
          "title": "Hợp đồng vay tài sản, cho mượn tài sản",
          "code": "HD-VAY-DS",
          "aiFieldKey": "thoa_thuan_tra_no",
          "aiFieldLabel": "Phương thức trả nợ & Xử lý rủi ro quá hạn (AI hỗ trợ)",
          "description": "Hợp đồng vay tiền hoặc mượn tài sản có chứng thực theo yêu cầu các bên.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ và tên Bên cho vay/cho mượn (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_dia_chi",
              "label": "Nơi cư trú Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ và tên Bên vay/mượn (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_dia_chi",
              "label": "Nơi cư trú Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "so_tien_vay",
              "label": "Số tiền vay (bằng số và chữ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "200.000.000 VNĐ (Hai trăm triệu đồng)"
            },
            {
              "key": "thoi_han_vay",
              "label": "Thời hạn vay (tháng/năm)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "12 tháng kể từ ngày ký"
            },
            {
              "key": "lai_suat",
              "label": "Lãi suất (%/tháng hoặc %/năm - Tối đa 20%/năm theo luật)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "0% (Không tính lãi) hoặc 0.8%/tháng"
            },
            {
              "key": "thoa_thuan_tra_no",
              "label": "Thỏa thuận trả nợ & Biện pháp chế tài (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap",
              "placeholder": "Ghi rõ lịch trả gốc lãi, hình thức phạt vi phạm chậm trả..."
            }
          ]
        }
      ]
    },
    {
      "id": "quyen-su-dung-dat",
      "name": "2. Giao dịch thực hiện quyền của người sử dụng đất",
      "icon": "MapPin",
      "description": "Hợp đồng chuyển nhượng, tặng cho, thế chấp, chuyển đổi quyền sử dụng đất (UBND xã nơi có đất chứng thực)",
      "procedures": [
        {
          "id": "chuyen-nhuong-qsd-dat",
          "title": "Hợp đồng chuyển nhượng quyền sử dụng đất",
          "code": "HD-CN-DAT",
          "aiFieldKey": "thoa_thuan_tai_san_gan_lien",
          "aiFieldLabel": "Thỏa thuận tài sản trên đất & Bàn giao ranh giới (AI hỗ trợ)",
          "description": "Hợp đồng mua bán đất đai giữa cá nhân, hộ gia đình theo Luật Đất đai 2024 và NĐ 23/2015.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ tên Bên chuyển nhượng (Bên A - Chồng/Vợ)",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A và bà TRẦN THỊ C"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_dia_chi",
              "label": "Nơi cư trú Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ tên Bên nhận chuyển nhượng (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_dia_chi",
              "label": "Nơi cư trú Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "thua_dat_so",
              "label": "Thửa đất số",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "105"
            },
            {
              "key": "to_ban_do_so",
              "label": "Tờ bản đồ số",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "12"
            },
            {
              "key": "dia_chi_thua_dat",
              "label": "Địa chỉ thửa đất (Xã/Phường, Tỉnh/TP)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Xã Tiền Phong, Huyện Mê Linh, Hà Nội"
            },
            {
              "key": "dien_tich_dat",
              "label": "Diện tích đất (m2)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "120.5 m2"
            },
            {
              "key": "muc_dich_su_dung",
              "label": "Mục đích sử dụng đất",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Đất ở tại nông thôn (ONT)"
            },
            {
              "key": "thoi_han_su_dung",
              "label": "Thời hạn sử dụng",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Lâu dài"
            },
            {
              "key": "so_giay_chung_nhan",
              "label": "Số Giấy chứng nhận QSDĐ (Số Sổ đỏ/hồng)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "CS 123456 do Sở TN&MT cấp ngày..."
            },
            {
              "key": "gia_chuyen_nhuong",
              "label": "Giá chuyển nhượng (VNĐ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "1.500.000.000 VNĐ (Một tỷ năm trăm triệu đồng)"
            },
            {
              "key": "nghia_vu_thue",
              "label": "Thỏa thuận nộp thuế TNCN & Lệ phí trước bạ",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Bên B nộp toàn bộ thuế, phí và lệ phí trước bạ"
            },
            {
              "key": "thoa_thuan_tai_san_gan_lien",
              "label": "Cam kết ranh giới & Tài sản cây cối công trình trên đất (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap",
              "placeholder": "Mô tả cây lâu năm, tường rào, cam kết mốc giới không tranh chấp với các hộ liền kề..."
            }
          ]
        },
        {
          "id": "tang-cho-qsd-dat",
          "title": "Hợp đồng tặng cho quyền sử dụng đất",
          "code": "HD-TC-DAT",
          "aiFieldKey": "nguyen_vong_tang_cho",
          "aiFieldLabel": "Nguyện vọng & Thỏa thuận tặng cho (AI hỗ trợ)",
          "description": "Tặng cho đất đai giữa cha mẹ với con cái, người thân hoặc cho mục đích từ thiện.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ tên Bên tặng cho (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_dia_chi",
              "label": "Nơi cư trú Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ tên Bên nhận tặng cho (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_dia_chi",
              "label": "Nơi cư trú Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "thua_dat_so",
              "label": "Thửa đất số & Tờ bản đồ",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "dia_chi_thua_dat",
              "label": "Địa chỉ thửa đất",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "so_giay_chung_nhan",
              "label": "Số Giấy chứng nhận QSDĐ",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "nguyen_vong_tang_cho",
              "label": "Nguyện vọng tặng cho & Điều kiện ràng buộc (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap",
              "placeholder": "Cha mẹ tặng cho con xây nhà ở, điều kiện không được tự ý sang tên trong 5 năm..."
            }
          ]
        },
        {
          "id": "the-chap-qsd-dat",
          "title": "Hợp đồng thế chấp quyền sử dụng đất",
          "code": "HD-TC-THECHAP-DAT",
          "aiFieldKey": "nghia_vu_bao_dam",
          "aiFieldLabel": "Nghĩa vụ được bảo đảm & Xử lý tài sản thế chấp (AI hỗ trợ)",
          "description": "Thế chấp quyền sử dụng đất để bảo đảm nghĩa vụ theo quy định pháp luật.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Bên thế chấp (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Bên nhận thế chấp (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD / Mã số Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "thua_dat_so",
              "label": "Thửa đất số & Tờ bản đồ",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "so_giay_chung_nhan",
              "label": "Số Giấy chứng nhận QSDĐ",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "nghia_vu_bao_dam",
              "label": "Nội dung nghĩa vụ bảo đảm & Xử lý tài sản thế chấp (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap"
            }
          ]
        }
      ]
    },
    {
      "id": "giao-dich-nha-o",
      "name": "3. Giao dịch về nhà ở",
      "icon": "Home",
      "description": "Hợp đồng mua bán, tặng cho, đổi, góp vốn, thế chấp nhà ở gắn liền với đất hoặc căn hộ chung cư",
      "procedures": [
        {
          "id": "mua-ban-nha-o",
          "title": "Hợp đồng mua bán nhà ở",
          "code": "HD-MB-NHA",
          "aiFieldKey": "thoa_thuan_noi_that_bao_hanh",
          "aiFieldLabel": "Thỏa thuận hiện trạng nội thất & Bảo hành nhà ở (AI hỗ trợ)",
          "description": "Mua bán nhà ở riêng lẻ, nhà biệt thự, nhà phố hoặc căn hộ chung cư theo Luật Nhà ở 2023.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ tên Bên bán nhà (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_dia_chi",
              "label": "Nơi cư trú Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ tên Bên mua nhà (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_dia_chi",
              "label": "Nơi cư trú Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "dia_chi_nha_o",
              "label": "Địa chỉ căn nhà",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Số 45 Ngõ 12 Phố X, Phường Y, Quận Z..."
            },
            {
              "key": "loai_nha",
              "label": "Loại nhà & Cấp công trình",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Nhà ở riêng lẻ, kết cấu bê tông cốt thép, 4 tầng"
            },
            {
              "key": "dien_tich_xay_dung",
              "label": "Diện tích xây dựng (m2)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "65 m2 (Tổng diện tích sàn: 260 m2)"
            },
            {
              "key": "so_giay_chung_nhan_nha",
              "label": "Giấy chứng nhận quyền sở hữu nhà ở",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "gia_mua_ban_nha",
              "label": "Giá mua bán căn nhà (VNĐ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "4.200.000.000 VNĐ (Bốn tỷ hai trăm triệu đồng)"
            },
            {
              "key": "tien_do_thanh_toan",
              "label": "Tiến độ thanh toán",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Đợt 1: 50% khi ký hợp đồng, Đợt 2: 50% khi bàn giao nhà và nộp hồ sơ sang tên..."
            },
            {
              "key": "thoa_thuan_noi_that_bao_hanh",
              "label": "Danh mục nội thất bàn giao & Cam kết bảo hành (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap",
              "placeholder": "Liệt kê điều hòa, tủ bếp, hiện trạng ngấm dột, thời gian bàn giao chìa khóa..."
            }
          ]
        },
        {
          "id": "gop-von-bang-nha-o",
          "title": "Hợp đồng góp vốn bằng nhà ở",
          "code": "HD-GV-NHA",
          "aiFieldKey": "dieu_khoan_gop_von",
          "aiFieldLabel": "Mục đích góp vốn & Phân chia lợi nhuận rủi ro (AI hỗ trợ)",
          "description": "Góp vốn bằng nhà ở vào hoạt động hợp tác kinh doanh hoặc doanh nghiệp.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Bên góp vốn (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Bên nhận góp vốn (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD/ĐKKD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "dia_chi_nha_o",
              "label": "Địa chỉ căn nhà góp vốn",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "gia_tri_dinh_gia",
              "label": "Giá trị định giá nhà góp vốn",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "dieu_khoan_gop_von",
              "label": "Thỏa thuận phân chia quyền lợi & Rút vốn (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap"
            }
          ]
        }
      ]
    },
    {
      "id": "di-chuc-thua-ke",
      "name": "4. Di chúc và giao dịch về thừa kế",
      "icon": "FileText",
      "description": "Chứng thực di chúc, văn bản từ chối nhận di sản, thỏa thuận phân chia hoặc khai nhận di sản",
      "procedures": [
        {
          "id": "chung-thuc-di-chuc",
          "title": "Chứng thực di chúc",
          "code": "VB-DI-CHUC",
          "aiFieldKey": "nguyen_vong_di_chuc",
          "aiFieldLabel": "Tâm tư, Nguyện vọng & Phân định di sản (AI hỗ trợ chuốt văn phong)",
          "description": "Lập và chứng thực di chúc của cá nhân để lại tài sản cho người thừa kế theo Bộ luật Dân sự 2015.",
          "fields": [
            {
              "key": "nguoi_lap_di_chuc",
              "label": "Họ và tên người lập di chúc",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN X"
            },
            {
              "key": "ngay_sinh",
              "label": "Sinh ngày",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "10/08/1955"
            },
            {
              "key": "cccd",
              "label": "Số CCCD",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "dia_chi",
              "label": "Nơi cư trú thường trú",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "danh_sach_nguoi_thua_ke",
              "label": "Họ tên người/những người được hưởng thừa kế",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Con trai: Nguyễn Văn Y (CCCD số...), Con gái: Nguyễn Thị Z..."
            },
            {
              "key": "tai_san_de_lai",
              "label": "Mô tả di sản để lại (Đất, nhà, tiền tiết kiệm...)",
              "type": "textarea",
              "required": true,
              "group": "taisan",
              "placeholder": "Quyền sử dụng đất và căn nhà tại địa chỉ..., Sổ tiết kiệm số... tại Ngân hàng..."
            },
            {
              "key": "nguyen_vong_di_chuc",
              "label": "Tâm tư, phân chia cụ thể & Nghĩa vụ phụng dưỡng (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Tôi hoàn toàn minh mẫn, sáng suốt khi lập di chúc này. Nguyện vọng sau khi tôi qua đời tài sản phân chia như thế nào, trách nhiệm thờ cúng tổ tiên ra sao..."
            }
          ]
        },
        {
          "id": "tu-choi-nhan-di-san",
          "title": "Chứng thực văn bản từ chối nhận di sản",
          "code": "VB-TU-CHOI-DI-SAN",
          "aiFieldKey": "ly_do_tu_choi",
          "aiFieldLabel": "Lý do từ chối & Cam kết không trốn tránh nghĩa vụ (AI hỗ trợ)",
          "description": "Văn bản người thuộc hàng thừa kế từ chối nhận di sản theo Điều 620 Bộ luật Dân sự và Nghị định 23/2015.",
          "fields": [
            {
              "key": "nguoi_tu_choi_ho_ten",
              "label": "Họ và tên người từ chối di sản",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "cccd",
              "label": "Số CCCD",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "dia_chi",
              "label": "Nơi cư trú",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "quan_he_nguoi_de_lai",
              "label": "Mối quan hệ với người để lại di sản",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Là con ruột của người quá cố"
            },
            {
              "key": "nguoi_de_lai_di_san",
              "label": "Họ tên người đã chết (để lại di sản)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Cố ông: NGUYỄN VĂN A (Mất ngày...)"
            },
            {
              "key": "giay_chung_tu",
              "label": "Trích lục / Giấy chứng tử số",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Số 45/TL-CT do UBND xã... cấp ngày..."
            },
            {
              "key": "mo_ta_di_san",
              "label": "Mô tả di sản được từ chối hưởng",
              "type": "textarea",
              "required": true,
              "group": "taisan",
              "placeholder": "Quyền sử dụng đất tại thửa đất số... Tờ bản đồ số..."
            },
            {
              "key": "ly_do_tu_choi",
              "label": "Lý do từ chối nhận di sản (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Lý do tự nguyện để lại toàn bộ phần di sản cho mẹ/cho em trai sinh sống, cam kết việc từ chối không nhằm trốn tránh nghĩa vụ tài sản hay nợ nần..."
            }
          ]
        },
        {
          "id": "thoa-thuan-phan-chia-di-san",
          "title": "Chứng thực văn bản thỏa thuận phân chia di sản",
          "code": "VB-PHAN-CHIA-DI-SAN",
          "aiFieldKey": "thoa_thuan_phan_chia",
          "aiFieldLabel": "Nội dung phân định di sản & Cam kết đồng thuận (AI hỗ trợ)",
          "description": "Các đồng thừa kế cùng thỏa thuận phân chia tài sản nhà đất, động sản.",
          "fields": [
            {
              "key": "danh_sach_dong_thua_ke",
              "label": "Danh sách toàn bộ các đồng thừa kế",
              "type": "textarea",
              "required": true,
              "group": "bena",
              "placeholder": "1. Bà Nguyễn Thị M (Vợ)\n2. Ông Nguyễn Văn X (Con)\n3. Bà Nguyễn Thị Y (Con)..."
            },
            {
              "key": "nguoi_de_lai_di_san",
              "label": "Họ tên người để lại di sản & Ngày mất",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "thong_tin_di_san",
              "label": "Thông tin di sản thừa kế",
              "type": "textarea",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "thoa_thuan_phan_chia",
              "label": "Phương án phân chia cụ thể (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Ai nhận kỷ phần nào, ai nhận tiền bồi hoàn, các bên đồng thuận không khiếu nại..."
            }
          ]
        }
      ]
    },
    {
      "id": "xu-ly-tiep-giao-dich",
      "name": "5. Giao dịch đã được chứng thực cần xử lý tiếp",
      "icon": "RefreshCw",
      "description": "Sửa đổi, bổ sung, hủy bỏ, chấm dứt, sửa lỗi sai sót kỹ thuật hoặc cấp bản sao từ sổ gốc",
      "procedures": [
        {
          "id": "huy-bo-giao-dich",
          "title": "Hủy bỏ giao dịch đã được chứng thực",
          "code": "VB-HUY-GIAO-DICH",
          "aiFieldKey": "ly_do_huy_bo",
          "aiFieldLabel": "Lý do hủy bỏ hợp đồng & Giải quyết hậu quả pháp lý (AI hỗ trợ)",
          "description": "Văn bản thỏa thuận hủy bỏ hợp đồng/giao dịch đã chứng thực trước đây theo Điều 38 Nghị định 23/2015.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ tên Bên A (như trong HĐ cũ)",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ tên Bên B (như trong HĐ cũ)",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ten_hop_dong_cu",
              "label": "Tên Hợp đồng giao dịch cũ cần hủy",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Hợp đồng chuyển nhượng quyền sử dụng đất"
            },
            {
              "key": "so_chung_thuc_cu",
              "label": "Số chứng thực cũ",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "128/2023"
            },
            {
              "key": "quyen_so_cu",
              "label": "Quyển số cũ",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "01 - TP/CC-SCT/HĐGD"
            },
            {
              "key": "ngay_chung_thuc_cu",
              "label": "Ngày chứng thực cũ",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "18/06/2023"
            },
            {
              "key": "co_quan_chung_thuc_cu",
              "label": "Cơ quan đã chứng thực trước đây (Bắt buộc phải cùng cơ quan)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "UBND xã Tiền Phong, huyện Mê Linh, TP Hà Nội"
            },
            {
              "key": "ly_do_huy_bo",
              "label": "Lý do hủy bỏ và Thỏa thuận hoàn trả tài sản tiền bạc (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Giải thích lý do hai bên cùng đồng thuận hủy bỏ (ví dụ: Bên B không thu xếp đủ tài chính, hai bên tự nguyện trả lại tiền và giấy tờ, không có tranh chấp khiếu kiện)..."
            }
          ]
        },
        {
          "id": "sua-doi-bo-sung-giao-dich",
          "title": "Sửa đổi, bổ sung giao dịch đã được chứng thực",
          "code": "VB-SUA-DOI-GIAO-DICH",
          "aiFieldKey": "noi_dung_sua_doi",
          "aiFieldLabel": "Nội dung điều khoản sửa đổi, bổ sung (AI hỗ trợ)",
          "description": "Sửa đổi điều khoản thanh toán, thời hạn bàn giao, hoặc thông tin kỹ thuật trong hợp đồng cũ.",
          "fields": [
            {
              "key": "ben_a_ho_ten",
              "label": "Họ tên Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_a_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "ben_b_ho_ten",
              "label": "Họ tên Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "ben_b_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb"
            },
            {
              "key": "so_chung_thuc_cu",
              "label": "Số chứng thực cũ & Ngày lập",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "co_quan_chung_thuc_cu",
              "label": "Cơ quan đã chứng thực cũ",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "noi_dung_sua_doi",
              "label": "Nội dung điều khoản sửa đổi, bổ sung mới (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Ghi rõ Điều nào trong HĐ cũ được sửa, nội dung cũ là gì, nội dung mới thay thế là gì..."
            }
          ]
        },
        {
          "id": "sua-loi-sai-sot",
          "title": "Sửa lỗi sai sót trong giao dịch đã được chứng thực",
          "code": "VB-SUA-LOI-KY-THUAT",
          "aiFieldKey": "giai_trinh_sai_sot",
          "aiFieldLabel": "Giải trình lỗi sai sót kỹ thuật (AI hỗ trợ)",
          "description": "Sửa lỗi chính tả, số liệu kỹ thuật theo quy định tại Điều 39 Nghị định 23/2015/NĐ-CP.",
          "fields": [
            {
              "key": "nguoi_yeu_cau",
              "label": "Người yêu cầu sửa lỗi sai sót",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "cccd",
              "label": "Số CCCD",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "so_chung_thuc_cu",
              "label": "Số hợp đồng chứng thực có lỗi sai sót",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "giai_trinh_sai_sot",
              "label": "Vị trí sai sót, từ ngữ sai và từ ngữ đính chính đúng (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Ví dụ: Trang 2 ghi nhầm số CCCD là... nay đính chính đúng thành... căn cứ theo bản gốc CCCD..."
            }
          ]
        },
        {
          "id": "cap-ban-sao-chung-thuc",
          "title": "Cấp bản sao có chứng thực từ bản chính giao dịch",
          "code": "VB-CAP-BAN-SAO",
          "aiFieldKey": "muc_dich_cap_ban_sao",
          "aiFieldLabel": "Mục đích xin cấp bản sao (AI hỗ trợ)",
          "description": "Yêu cầu cơ quan đang lưu trữ hồ sơ chứng thực trích xuất và cấp bản sao từ sổ gốc.",
          "fields": [
            {
              "key": "nguoi_yeu_cau",
              "label": "Họ tên người yêu cầu cấp bản sao",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "cccd",
              "label": "Số CCCD người yêu cầu",
              "type": "text",
              "required": true,
              "group": "bena"
            },
            {
              "key": "so_chung_thuc_goc",
              "label": "Số chứng thực của hợp đồng gốc đã lưu sổ",
              "type": "text",
              "required": true,
              "group": "taisan"
            },
            {
              "key": "so_luong_ban_sao",
              "label": "Số lượng bản sao yêu cầu",
              "type": "number",
              "required": true,
              "group": "taisan",
              "placeholder": "2"
            },
            {
              "key": "muc_dich_cap_ban_sao",
              "label": "Lý do và mục đích xin cấp bản sao (Có AI hỗ trợ)",
              "type": "textarea",
              "required": false,
              "group": "dieuphap",
              "placeholder": "Để phục vụ nộp hồ sơ kê khai thuế, đăng ký biến động đất đai tại Văn phòng Đăng ký đất đai..."
            }
          ]
        }
      ]
    },
    {
      "id": "hon-nhan-gia-dinh",
      "name": "6. Hôn nhân, Gia đình & Trẻ em",
      "icon": "Users",
      "description": "Đơn thuận tình ly hôn, thỏa thuận nuôi con và cấp dưỡng, chia tài sản vợ chồng...",
      "procedures": [
        {
          "id": "thuan-tinh-ly-hon",
          "title": "Đơn yêu cầu công nhận thuận tình ly hôn, nuôi con và tài sản",
          "code": "DON-TT-LH",
          "aiFieldKey": "ly_do_ly_hon",
          "aiFieldLabel": "Lý do mâu thuẫn hôn nhân & Nguyện vọng giải quyết (Có AI hỗ trợ)",
          "description": "Mẫu đơn chuẩn gửi Tòa án nhân dân có thẩm quyền yêu cầu công nhận thuận tình ly hôn theo Điều 55 Luật Hôn nhân & Gia đình 2014.",
          "fields": [
            {
              "key": "nguoi_nop_chong",
              "label": "Họ và tên Người chồng",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "chong_cccd",
              "label": "Số CCCD/Định danh người chồng",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "chong_ngay_cap",
              "label": "Ngày cấp CCCD người chồng",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "15/05/2021"
            },
            {
              "key": "chong_dia_chi",
              "label": "Nơi cư trú người chồng",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Số 123 Đường Láng, Đống Đa, Hà Nội"
            },
            {
              "key": "chong_dien_thoai",
              "label": "Số điện thoại người chồng",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "0912345678"
            },
            {
              "key": "nguoi_nop_vo",
              "label": "Họ và tên Người vợ",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "TRẦN THỊ B"
            },
            {
              "key": "vo_cccd",
              "label": "Số CCCD/Định danh người vợ",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "036195009876"
            },
            {
              "key": "vo_ngay_cap",
              "label": "Ngày cấp CCCD người vợ",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "20/10/2022"
            },
            {
              "key": "vo_dia_chi",
              "label": "Nơi cư trú người vợ",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            },
            {
              "key": "vo_dien_thoai",
              "label": "Số điện thoại người vợ",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "0987654321"
            },
            {
              "key": "toa_an_nhan_dan",
              "label": "Tòa án nhân dân thụ lý giải quyết",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Tòa án nhân dân quận Cầu Giấy, TP. Hà Nội"
            },
            {
              "key": "thong_tin_ket_hon",
              "label": "Giấy chứng nhận kết hôn số / Nơi đăng ký",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "GCN kết hôn số 45/2018 do UBND phường Dịch Vọng Hậu cấp ngày 10/10/2018"
            },
            {
              "key": "thoa_thuan_con_chung",
              "label": "Thỏa thuận về con chung và cấp dưỡng",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Có 01 con chung là Nguyễn Văn C (SN 2020), giao cho mẹ trực tiếp nuôi dưỡng, bố cấp dưỡng 5.000.000đ/tháng"
            },
            {
              "key": "thoa_thuan_tai_san",
              "label": "Thỏa thuận về tài sản chung và công nợ",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Tự thỏa thuận không yêu cầu Tòa án giải quyết / hoặc không có tài sản và công nợ chung"
            },
            {
              "key": "ly_do_ly_hon",
              "label": "Trình bày lý do mâu thuẫn & nguyện vọng ly hôn (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Hai vợ chồng phát sinh nhiều bất đồng quan điểm sống, tính tình không hòa hợp, đời sống chung không thể kéo dài, mục đích hôn nhân không đạt được..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nĐƠN YÊU CẦU CÔNG NHẬN THUẬN TÌNH LY HÔN,\nNUÔI CON VÀ CHIA TÀI SẢN KHI LY HÔN\n\nKính gửi: {{toa_an_nhan_dan}}\n\nChúng tôi gồm có:\n1. Người yêu cầu thứ nhất (Chồng):\n- Họ và tên: {{nguoi_nop_chong}}\n- Số CCCD/Định danh: {{chong_cccd}} cấp ngày {{chong_ngay_cap}}\n- Nơi cư trú: {{chong_dia_chi}}\n- Số điện thoại: {{chong_dien_thoai}}\n\n2. Người yêu cầu thứ hai (Vợ):\n- Họ và tên: {{nguoi_nop_vo}}\n- Số CCCD/Định danh: {{vo_cccd}} cấp ngày {{vo_ngay_cap}}\n- Nơi cư trú: {{vo_dia_chi}}\n- Số điện thoại: {{vo_dien_thoai}}\n\nChúng tôi làm đơn này xin trình bày với Quý Tòa một việc như sau:\n\nI. VỀ QUAN HỆ HÔN NHÂN:\nChúng tôi kết hôn trên cơ sở tự nguyện, có đăng ký kết hôn tại: {{thong_tin_ket_hon}}.\nLý do xin ly hôn: {{ly_do_ly_hon}}\nNhận thấy tình cảm vợ chồng không còn, mục đích hôn nhân không đạt được, chúng tôi cùng tự nguyện làm đơn này kính đề nghị Quý Tòa công nhận thuận tình ly hôn.\n\nII. VỀ CON CHUNG VÀ CẤP DƯỠNG:\n{{thoa_thuan_con_chung}}\n\nIII. VỀ TÀI SẢN CHUNG VÀ NỢ CHUNG:\n{{thoa_thuan_tai_san}}\n\nKính đề nghị Quý Tòa thụ lý và giải quyết theo quy định của pháp luật."
        },
        {
          "id": "thoa-thuan-tai-san-vo-chong",
          "title": "Văn bản thỏa thuận phân chia tài sản chung vợ chồng trong thời kỳ hôn nhân",
          "code": "VB-TTS-VC",
          "aiFieldKey": "cam_ket_tai_chinh",
          "aiFieldLabel": "Cam kết nghĩa vụ tài sản đối với bên thứ ba (Có AI hỗ trợ chuốt chuẩn)",
          "description": "Văn bản thỏa thuận xác lập tài sản riêng hoặc phân chia tài sản chung theo Điều 38, 39, 40 Luật Hôn nhân & Gia đình 2014.",
          "fields": [
            {
              "key": "chong_ho_ten",
              "label": "Họ và tên Chồng (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "chong_cccd",
              "label": "Số CCCD Chồng",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "chong_dia_chi",
              "label": "Nơi cư trú Chồng",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Số 123 Đường Láng, Hà Nội"
            },
            {
              "key": "vo_ho_ten",
              "label": "Họ và tên Vợ (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "TRẦN THỊ B"
            },
            {
              "key": "vo_cccd",
              "label": "Số CCCD Vợ",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "036195009876"
            },
            {
              "key": "vo_dia_chi",
              "label": "Nơi cư trú Vợ",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            },
            {
              "key": "tai_san_phan_chia",
              "label": "Mô tả chi tiết tài sản chung thỏa thuận phân chia",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Nhà đất tại thửa đất số 50, tờ bản đồ 15 tại phường Dịch Vọng Hậu theo GCN số CS-12345"
            },
            {
              "key": "phuong_an_chia",
              "label": "Phương án phân chia cụ thể (Ai sở hữu phần nào)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Bên A (Chồng) được toàn quyền sở hữu, sử dụng trọn vẹn nhà đất nêu trên và thanh toán tiền bù đắp cho Bên B"
            },
            {
              "key": "cam_ket_tai_chinh",
              "label": "Cam kết trách nhiệm tài sản & nợ chung đối với bên thứ ba (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Hai bên cam đoan việc phân chia tài sản này hoàn toàn tự nguyện, không nhằm trốn tránh việc thực hiện bất kỳ nghĩa vụ tài sản nào đối với Nhà nước, ngân hàng hay bất kỳ bên thứ ba nào..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nVĂN BẢN THỎA THUẬN PHÂN CHIA TÀI SẢN CHUNG TRONG THỜI KỲ HÔN NHÂN\n\nHôm nay, ngày {{ngay_lap}} tháng {{thang_lap}} năm {{nam_lap}}, tại UBND {{co_quan_chung_thuc}}, chúng tôi gồm có:\n\nBÊN A (CHỒNG):\n- Ông: {{chong_ho_ten}}\n- CCCD số: {{chong_cccd}}\n- Cư trú tại: {{chong_dia_chi}}\n\nBÊN B (VỢ):\n- Bà: {{vo_ho_ten}}\n- CCCD số: {{vo_cccd}}\n- Cư trú tại: {{vo_dia_chi}}\n\nHai bên tự nguyện thỏa thuận việc phân chia tài sản chung trong thời kỳ hôn nhân như sau:\n\nĐIỀU 1: TÀI SẢN CHUNG ĐƯỢC PHÂN CHIA\n{{tai_san_phan_chia}}\n\nĐIỀU 2: PHƯƠNG ÁN PHÂN CHIA CỤ THỂ\n{{phuong_an_chia}}\n\nĐIỀU 3: CAM KẾT VỀ NGHĨA VỤ TÀI CHÍNH ĐỐI VỚI BÊN THỨ BA\n{{cam_ket_tai_chinh}}\n\nĐIỀU 4: HIỆU LỰC CỦA VĂN BẢN\nVăn bản này có hiệu lực kể từ ngày được cơ quan có thẩm quyền chứng thực theo quy định của pháp luật."
        }
      ]
    },
    {
      "id": "dan-su-doi-no",
      "name": "7. Nghĩa vụ Dân sự & Đòi nợ, Bồi thường",
      "icon": "Scale",
      "description": "Giấy nhận nợ và cam kết thanh toán, Đơn khởi kiện đòi nợ tại Tòa án nhân dân...",
      "procedures": [
        {
          "id": "giay-nhan-no-cam-ket",
          "title": "Giấy xác nhận nợ và cam kết thanh toán (Có giá trị ràng buộc cao)",
          "code": "GNN-CK",
          "aiFieldKey": "che_tai_vi_pham",
          "aiFieldLabel": "Chế tài phạt chậm trả & Thỏa thuận xử lý tài sản bảo đảm (Có AI hỗ trợ)",
          "description": "Văn bản xác nhận nghĩa vụ trả nợ, thời hạn hoàn trả và chế tài phạt vi phạm theo Điều 463 - 470 Bộ luật Dân sự 2015.",
          "fields": [
            {
              "key": "ben_cho_vay_ten",
              "label": "Họ và tên Bên cho vay / Chủ nợ (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "ben_cho_vay_cccd",
              "label": "Số CCCD Bên A",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "ben_cho_vay_dia_chi",
              "label": "Nơi cư trú Bên A",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Số 10 Tràng Tiền, Hoàn Kiếm, Hà Nội"
            },
            {
              "key": "ben_vay_ten",
              "label": "Họ và tên Bên vay nợ (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "LÊ VĂN B"
            },
            {
              "key": "ben_vay_cccd",
              "label": "Số CCCD Bên B",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "036195009876"
            },
            {
              "key": "ben_vay_dia_chi",
              "label": "Nơi cư trú Bên B",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Xã Tiền Phong, Mê Linh, Hà Nội"
            },
            {
              "key": "ben_vay_sdt",
              "label": "Số điện thoại Bên B",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "0977889900"
            },
            {
              "key": "so_tien_no_so",
              "label": "Số tiền nợ (Bằng số VNĐ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "300.000.000"
            },
            {
              "key": "so_tien_no_chu",
              "label": "Số tiền nợ (Bằng chữ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Ba trăm triệu đồng chẵn"
            },
            {
              "key": "thoi_han_tra_cuoi",
              "label": "Thời hạn thanh toán cuối cùng",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Ngày 30 tháng 12 năm 2026"
            },
            {
              "key": "phuong_thuc_thanh_toan",
              "label": "Phương thức thanh toán tiền nợ",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Chuyển khoản qua số tài khoản 123456789 tại Ngân hàng Vietcombank mang tên Bên A"
            },
            {
              "key": "che_tai_vi_pham",
              "label": "Chế tài chậm trả & Cam kết xử lý tài sản bảo đảm (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Nếu quá hạn nêu trên mà Bên B chưa thanh toán hết, Bên B phải chịu lãi suất chậm trả bằng 150% lãi suất cơ bản và đồng ý bàn giao tài sản cho Bên A để cấn trừ nợ..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nGIẤY XÁC NHẬN NỢ VÀ CAM KẾT THANH TOÁN TIỀN\n\nHôm nay, ngày {{ngay_lap}} tháng {{thang_lap}} năm {{nam_lap}}, chúng tôi gồm:\n\nBÊN CHO VAY / CHỦ NỢ (BÊN A):\n- Họ và tên: {{ben_cho_vay_ten}}\n- CCCD số: {{ben_cho_vay_cccd}}\n- Cư trú tại: {{ben_cho_vay_dia_chi}}\n\nBÊN VAY NỢ / NGƯỜI CAM KẾT (BÊN B):\n- Họ và tên: {{ben_vay_ten}}\n- CCCD số: {{ben_vay_cccd}}\n- Cư trú tại: {{ben_vay_dia_chi}}\n- Số điện thoại liên hệ: {{ben_vay_sdt}}\n\nBên B tự nguyện xác nhận và cam kết trước Bên A các nội dung sau:\n\n1. SỐ TIỀN NỢ XÁC NHẬN:\nBên B thừa nhận tính đến thời điểm hiện tại còn nợ Bên A số tiền là:\n- Bằng số: {{so_tien_no_so}} VNĐ.\n- Bằng chữ: {{so_tien_no_chu}}.\n\n2. THỜI HẠN VÀ PHƯƠNG THỨC THANH TOÁN:\n- Thời hạn thanh toán dứt điểm: {{thoi_han_tra_cuoi}}.\n- Phương thức thanh toán: {{phuong_thuc_thanh_toan}}.\n\n3. CHẾ TÀI PHẠT VI PHẠM VÀ CAM KẾT THỰC HIỆN:\n{{che_tai_vi_pham}}\n\nGiấy này được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản để làm chứng cứ thực hiện nghĩa vụ."
        },
        {
          "id": "don-khoi-kien-doi-no",
          "title": "Đơn khởi kiện vụ án dân sự (Đòi tiền nợ & bồi thường thiệt hại)",
          "code": "DKK-DS",
          "aiFieldKey": "noi_dung_khoi_kien",
          "aiFieldLabel": "Diễn biến sự việc & Căn cứ khởi kiện (Có AI hỗ trợ)",
          "description": "Mẫu đơn số 23-DS chuẩn Nghị quyết 01/2017/NQ-HĐTP gửi Tòa án nhân dân cấp huyện khởi kiện bên vay nợ cố tình chây ì không trả.",
          "fields": [
            {
              "key": "nguoi_khoi_kien_ten",
              "label": "Họ và tên Người khởi kiện (Nguyên đơn)",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "nguoi_khoi_kien_cccd",
              "label": "Số CCCD Người khởi kiện",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "nguoi_khoi_kien_dia_chi",
              "label": "Địa chỉ cư trú Người khởi kiện",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Số 50 Phố Huế, Hai Bà Trưng, Hà Nội"
            },
            {
              "key": "nguoi_khoi_kien_sdt",
              "label": "Điện thoại Người khởi kiện",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "0912345678"
            },
            {
              "key": "nguoi_bi_kien_ten",
              "label": "Họ và tên Người bị kiện (Bị đơn)",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "TRẦN VĂN B"
            },
            {
              "key": "nguoi_bi_kien_dia_chi",
              "label": "Địa chỉ cư trú Người bị kiện",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Số 88 Đường Cầu Giấy, Cầu Giấy, Hà Nội"
            },
            {
              "key": "nguoi_bi_kien_sdt",
              "label": "Điện thoại Người bị kiện",
              "type": "text",
              "required": false,
              "group": "benb",
              "placeholder": "0988776655"
            },
            {
              "key": "toa_an_thu_ly",
              "label": "Tòa án nhân dân có thẩm quyền thụ lý",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Tòa án nhân dân quận Cầu Giấy, thành phố Hà Nội"
            },
            {
              "key": "so_tien_khoi_kien_goc",
              "label": "Số tiền nợ gốc yêu cầu đòi (VNĐ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "500.000.000"
            },
            {
              "key": "so_tien_khoi_kien_lai",
              "label": "Số tiền lãi phát sinh yêu cầu đòi (VNĐ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "50.000.000"
            },
            {
              "key": "noi_dung_khoi_kien",
              "label": "Tóm tắt sự việc cho vay nợ và quá trình đòi nợ không thành (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Vào ngày... Bên B có vay của tôi số tiền... hẹn ngày... trả nợ. Tuy nhiên đến nay Bên B cố tình lẩn tránh không thực hiện nghĩa vụ dù tôi đã nhiều lần đôn đốc nhắc nhở..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nĐƠN KHỞI KIỆN VỤ ÁN DÂN SỰ\n(V/v: Tranh chấp hợp đồng vay tài sản)\n\nKính gửi: {{toa_an_thu_ly}}\n\nNGƯỜI KHỞI KIỆN (NGUYÊN ĐƠN):\n- Họ và tên: {{nguoi_khoi_kien_ten}}\n- CCCD: {{nguoi_khoi_kien_cccd}}\n- Địa chỉ: {{nguoi_khoi_kien_dia_chi}}\n- Số điện thoại: {{nguoi_khoi_kien_sdt}}\n\nNGƯỜI BỊ KIỆN (BỊ ĐƠN):\n- Họ và tên: {{nguoi_bi_kien_ten}}\n- Địa chỉ: {{nguoi_bi_kien_dia_chi}}\n- Số điện thoại: {{nguoi_bi_kien_sdt}}\n\nNỘI DUNG VỤ VIỆC:\n{{noi_dung_khoi_kien}}\n\nYÊU CẦU TÒA ÁN GIẢI QUYẾT NHỮNG VẤN ĐỀ SAU ĐÂY:\n1. Buộc bị đơn {{nguoi_bi_kien_ten}} phải hoàn trả cho tôi số tiền nợ gốc là: {{so_tien_khoi_kien_goc}} VNĐ.\n2. Buộc bị đơn phải thanh toán số tiền lãi theo quy định của pháp luật là: {{so_tien_khoi_kien_lai}} VNĐ.\n3. Buộc bị đơn chịu toàn bộ án phí dân sự theo quy định của pháp luật.\n\nDANH MỤC TÀI LIỆU, CHỨNG CỨ KÈM THEO:\n1. Bản sao Giấy nhận nợ / Giấy chuyển khoản ngân hàng.\n2. Bản sao CCCD của người khởi kiện.\n3. Vi bằng / Tin nhắn trao đổi đòi nợ (nếu có)."
        }
      ]
    },
    {
      "id": "lao-dong-viec-lam",
      "name": "8. Lao động, Tiền lương & Bảo hiểm Xã hội",
      "icon": "Briefcase",
      "description": "Đơn khiếu nại chấm dứt HĐLĐ trái luật, Đơn tố cáo chậm trả lương & nợ BHXH...",
      "procedures": [
        {
          "id": "khieu-nai-sa-thai-trai-luat",
          "title": "Đơn khiếu nại quyết định chấm dứt hợp đồng lao động trái pháp luật",
          "code": "KN-HĐLĐ",
          "aiFieldKey": "ly_do_khieu_nai",
          "aiFieldLabel": "Căn cứ chứng minh Công ty chấm dứt HĐLĐ trái pháp luật (Có AI hỗ trợ)",
          "description": "Văn bản khiếu nại gửi Ban Giám đốc Công ty yêu cầu bồi thường và khôi phục quyền lợi theo Điều 41 Bộ luật Lao động 2019.",
          "fields": [
            {
              "key": "nguoi_lao_dong_ten",
              "label": "Họ và tên Người lao động (Người khiếu nại)",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "nguoi_lao_dong_cccd",
              "label": "Số CCCD",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "nguoi_lao_dong_dia_chi",
              "label": "Nơi cư trú",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Số 45 Lê Văn Lương, Thanh Xuân, Hà Nội"
            },
            {
              "key": "nguoi_lao_dong_sdt",
              "label": "Số điện thoại",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "0912345678"
            },
            {
              "key": "ten_cong_ty",
              "label": "Tên Công ty / Người sử dụng lao động",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Công ty Cổ phần Thương mại và Dịch vụ XYZ"
            },
            {
              "key": "dia_chi_cong_ty",
              "label": "Địa chỉ trụ sở Công ty",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Tầng 5 Tòa nhà Keangnam, Nam Từ Liêm, Hà Nội"
            },
            {
              "key": "nguoi_dai_dien_phap_luat",
              "label": "Người đại diện theo pháp luật (Giám đốc)",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Ông Trần Văn Giám Đốc"
            },
            {
              "key": "vi_tri_viec_lam",
              "label": "Vị trí công việc & Thời gian làm việc",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Trưởng nhóm Kỹ thuật theo HĐLĐ số 12/HĐLĐ ký ngày 01/01/2023"
            },
            {
              "key": "quyet_dinh_sa_thai_so",
              "label": "Số Quyết định cho thôi việc / sa thải",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Quyết định số 88/QĐ-XYZ ngày 15/01/2026"
            },
            {
              "key": "muc_luong_thang",
              "label": "Mức lương thỏa thuận hàng tháng (VNĐ)",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "25.000.000"
            },
            {
              "key": "ly_do_khieu_nai",
              "label": "Căn cứ chứng minh việc sa thải là trái quy định Bộ luật Lao động (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Công ty không thông báo trước theo quy định Điều 36 BLLĐ, không có lý do chính đáng và không tổ chức họp xử lý kỷ luật lao động có sự tham gia của công đoàn..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nĐƠN KHIẾU NẠI\n(V/v: Quyết định chấm dứt hợp đồng lao động trái pháp luật)\n\nKính gửi: BAN GIÁM ĐỐC / TỔNG GIÁM ĐỐC {{ten_cong_ty}}\n\nTôi là: {{nguoi_lao_dong_ten}}\n- CCCD số: {{nguoi_lao_dong_cccd}}\n- Nơi cư trú: {{nguoi_lao_dong_dia_chi}}\n- Số điện thoại: {{nguoi_lao_dong_sdt}}\n- Vị trí công tác: {{vi_tri_viec_lam}}\n\nTôi làm đơn này xin khiếu nại về việc: {{quyet_dinh_sa_thai_so}} của Công ty về việc chấm dứt hợp đồng lao động đối với tôi.\n\nCĂN CỨ VÀ LÝ DO KHIẾU NẠI:\n{{ly_do_khieu_nai}}\n\nYÊU CẦU GIẢI QUYẾT KHIẾU NẠI:\nCăn cứ Điều 41 Bộ luật Lao động 2019, tôi yêu cầu Công ty:\n1. Hủy bỏ quyết định chấm dứt HĐLĐ trái luật nêu trên.\n2. Trả đầy đủ tiền lương và đóng bảo hiểm xã hội trong những ngày tôi không được làm việc.\n3. Bồi thường cho tôi số tiền ít nhất bằng 02 tháng tiền lương (tương đương {{muc_luong_thang}} VNĐ x 2) theo quy định."
        },
        {
          "id": "don-to-cao-no-luong-bhxh",
          "title": "Đơn kiến nghị / Tố cáo hành vi nợ lương và chậm đóng bảo hiểm xã hội",
          "code": "TC-LUONG-BHXH",
          "aiFieldKey": "noi_dung_to_cao",
          "aiFieldLabel": "Nội dung nợ lương & Tác động tiêu cực đến đời sống (Có AI hỗ trợ)",
          "description": "Đơn gửi Thanh tra Sở Lao động - Thương binh & Xã hội hoặc Phòng LĐ-TB&XH quận/huyện can thiệp xử lý doanh nghiệp vi phạm.",
          "fields": [
            {
              "key": "nguoi_to_cao_ten",
              "label": "Họ và tên Người làm đơn",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "nguoi_to_cao_cccd",
              "label": "Số CCCD",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "nguoi_to_cao_sdt",
              "label": "Số điện thoại",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "0912345678"
            },
            {
              "key": "co_quan_tiep_nhan",
              "label": "Cơ quan chức năng tiếp nhận đơn",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Thanh tra Sở Lao động - Thương binh và Xã hội TP. Hà Nội"
            },
            {
              "key": "ten_doanh_nghiep_vi_pham",
              "label": "Tên Doanh nghiệp vi phạm",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Công ty Cổ phần Xây dựng ABC"
            },
            {
              "key": "dia_chi_doanh_nghiep",
              "label": "Địa chỉ Doanh nghiệp",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Khu công nghiệp Quang Minh, Mê Linh, Hà Nội"
            },
            {
              "key": "so_thang_no_luong",
              "label": "Số tháng bị nợ lương & Tổng số tiền nợ",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Nợ 04 tháng lương (từ tháng 09/2025 đến 12/2025), tổng cộng 60.000.000 VNĐ"
            },
            {
              "key": "tinh_trang_bhxh",
              "label": "Tình trạng nợ đóng BHXH",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Công ty đã trừ lương nhưng chưa đóng BHXH cho cơ quan BHXH trong 10 tháng"
            },
            {
              "key": "noi_dung_to_cao",
              "label": "Trình bày diễn biến và kiến nghị can thiệp (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Tôi đã nhiều lần kiến nghị nhưng Ban Giám đốc chỉ hứa hẹn và không giải quyết, gây ảnh hưởng nghiêm trọng đến đời sống gia đình..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nĐƠN KIẾN NGHỊ / TỐ CÁO HÀNH VI VI PHẠM PHÁP LUẬT LAO ĐỘNG\n(V/v: Doanh nghiệp chây ì nợ lương và chậm đóng bảo hiểm xã hội)\n\nKính gửi: {{co_quan_tiep_nhan}}\n\nTôi là: {{nguoi_to_cao_ten}}\n- CCCD: {{nguoi_to_cao_cccd}}\n- Điện thoại liên hệ: {{nguoi_to_cao_sdt}}\n\nTôi làm đơn này xin kính báo với Quý cơ quan hành vi vi phạm pháp luật của: {{ten_doanh_nghiep_vi_pham}}\n- Địa chỉ trụ sở: {{dia_chi_doanh_nghiep}}\n\nNỘI DUNG VI PHẠM CỦA DOANH NGHIỆP:\n1. Về tiền lương: {{so_thang_no_luong}}.\n2. Về bảo hiểm xã hội: {{tinh_trang_bhxh}}.\n\nDIỄN BIẾN SỰ VIỆC:\n{{noi_dung_to_cao}}\n\nKIẾN NGHỊ QUÝ CƠ QUAN:\nKính đề nghị Quý cơ quan tiến hành thanh tra, xử phạt vi phạm hành chính và buộc người sử dụng lao động phải thanh toán đầy đủ tiền lương, đóng bổ sung BHXH theo đúng quy định pháp luật."
        }
      ]
    },
    {
      "id": "dat-dai-hanh-chinh",
      "name": "9. Tranh chấp Đất đai & Khiếu nại Hành chính",
      "icon": "ShieldAlert",
      "description": "Đơn đề nghị hòa giải tranh chấp đất đai tại xã, Đơn khiếu nại bồi thường thu hồi đất...",
      "procedures": [
        {
          "id": "don-hoa-giai-tranh-chap-dat",
          "title": "Đơn đề nghị hòa giải tranh chấp quyền sử dụng đất tại UBND cấp xã",
          "code": "HG-TC-DAT",
          "aiFieldKey": "noi_dung_tranh_chap",
          "aiFieldLabel": "Mô tả diễn biến tranh chấp ranh giới / quyền sử dụng đất (Có AI hỗ trợ)",
          "description": "Thủ tục hòa giải bắt buộc theo Điều 235 Luật Đất đai 2024 tại UBND cấp xã nơi có đất trước khi khởi kiện Tòa án.",
          "fields": [
            {
              "key": "nguoi_yeu_cau_ten",
              "label": "Họ và tên Người làm đơn (Bên A)",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "nguoi_yeu_cau_cccd",
              "label": "Số CCCD Người làm đơn",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "nguoi_yeu_cau_dia_chi",
              "label": "Nơi cư trú",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Thôn Do Hạ, xã Tiền Phong, Mê Linh, Hà Nội"
            },
            {
              "key": "nguoi_yeu_cau_sdt",
              "label": "Số điện thoại",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "0912345678"
            },
            {
              "key": "ben_tranh_chap_ten",
              "label": "Họ và tên Bên bị tranh chấp (Bên B)",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "TRẦN VĂN B (Hộ liền kề)"
            },
            {
              "key": "ben_tranh_chap_dia_chi",
              "label": "Nơi cư trú Bên bị tranh chấp",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Thôn Do Hạ, xã Tiền Phong, Mê Linh, Hà Nội"
            },
            {
              "key": "ubnd_xa_thu_ly",
              "label": "UBND cấp xã có thẩm quyền hòa giải",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Ủy ban nhân dân xã Tiền Phong, huyện Mê Linh, TP. Hà Nội"
            },
            {
              "key": "thua_dat_tranh_chap",
              "label": "Thông tin thửa đất tranh chấp",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Thửa đất số 45, tờ bản đồ số 10 tại thôn Do Hạ theo GCN số CH-00123 cấp ngày 15/04/2015"
            },
            {
              "key": "noi_dung_tranh_chap",
              "label": "Mô tả nguồn gốc đất và hành vi lấn chiếm/tranh chấp (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Hộ gia đình ông B trong quá trình xây dựng tường rào đã tự ý lấn chiếm sang phần đất của gia đình tôi khoảng 15m2 bề rộng 0.8m kéo dài suốt cạnh phía Tây..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nĐƠN ĐỀ NGHỊ HÒA GIẢI TRANH CHẤP ĐẤT ĐAI\n\nKính gửi: CHỦ TỊCH VÀ HỘI ĐỒNG HÒA GIẢI ĐẤT ĐAI {{ubnd_xa_thu_ly}}\n\nTôi là: {{nguoi_yeu_cau_ten}}\n- CCCD số: {{nguoi_yeu_cau_cccd}}\n- Cư trú tại: {{nguoi_yeu_cau_dia_chi}}\n- Số điện thoại: {{nguoi_yeu_cau_sdt}}\n\nXin trình báo và đề nghị Quý cơ quan tổ chức hòa giải tranh chấp quyền sử dụng đất với:\nÔng/Bà: {{ben_tranh_chap_ten}}\n- Cư trú tại: {{ben_tranh_chap_dia_chi}}\n\nĐỐI TƯỢNG TRANH CHẤP:\n{{thua_dat_tranh_chap}}\n\nNỘI DUNG VÀ NGUYÊN NHÂN TRANH CHẤP:\n{{noi_dung_tranh_chap}}\n\nCĂN CỨ VÀ NỘI DUNG ĐỀ NGHỊ:\nCăn cứ Điều 235 Luật Đất đai 2024, tôi kính đề nghị Chủ tịch UBND xã và Hội đồng hòa giải đất đai cấp xã xem xét, tiến hành thẩm tra thực địa và tổ chức phiên họp hòa giải tranh chấp đất đai giữa hai gia đình theo đúng thời hạn luật định."
        },
        {
          "id": "don-khieu-nai-thu-hoi-dat",
          "title": "Đơn khiếu nại quyết định bồi thường, hỗ trợ tái định cư khi thu hồi đất",
          "code": "KN-BTTDC",
          "aiFieldKey": "noi_dung_khi_khieu_nai",
          "aiFieldLabel": "Căn cứ cho rằng giá bồi thường chưa thỏa đáng (Có AI hỗ trợ)",
          "description": "Văn bản khiếu nại gửi UBND cấp huyện yêu cầu thẩm định lại giá đất bồi thường theo giá thị trường căn cứ Luật Đất đai 2024.",
          "fields": [
            {
              "key": "nguoi_khi_khieu_nai_ten",
              "label": "Họ và tên Người khiếu nại",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "NGUYỄN VĂN A"
            },
            {
              "key": "nguoi_khi_khieu_nai_cccd",
              "label": "Số CCCD",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "001090012345"
            },
            {
              "key": "nguoi_khi_khieu_nai_dia_chi",
              "label": "Nơi cư trú",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "Xã Tiền Phong, Mê Linh, Hà Nội"
            },
            {
              "key": "nguoi_khi_khieu_nai_sdt",
              "label": "Số điện thoại",
              "type": "text",
              "required": true,
              "group": "bena",
              "placeholder": "0912345678"
            },
            {
              "key": "co_quan_bi_khieu_nai",
              "label": "Cơ quan có thẩm quyền giải quyết khiếu nại",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Chủ tịch Ủy ban nhân dân huyện Mê Linh, TP. Hà Nội"
            },
            {
              "key": "quyet_dinh_bi_khieu_nai",
              "label": "Quyết định bồi thường số / Ngày ban hành",
              "type": "text",
              "required": true,
              "group": "benb",
              "placeholder": "Quyết định số 1520/QĐ-UBND ngày 10/11/2025 của UBND huyện Mê Linh"
            },
            {
              "key": "du_an_thu_hoi",
              "label": "Tên Dự án thu hồi đất",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "Dự án đầu tư xây dựng đường Vành đai 4 - Vùng Thủ đô Hà Nội"
            },
            {
              "key": "dien_tich_thu_hoi",
              "label": "Diện tích đất bị thu hồi",
              "type": "text",
              "required": true,
              "group": "taisan",
              "placeholder": "180 m2 đất ở và tài sản gắn liền trên đất"
            },
            {
              "key": "noi_dung_khi_khieu_nai",
              "label": "Trình bày lý do khiếu nại về đơn giá bồi thường / suất tái định cư (Có AI hỗ trợ)",
              "type": "textarea",
              "required": true,
              "group": "dieuphap",
              "placeholder": "Đơn giá bồi thường đất ở áp dụng là 6.500.000đ/m2 là quá thấp so với giá đất thực tế giao dịch tại địa phương (khoảng 22.000.000đ/m2), đồng thời phương án chưa bố trí suất tái định cư hợp lý cho hộ gia đình..."
            }
          ],
          "templateContent": "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n------------------\n\nĐƠN KHIẾU NẠI\n(V/v: Khiếu nại phương án bồi thường, hỗ trợ tái định cư khi Nhà nước thu hồi đất)\n\nKính gửi: {{co_quan_bi_khieu_nai}}\n\nTôi là: {{nguoi_khi_khieu_nai_ten}}\n- CCCD: {{nguoi_khi_khieu_nai_cccd}}\n- Cư trú tại: {{nguoi_khi_khieu_nai_dia_chi}}\n- Số điện thoại: {{nguoi_khi_khieu_nai_sdt}}\n\nTôi làm đơn này xin khiếu nại về: {{quyet_dinh_bi_khieu_nai}} liên quan đến việc thu hồi đất phục vụ: {{du_an_thu_hoi}} đối với thửa đất diện tích {{dien_tich_thu_hoi}} của gia đình tôi.\n\nNỘI DUNG VÀ CĂN CỨ KHIẾU NẠI:\n{{noi_dung_khi_khieu_nai}}\n\nYÊU CẦU GIẢI QUYẾT KHIẾU NẠI:\nCăn cứ Luật Khiếu nại 2011 và Luật Đất đai 2024, tôi kính đề nghị Quý cơ quan:\n1. Xem xét lại đơn giá bồi thường đất ở sát với giá thị trường theo nguyên tắc của Luật Đất đai 2024.\n2. Bố trí quỹ đất tái định cư đủ điều kiện hạ tầng cho gia đình tôi ổn định cuộc sống."
        }
      ]
    }
  ],
  "settings": {
    "aiProvider": "gemini",
    "geminiApiKey": "",
    "geminiModel": "gemini-2.5-flash",
    "claudeApiKey": "",
    "claudeModel": "claude-3-7-sonnet-latest",
    "systemPrompt": "Bạn là Trợ lý Pháp lý Tư pháp Cao cấp tại Việt Nam.\nNhiệm vụ của bạn là tiếp nhận đoạn văn bản mô tả sơ bộ/lủng củng/ngôn từ đời thường của người dân về các nội dung tư pháp (như Lý do sửa đổi/hủy bỏ hợp đồng, Nguyện vọng di chúc, Lý do từ chối di sản, Cam kết bảo đảm tài sản...), sau đó TÁI TẠO LẠI thành đoạn văn bản pháp lý hành chính chuẩn mực, chặt chẽ, trang trọng, tuân thủ đúng thể thức quy định tại Nghị định 23/2015/NĐ-CP, Bộ luật Dân sự 2015 và Nghị định 30/2020/NĐ-CP.\nYêu cầu:\n- Tuyệt đối không thay đổi sự thật cốt lõi do người dùng cung cấp.\n- Sử dụng đúng thuật ngữ pháp lý Việt Nam (ví dụ: \"chuyển quyền sử dụng\", \"không nhằm trốn tránh nghĩa vụ\", \"tự nguyện thỏa thuận không có tranh chấp\").\n- Trả về đoạn văn hoàn chỉnh, súc tích, có thể đưa trực tiếp vào hợp đồng/văn bản công chứng mà không cần thêm lời chào hay giải thích rườm rà."
  },
  "submissions": []
};
