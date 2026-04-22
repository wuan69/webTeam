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

// ===================== TẠO MÃ =====================
function taoMaDon() {
    let time = Date.now().toString().slice(-6);
    let rand = Math.floor(100 + Math.random() * 900);
    return "TOUR-" + time + rand;
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