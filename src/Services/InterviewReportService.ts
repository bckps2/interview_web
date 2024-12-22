
const urlBase = 'https://https://dev-appinterview.com/sessionmanager/'

export async function Login(): Promise<boolean>{
    const url = `${urlBase}api/Login/login`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error('Error: ' + response.status);
    };

    return response.ok;
}

export async function LogOut() {
    const url = `${urlBase}api/Login/logout`;

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
