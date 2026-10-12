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
