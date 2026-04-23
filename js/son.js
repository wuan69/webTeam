 function tinhTongTien() {
    const hienThiGia = document.getElementById("tongTienDisplay");
    if (!hienThiGia) return;

    // 1. Lấy giá gốc từ thuộc tính data-base-price trên HTML (ví dụ: 4850000)
    const giaGoc = parseInt(hienThiGia.getAttribute("data-base-price"));// date base price tự động nhận diện giá gốc của tour đó

    // 2. Tính giá người lớn thứ 2 trở đi (Làm tròn xuống hàng triệu)
    // Ví dụ: 4850000 / 1000000 = 4.85 -> Math.floor là 4 -> * 1tr = 4.000.000
    const giaNguoiLonThem = Math.floor(giaGoc / 1000000) * 1000000;

    // 3. Tính giá trẻ em (Một nửa giá gốc, làm tròn xuống hàng triệu)
    // Ví dụ: (4850000/2) = 2425000 / 1000000 = 2.425 -> Math.floor là 2 -> * 1tr = 2.000.000
    const giaTreEm = Math.floor((giaGoc / 2) / 1000000) * 1000000;

    // 4. Lấy số lượng người dùng đang nhập
    let soNguoiLon = parseInt(document.getElementById("nguoiLon").value) || 1;
    let soTreEm = parseInt(document.getElementById("treEm").value) || 0;

    // Rào lỗi: Ngăn người dùng nhập số âm hoặc số 0 cho người lớn
    if (soNguoiLon < 1) {
      soNguoiLon = 1;
      document.getElementById("nguoiLon").value = 1;
    }
    if (soTreEm < 0) {
      soTreEm = 0;
      document.getElementById("treEm").value = 0;
    }

    // 5. Tính toán tổng tiền
    // Người lớn đầu tiên chịu giá gốc. Số người lớn còn lại tính giá đã làm tròn.
    let tongTien = giaGoc + ((soNguoiLon - 1) * giaNguoiLonThem) + (soTreEm * giaTreEm);

    // 6. Hiển thị ra giao diện với định dạng tiền tệ VNĐ
    hienThiGia.innerText = tongTien.toLocaleString("vi-VN") + "đ";
  }

  // Tự động chạy hàm 1 lần khi trang vừa load xong để đảm bảo giá chính xác
  document.addEventListener("DOMContentLoaded", () => {
    tinhTongTien();
  });
  ///////////////////////////////////////////////////////////////////////
  // Hàm kiểm tra ngày đi
  function validateNgayDi() {
    const inputNgay = document.getElementById("ngayDi");
    const baoLoi = document.getElementById("bao");
    
    // 1. Kiểm tra nếu để trống
    if (!inputNgay.value) {
      baoLoi.textContent = "Vui lòng chọn ngày khởi hành!";
      return false;
    }

    // 2. Chuyển đổi định dạng ngày để so sánh
    const ngayChon = new Date(inputNgay.value);
    const homNay = new Date();
    homNay.setHours(0, 0, 0, 0); // Xóa giờ/phút/giây để so sánh ngày cho chuẩn

    // 3. Quy định số ngày đặt trước (Ví dụ: 10 ngày)
    const soNgayDatTruoc = 10; 
    const ngayToiThieu = new Date(homNay);
    ngayToiThieu.setDate(ngayToiThieu.getDate() + soNgayDatTruoc);

    // 4. Kiểm tra điều kiện
    if (ngayChon < ngayToiThieu) {
      baoLoi.textContent = `Lỗi: Vui lòng đặt tour trước ít nhất ${soNgayDatTruoc} ngày!`;
      return false; 
    }

    // Nếu mọi thứ hợp lệ -> Xóa dòng báo lỗi
    baoLoi.textContent = "";
    return true; 
  }

  // Hàm xử lý khi bấm nút "ĐẶT TOUR NGAY"
  function luuDuLieu(event) {
    if (event) event.preventDefault();

    if (!validateNgayDi()) {
      alert("Vui lòng chọn ngày khởi hành hợp lệ trước khi đặt tour!");
      document.getElementById("ngayDi").focus(); 
      return; 
    }

    // --- LẤY DỮ LIỆU TỪ GIAO DIỆN ---
    const ngayKhoiHanh = document.getElementById("ngayDi").value;
    const soNguoiLon = document.getElementById("nguoiLon").value;
    const soTreEm = document.getElementById("treEm").value;
    const tongTien = document.getElementById("tongTienDisplay").innerText;
    
    // --- TÌM MÃ VÙNG (Đảm bảo chính xác 100%) ---
    // Quét nội dung thẻ h1, thẻ title và thanh breadcrumb để tìm từ khóa
    const theTieuDe = document.querySelector("h1") ? document.querySelector("h1").innerText : document.title;
    const breadcrumb = document.querySelector(".breadcrumb") ? document.querySelector(".breadcrumb").innerText : "";
    const textDeTim = (theTieuDe + " " + breadcrumb).toUpperCase();

    let prefix = "TOUR";
    if (textDeTim.includes("QUẢNG NGÃI") || textDeTim.includes("LÝ SƠN") || textDeTim.includes("SA HUỲNH")) {
        prefix = "QN";
    } else if (textDeTim.includes("BÌNH ĐỊNH") || textDeTim.includes("QUY NHƠN") || textDeTim.includes("KỲ CO") || textDeTim.includes("CÙ LAO XANH") || textDeTim.includes("THÁP BÁNH ÍT")) {
        prefix = "BD";
    } else if (textDeTim.includes("HUẾ") || textDeTim.includes("PHONG NHA") || textDeTim.includes("TAM GIANG")) {
        prefix = "HUE";
    } else if (textDeTim.includes("LÂM ĐỒNG") || textDeTim.includes("ĐÀ LẠT") || textDeTim.includes("BẢO LỘC") || textDeTim.includes("LANGBIANG")) {
        prefix = "LD";
    }

    // --- LƯU ĐỒNG BỘ DATA ---
    localStorage.setItem("nguoiLon", soNguoiLon); 
    localStorage.setItem("treEm", soTreEm); 
    localStorage.setItem("tenTour", theTieuDe); 
    localStorage.setItem("ngayDi", ngayKhoiHanh);
    localStorage.setItem("maVung", prefix); // CHỐT MÃ VÙNG CHUẨN ĐỂ ĐẨY QUA TRANG SAU
    localStorage.setItem("tongTienTour", tongTien);

    window.location.href = "dattour.html";
  }