export const validateEmail = (input) => {
    // Email regex pattern
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(input);
};

export const validatePassword = (input) => {
    // Password regex pattern
    const passwordPattern = /^[A-Za-z0-9 _@!-]+$/;
    return passwordPattern.test(input);
};

export const validatePhoneNumber = (input) => {
    // Phone number regex pattern for Bangladesh
    const phoneNumberPattern = /^01[3-9]\d{8}$/;
    return phoneNumberPattern.test(input);
};