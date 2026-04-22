   // ===================== KIỂM TRA FORM =====================
function ktrTen() {
    let name = document.getElementById("nameForm").value.trim();
    let chkName = /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/;

    if (chkName.test(name) && name !== "") {
        document.getElementById("not1").innerHTML = "Hợp lệ";
        document.getElementById("not1").style.color = "green";
        return true;
    } else {
        document.getElementById("not1").innerHTML = "Họ tên không hợp lệ (VD: Nguyễn Văn A)";
        document.getElementById("not1").style.color = "red";
        return false;
    }
}

function ktrPhone() {
    let phone = document.getElementById("phoneForm").value.trim();
    let chkPhone = /^(0[0-9]{9}|(\+84)[0-9]{9})$/;

    if (chkPhone.test(phone)) {
        document.getElementById("not2").innerHTML = "Hợp lệ";
        document.getElementById("not2").style.color = "green";
        return true;
    } else {
        document.getElementById("not2").innerHTML = "Số điện thoại không hợp lệ (VD: 0909123456)";
        document.getElementById("not2").style.color = "red";
        return false;
    }
}

function ktrEmail() {
    let email = document.getElementById("emailForm").value.trim();
    let chkEmail = /@.*\.com$/;

    if (chkEmail.test(email) && email !== "") {
        document.getElementById("not3").innerHTML = "Hợp lệ";
        document.getElementById("not3").style.color = "green";
        return true;
    } else {
        document.getElementById("not3").innerHTML = "Email không hợp lệ (VD: ten@example.com)";
        document.getElementById("not3").style.color = "red";
        return false;
    }
}

// ===================== LẤY DỮ LIỆU RADIO =====================
function layTyLeThanhToan() {
    let dl = document.querySelector('input[name="tyle"]:checked');
    return dl ? dl.value : "100";
}

function layPhuongThucThanhToan() {
    let dl = document.querySelector('input[name="pttt"]:checked');
    return dl ? dl.value : "bank";
}

// ===================== LẤY DỮ LIỆU TỪ TRANG TRƯỚC =====================
function layDuLieu() {
    let nguoiLon = parseInt(localStorage.getItem("nguoiLon")) || 0;
    let treEm = parseInt(localStorage.getItem("treEm")) || 0;

    let inputNguoiLon = document.getElementById("nguoiLon");
    let inputTreEm = document.getElementById("treEm");
    let inputSoNguoi = document.getElementById("soNguoiDiCung");

    if (inputNguoiLon) inputNguoiLon.value = nguoiLon;
    if (inputTreEm) inputTreEm.value = treEm;
    if (inputSoNguoi) inputSoNguoi.value = nguoiLon + treEm;

    let formThongTin = document.getElementById("formThongTin");
    if (formThongTin) formThongTin.style.display = (nguoiLon + treEm) > 0 ? "block" : "none";
}

// ===================== KIỂM TRA NÚT THANH TOÁN =====================
function kiemTra() {
    let checkbox = document.getElementById("agree");
    let btn = document.getElementById("btnThanhToan");

    let ten = document.getElementById("nameForm").value.trim();
    let phone = document.getElementById("phoneForm").value.trim();
    let email = document.getElementById("emailForm").value.trim();

    let chkTen = /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/;
    let chkPhone = /^(0[0-9]{9}|(\+84)[0-9]{9})$/;
    let chkEmail = /@.*\.com$/;

    let daChonTyLe = document.querySelector('input[name="tyle"]:checked') !== null;
    let daChonPhuongThuc = document.querySelector('input[name="pttt"]:checked') !== null;

    if (
        checkbox &&
        checkbox.checked &&
        chkTen.test(ten) &&
        chkPhone.test(phone) &&
        chkEmail.test(email) &&
        daChonTyLe &&
        daChonPhuongThuc
    ) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

// ===================== XỬ LÝ NÚT THANH TOÁN =====================
document.addEventListener("DOMContentLoaded", function () {
    layDuLieu();

    let nameInput = document.getElementById("nameForm");
    let phoneInput = document.getElementById("phoneForm");
    let emailInput = document.getElementById("emailForm");
    let agreeCheck = document.getElementById("agree");
    let btnThanhToan = document.getElementById("btnThanhToan");

    if (nameInput) {
        nameInput.addEventListener("input", function () {
            ktrTen();
            kiemTra();
        });
        nameInput.addEventListener("blur", function () {
            ktrTen();
            kiemTra();
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            ktrPhone();
            kiemTra();
        });
        phoneInput.addEventListener("blur", function () {
            ktrPhone();
            kiemTra();
        });
    }

    if (emailInput) {
        emailInput.addEventListener("input", function () {
            ktrEmail();
            kiemTra();
        });
        emailInput.addEventListener("blur", function () {
            ktrEmail();
            kiemTra();
        });
    }
    if (agreeCheck) {
        agreeCheck.addEventListener("change", kiemTra);
    }

    let dsTyLe = document.querySelectorAll('input[name="tyle"]');
    dsTyLe.forEach(function (item) {
        item.addEventListener("change", kiemTra);
    });

    let dsPhuongThuc = document.querySelectorAll('input[name="pttt"]');
    dsPhuongThuc.forEach(function (item) {
        item.addEventListener("change", kiemTra);
    });

    if (btnThanhToan) {
        btnThanhToan.onclick = function () {
            let hoTen = document.getElementById("nameForm").value.trim();
            let soDienThoai = document.getElementById("phoneForm").value.trim();
            let email = document.getElementById("emailForm").value.trim();
            let ghiChu = document.querySelector("textarea")?.value || "";
            let soNguoiLon = parseInt(document.getElementById("nguoiLon")?.value) || 0;
            let soTreEm = parseInt(document.getElementById("treEm")?.value) || 0;

            let tyLe = layTyLeThanhToan();           // "100" hoặc "50"
            let phuongThuc = layPhuongThucThanhToan(); // "bank" hoặc "cash"
            // chua co thong tin cac tour
            //let tourInfo = JSON.parse(localStorage.getItem("selectedTour"));
            //     if (!tourInfo) {
            //         alert("Không có dữ liệu tour!");
            //         window.location.href = "home.html";
            // }
            //let thanhTien = (soNguoiLon * tourInfo.pricePerAdult) + (soTreEm * tourInfo.pricePerChild);
            //let tienCanThanhToan = tyLe === "100" ? thanhTien : thanhTien / 2;

            let thongTinDatTour = {
                hoTen: hoTen,
                soDienThoai: soDienThoai,
                email: email,
                ghiChu: ghiChu,
                soNguoiLon: soNguoiLon,
                soTreEm: soTreEm,
                //tour: tourInfo,
                tyLeThanhToan: tyLe,
                phuongThucThanhToan: phuongThuc,
                //thanhTien: thanhTien,
                //tienCanThanhToan: tienCanThanhToan
            };

            localStorage.setItem("thongTinDatTour", JSON.stringify(thongTinDatTour));

            if (phuongThuc === "cash") {
                //let prefix = tourInfo.prefix || "TOUR";
                //let randomNum = Math.floor(1000000 + Math.random() * 9000000);
                //let tourId = `${prefix}-${randomNum}`;

                let orders = JSON.parse(localStorage.getItem("orders")) || [];
                let newOrder = {
                    id: tourId,
                    hoTen: hoTen,
                    soDienThoai: soDienThoai,
                    email: email,
                    soNguoiLon: soNguoiLon,
                    soTreEm: soTreEm,
                    tongNguoi: soNguoiLon + soTreEm,
                    tongTien: thanhTien,
                    daThanhToan: 0,
                    status: "Chờ thanh toán tiền mặt tại văn phòng",
                    thoiGianDat: new Date().toLocaleString(),
                    phuongThuc: phuongThuc,
                    tyLe: tyLe,
                    ghiChu: ghiChu,
                    //soTienCanThanhToan: tienCanThanhToan
                };

                orders.push(newOrder);
                localStorage.setItem("orders", JSON.stringify(orders));
                alert(`✅ ĐẶT TOUR THÀNH CÔNG!\nMã đơn: ${tourId}\nVui lòng đến văn phòng thanh toán trong 24h để giữ chỗ.`);
                window.location.href = "home.html";
            } else {
                window.location.href = "../html/thanhtoan.html";
            }
        };
    }

    kiemTra();
});