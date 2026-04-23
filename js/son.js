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
    // Ngăn chặn thẻ <a> tự động chuyển trang
    if (event) event.preventDefault();

    // Gọi hàm kiểm tra, nếu false (bị lỗi) thì dừng lại ngay
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
    
    // Giả sử tên tour nằm trong thẻ <h1>
    const theTieuDe = document.querySelector("h1");
    const tenTour = theTieuDe ? theTieuDe.innerText : "TOUR DU LỊCH";

    localStorage.setItem("nguoiLon", soNguoiLon); 
    localStorage.setItem("treEm", soTreEm); 
    localStorage.setItem("tenTour", tenTour); 
    localStorage.setItem("ngayDi", ngayKhoiHanh); // Lưu thêm dự phòng

    localStorage.setItem("tongTienTour", tongTien);

    // Sau khi lưu xong thì chuyển sang trang đặt tour
    window.location.href = "dattour.html";
  }
