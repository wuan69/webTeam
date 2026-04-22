// ===================== VALIDATE =====================
function ktrTen() {
    let name = document.getElementById("nameForm").value.trim();
    let chk = /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/;

    let noti = document.getElementById("not1");

    if (chk.test(name) && name !== "") {
        noti.innerHTML = "Hợp lệ";
        noti.style.color = "green";
        return true;
    } else {
        noti.innerHTML = "Tên không hợp lệ";
        noti.style.color = "red";
        return false;
    }
}

function ktrPhone() {
    let phone = document.getElementById("phoneForm").value.trim();
    let chk = /^(0\d{9}|\+84\d{9})$/;

    let noti = document.getElementById("not2");

    if (chk.test(phone)) {
        noti.innerHTML = "Hợp lệ";
        noti.style.color = "green";
        return true;
    } else {
        noti.innerHTML = "SĐT không hợp lệ";
        noti.style.color = "red";
        return false;
    }
}

function ktrEmail() {
    let email = document.getElementById("emailForm").value.trim();
    let chk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let noti = document.getElementById("not3");

    if (chk.test(email)) {
        noti.innerHTML = "Hợp lệ";
        noti.style.color = "green";
        return true;
    } else {
        noti.innerHTML = "Email sai";
        noti.style.color = "red";
        return false;
    }
}

// ===================== LOAD DATA =====================
function layDuLieu() {
    let nguoiLon = parseInt(localStorage.getItem("nguoiLon")) || 0;
    let treEm = parseInt(localStorage.getItem("treEm")) || 0;

    document.getElementById("nguoiLon").value = nguoiLon;
    document.getElementById("treEm").value = treEm;
    document.getElementById("soNguoiDiCung").value = nguoiLon + treEm;
}

// ===================== CHECK BUTTON =====================
function kiemTra() {
    let ok =
        document.getElementById("agree").checked &&
        ktrTen() &&
        ktrPhone() &&
        ktrEmail();

    document.getElementById("btnThanhToan").disabled = !ok;
}

// ===================== TẠO MÃ THEO VÙNG =====================
function taoMaDon() {
    // Lấy tên tour đã chọn từ localStorage
    let tenTour = localStorage.getItem("tenTour") || "";
    let upperTen = tenTour.toUpperCase();
    let prefix = "TOUR"; // mặc định

    // Kiểm tra vùng Quảng Ngãi
    if (upperTen.includes("QUẢNG NGÃI") ||
        upperTen.includes("LÝ SƠN") ||
        upperTen.includes("SA HUỲNH") ||
        upperTen.includes("SƠN THỦY HỮU TÌNH") ||
        upperTen.includes("HAWAII VIỆT NAM") ||
        upperTen.includes("VĂN HÓA SA HUỲNH")) {
        prefix = "QN";
    }
    // Kiểm tra vùng Bình Định
    else if (upperTen.includes("BÌNH ĐỊNH") ||
             upperTen.includes("QUY NHƠN") ||
             upperTen.includes("KỲ CO") ||
             upperTen.includes("EO GIÓ") ||
             upperTen.includes("CÙ LAO XANH") ||
             upperTen.includes("ĐẤT VÕ") ||
             upperTen.includes("THÁP BÁNH ÍT") ||
             upperTen.includes("TÂY SƠN")) {
        prefix = "BD";
    }
    // Kiểm tra vùng Thừa Thiên Huế
    else if (upperTen.includes("THỪA THIÊN HUẾ") ||
             upperTen.includes("HUẾ") ||
             upperTen.includes("ĐẠI NỘI") ||
             upperTen.includes("LĂNG KHẢI ĐỊNH") ||
             upperTen.includes("PHÁ TAM GIANG") ||
             upperTen.includes("LĂNG CÔ") ||
             upperTen.includes("PHONG NHA") ||
             upperTen.includes("DI SẢN")) {
        prefix = "HUE";
    }
    // Kiểm tra vùng Lâm Đồng
    else if (upperTen.includes("LÂM ĐỒNG") ||
             upperTen.includes("ĐÀ LẠT") ||
             upperTen.includes("BẢO LỘC") ||
             upperTen.includes("LANGBIANG") ||
             upperTen.includes("THÀNH PHỐ SƯƠNG MÙ") ||
             upperTen.includes("HƯƠNG TRÀ") ||
             upperTen.includes("TREKKING")) {
        prefix = "LD";
    }

    // Tạo 5 số ngẫu nhiên (10000 -> 99999)
    let randomNum = Math.floor(10000 + Math.random() * 90000);
    return prefix + "-" + randomNum;
}

// ===================== MAIN =====================
document.addEventListener("DOMContentLoaded", function () {

    layDuLieu();

    let btn = document.getElementById("btnThanhToan");

    document.getElementById("nameForm").addEventListener("input", kiemTra);
    document.getElementById("phoneForm").addEventListener("input", kiemTra);
    document.getElementById("emailForm").addEventListener("input", kiemTra);
    document.getElementById("agree").addEventListener("change", kiemTra);

    btn.onclick = function () {

        if (!ktrTen() || !ktrPhone() || !ktrEmail()) {
            alert("Vui lòng nhập đúng thông tin!");
            return;
        }

        let nguoiLon = parseInt(document.getElementById("nguoiLon").value) || 0;
        let treEm = parseInt(document.getElementById("treEm").value) || 0;

        let don = {
            maTour: taoMaDon(),
            hoTen: document.getElementById("nameForm").value,
            sdt: document.getElementById("phoneForm").value,
            email: document.getElementById("emailForm").value,
            soLuong: nguoiLon + treEm,
            trangThai: "Chưa thanh toán",
            gioDat: new Date().toLocaleString()
        };

        // lưu đơn hiện tại
        localStorage.setItem("donTam", JSON.stringify(don));

        // lưu danh sách
        let ds = JSON.parse(localStorage.getItem("danhSachDon")) || [];
        ds.push(don);
        localStorage.setItem("danhSachDon", JSON.stringify(ds));

        window.location.href = "thanhtoan.html";
    };

    kiemTra();
});