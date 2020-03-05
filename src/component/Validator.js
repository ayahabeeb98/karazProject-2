import Cookies from "universal-cookie";

export const Validator = (inputName , inputValue , pattern , errors , errorMsg) => {
    let isValid = true;
    let elm = document.getElementById(inputName);

    if(inputName === "name" && inputValue.length < 3) {
        isValid = false;
    }

    if (!inputValue.match(pattern)){
        isValid = false;
        errors[inputName] = errorMsg;
    }else {
        errors[inputName] = '';
    }

    if(elm && (isValid === false)) {
        elm.classList.add("error");
    }

    // if (elm && isValid) {
    //     elm.classList.add("success")
    // }

    return isValid;
};


export const ValidatePassword = (condition,domElem , passwordField) => {
    if (condition && domElem && passwordField.length >= 1) { //if it's not correct then add failed class
        domElem.classList.add("failed");
        return false;
    }else if (domElem && passwordField.length >= 1){
        domElem.classList.remove("failed");
        domElem.classList.add("success");
        return true;
    }
};


export const checkAuthorizedUser = (props,url) => {
    const  cookie = new Cookies();
    const token = cookie.get("token");
    return token ? (props.history.push("/profile")) : (props.history.push(url))
};


export const encodeEmail = (email) => {
  let lastDot = email.lastIndexOf('.');
  let sliceEmail = email.slice(2,lastDot + 2).replace(/./g,"*");
  let firstPart = email.slice(0,2);
  let lastPart = email.slice(lastDot+2);

  return firstPart + sliceEmail + lastPart

};