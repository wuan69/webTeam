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