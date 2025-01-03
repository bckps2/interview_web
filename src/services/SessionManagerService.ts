import { LoginModel } from "@/models/LoginModel";

const apiUrlBase = `${process.env.NEXT_PUBLIC_API_URL_SESSIONMANAGER}`;

export async function Login(loginModel: LoginModel ): Promise<boolean>{
    const url = `${apiUrlBase}api/Login/login`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginModel),
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error('Error: ' + response.status);
    };

    return response.ok;
}

export async function LogOut() {
    const url = `${apiUrlBase}api/Login/logout`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error('Error: ' + response.status);
    };
}
