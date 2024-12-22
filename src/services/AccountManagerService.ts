import { UserProfileModel } from "@/models/UserProfileModel";

const urlBase = 'https://dev-appinterview.com/accountmanager/'

export async function GetAccount(): Promise<UserProfileModel>{
    const url = `${urlBase}api/Account`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error(`${response.status}`);
    };

    const data: UserProfileModel = await response.json();
    
    return data;
}