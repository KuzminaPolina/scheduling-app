const GET_TOKEN_URL = `/api_admin/authorization`;

type FormFields = {
    username: string;
    mail: string;
    password: string;
};

export const sendLoginDataToServer = async (data:FormFields) => {
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);
    const response = await fetch(GET_TOKEN_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    });
    return response;
}