// function to check valid password
export const isValidPassword = (pass: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{12,}$/;
    if (regex.test(String(pass))) {
        return true;
    }
    return false;
};
