import axios from 'axios';

export const login = async (userData) => {
    const loginUserState = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/login`, userData);
    return loginUserState;
};

export const adminLogin = async (userData) => {
    const loginAdminState = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/adminLogin`, userData);
    return loginAdminState;
};


export const register = async (userData) => {
    const RegisterUserState = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/register`, userData);
    return RegisterUserState;
};

export const businessDetailsRegister = async (userData) => {
    let formData = new FormData();

    const user = JSON.parse(localStorage.getItem('id'));
    formData.append('businessAddress',userData.businessAddress);
    formData.append('businessCity',userData.businessCity);
    formData.append('businessCountry',userData.businessCountry);
    formData.append('businessIndustry',userData.businessIndustry);
    formData.append('businessLogo',userData.businessLogo);
    formData.append('businessName',userData.businessName);
    formData.append('businessOpeningHours',JSON.stringify(userData.businessOpeningHours));
    formData.append('businessPostCode',userData.businessPostCode);
    formData.append('businessSalesNumber',userData.businessSalesNumber);
    formData.append('userId',user.id);

    const businessDetailsRegister = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/business`,formData);
    return businessDetailsRegister;
}

export const leadsDetailsRegister = async (userData) => {
    const leadsDetails = await axios.post(`${process.env.REACT_APP_API_KEY}/userLeadsDetails`, userData);
    return leadsDetails;
}

export const forgetPassword = async (userData) => {
    const forgetPasswordState = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/forgetPassword`, userData);
    return forgetPasswordState;
}

export const resetPassword = async (userData) => {

    const token = localStorage.getItem("token")

    const resetPasswordState = await axios.post(
        `${process.env.REACT_APP_API_KEY}/profile/change-password`,
        userData,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return resetPasswordState;
};

export const auth = async (userData) => {

    const token = localStorage.getItem("token")

    const authState = await axios.get(
        `${process.env.REACT_APP_API_KEY}/auth`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return authState;
};
