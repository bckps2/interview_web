import { UserProfileModel } from "@/models/UserProfileModel";

const apiUrlBase = `${process.env.NEXT_PUBLIC_API_URL_ACCOUNTMANAGER}`;

export async function GetAccount(): Promise<UserProfileModel>{
    const url = `${apiUrlBase}api/Account`;
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        
        if(!response.ok){
            throw new Error('Error: ' + response.status);
        }

        const data: UserProfileModel = await response.json();
        
        return data;
    }catch(error){
        console.error("Hubo un error al obtener la cuenta:", error);
        throw error;
    }
}