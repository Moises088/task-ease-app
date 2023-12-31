export const isValidEmail = (email?: string) => {
    if (!email) return false;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

export const isValidPass = (pass?: string) => {
    if (!pass) return false;
    return pass.length >= 6;
}