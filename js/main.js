function removeAscent(str) {
    if(str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

function isValidName(str) {
    // var regex = /^[a-zA-Z\s]+$/g;
    var regex = /^[a-z]+[a-z\s]+[a-z]$/gim;
    return regex.test(removeAscent(str));
}

function isValidEmail(str) {
    var regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/igm;
    return regex.test(str);
}

function isValidPassword(str) {
    var regex = /^.{8,32}$/;
    return regex.test(str);
}

function checkName() {
    var name = document.getElementById("username").value;
    var nameError = document.getElementById("name-error");
    var btn = document.getElementById("submit");
    btn.disabled = true;
    if (!name) {
        nameError.textContent = "Vui lòng nhập tên";
        btn.disabled = false;
        return false;
    }
    if (!isValidName(name)) {
        nameError.textContent = "Tên không bao gồm số và kí tự đặc biệt";
        btn.disabled = false;
        return false;
    }
    nameError.textContent = "";
    btn.disabled = false;
    return true;

}

function checkEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("email-error");
    var btn = document.getElementById("submit");
    btn.disabled = true;

    if (email === "") {
        emailError.textContent = "Vui lòng nhập email";
        btn.disabled = false;
        return false;
    }
    else if (!isValidEmail(email)) {
        emailError.textContent = "Sai email. Vui lòng thử lại";
        btn.disabled = false;
        return false;
    }
    else {
        emailError.textContent = "";
        btn.disabled = false;
        return true;
    }
}

function checkPassword() {
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("password-error");
    var btn = document.getElementById("submit");
    btn.disabled = true;

    if (password ==="") {
        passwordError.textContent = "Vui lòng nhập password";
        btn.disabled = false;
        return false;
    }

    else if (!isValidPassword(password)) {
        passwordError.textContent = "Mật khẩu có độ dài từ 8 - 32 kí tự";
        btn.disabled = false;
        return false;
    } 

    else {
        passwordError.textContent = "";
        btn.disabled = false;
        return true;
    }
}

function checkConfirm () {
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm").value;
    var confirmError = document.getElementById("confirm-error");
    var btn = document.getElementById("submit");
    btn.disabled = true;

    if (!confirm) {
        confirmError.textContent = "Vui lòng xác nhận mật khẩu";
        btn.disabled = false;
        return false;
    }
    else if (confirm !== password) {
        confirmError.textContent = "Mật khẩu không khớp. Nhập lại";
        btn.disabled = false;
        return false;
    }
    else {
        confirmError.textContent = "";
        btn.disabled = false;
        return true;
    }
}

function validateForm() {
    var btn = document.getElementById("submit");

    btn.disabled = !(checkName() && checkEmail() && checkPassword() && checkConfirm())
}
const throttle = (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

document.getElementById("username").addEventListener("keyup" , throttle(checkName , 200));
document.getElementById("password").addEventListener("keyup" , throttle(checkPassword , 200));
document.getElementById("email").addEventListener("keyup" , throttle(checkEmail , 200));
document.getElementById("confirm").addEventListener("keyup" , throttle(checkConfirm , 200));

//cach khac: dat onblur trong input va return function
