const valid = (name: string, email: string, password: string, cf_password: string) => {
    if(!name || !email || !password)
    return "Please fill in all fields."

    if(!validateEmail(email)){
        return "Invalid email."
    }

    if(password.length < 6){
        return "Password must be at least 6 characters."
    }

    if(password !== cf_password){
        return "Confirm password did not match."
    }
}

const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validatePhoneNumber = (phoneNumber: string) => {
    if(phoneNumber.length === 8){
        return true;
    }
    return false;
}

const validateAddress = (address: string) => {
    if(address.length < 7){
        return false;
    }
    return true;
}

const validateURL = (websiteURL: string) => {
    const re = /^(ftp|http|https):\/\/[^ "]+$/;
    return re.test(websiteURL);
}

export default valid;

export {
    validateEmail, 
    validatePhoneNumber, 
    validateAddress, 
    validateURL
};