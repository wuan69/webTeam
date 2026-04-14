  //home
function ktrTen(){
      let name= document.getElementById("name").value;
      let chkName = /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/u;
      let er= document.getElementById("er1");
      if(chkName.test(name)){
        er.innerHTML="Valid";
        er.style.color="green";
        return true;
      }else{
        er.innerHTML="Unvalid";
        er.style.color="red";
        return false;
      }
    }
    function chkPhone(){
      let phone= document.getElementById("phone").value;
      let chkPhone= /^0[2-9]\d-\d{7}$/;
      let er= document.getElementById("er2");
      if(chkPhone.test(phone)){
        er.innerHTML="Valid";
        er.style.color="green";
        return true;
      }else{
        er.innerHTML="Unvalid";
        er.style.color="red";
        return false;
      }
    }
    // gửi vào owner
    function yeuCau() {
      if(!ktrTen() || !chkPhone()){
        alert("Vui lòng sửa lỗi trước khi gửi yêu cầu!");
        return;
      }
      let donMoi = {
          dd: document.getElementById("diaDiem").value,
          name: document.getElementById("name").value,
          phone: document.getElementById("phone").value,
          num: document.getElementById("SoLuongKhach").value,
          date: document.getElementById("date").value,
          note: document.getElementById("note").value
      };
      let danhSach = JSON.parse(localStorage.getItem("dsDonHang") || "[]");
      danhSach.push(donMoi);
      localStorage.setItem("dsDonHang", JSON.stringify(danhSach));
      
      alert("Đã gửi yêu cầu!");
  }
  //load dữ liệu 
  // function load(){
  //     let ktr =localStorage.getItem("isOwner");
  //     if(ktr==="true"){
  //       let danhSach = JSON.parse(localStorage.getItem("dsDonHang") || "[]");
  //       let tb = document.getElementById("tb2");
  //       for (let i = 0; i < danhSach.length; i++) {
  //           let item = danhSach[i]; 
  //           let row = tb.insertRow(-1);
  //           row.insertCell(0).innerHTML = i + 1;   
  //           row.insertCell(1).innerHTML = item.name;    
  //           row.insertCell(2).innerHTML = item.dd;       
  //           row.insertCell(3).innerHTML = item.phone;   
  //           row.insertCell(4).innerHTML = item.num;     
  //           row.insertCell(5).innerHTML = item.date;    
  //           row.insertCell(6).innerHTML = item.note;    
  //       }
  //     }else{
  //       window.location.href="./canhbao.html";  
  //       // logout();
  //     }
  //   }
    // theo thg nhàng
  function load() {
    let danhSach = JSON.parse(localStorage.getItem("dsDonHang") || "[]");
    let tb = document.getElementById("tb2");
    
    for (let i = 0; i < danhSach.length; i++) {
        let item = danhSach[i]; 
        let row = tb.insertRow(-1);
        row.insertCell(0).innerHTML = i + 1;   
        row.insertCell(1).innerHTML = item.name;    
        row.insertCell(2).innerHTML = item.dd;       
        row.insertCell(3).innerHTML = item.phone;   
        row.insertCell(4).innerHTML = item.num;     
        row.insertCell(5).innerHTML = item.date;    
        row.insertCell(6).innerHTML = item.note;    
    }
}
    // sắp xếp tour theo từng group
    function sortTours(order) {
      const containers = document.querySelectorAll('.tour-group');
      containers.forEach(container => {
        const tours = Array.from(container.querySelectorAll('article'));
        tours.sort((a, b) => {
          const priceA = parseInt(a.getAttribute('data-price'));
          const priceB = parseInt(b.getAttribute('data-price'));
          if (order === 'asc') {
            return priceA - priceB; 
          } else {
            return priceB - priceA;
          }
        });
        container.innerHTML = '';
        tours.forEach(tour => {
          container.appendChild(tour);
        });
    });
    }
      // owner
    function logout(){
      localStorage.removeItem("isOwner");
      window.location.href = "./signIn.html";
    }
    function xoaHet() {
      let c=confirm("CẢNH BÁO: Bạn sẽ xóa sạch toàn bộ danh sách yêu cầu!");
      if (c) {
          localStorage.removeItem("dsDonHang");
          window.location.reload();
      }
  }
      
    // sign in
    function login(e){
      e.preventDefault();
      let user = document.getElementById("loginName").value;
      let pass = document.getElementById("loginPass").value;
      if(user === "admin" && pass === "123"){
        localStorage.setItem("isOwner", "true");
        window.location.href = "owner.html";
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    }