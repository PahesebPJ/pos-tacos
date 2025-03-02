export async function getApiCall(url: string, method: object = {method: "GET"}) {
    try{
        const response = await fetch(url, method);
        return response.json()
    }catch(error){
        console.log(error);
    }
}

//Change API url when is necessary
export const apiURL = process.env.NEXT_PUBLIC_URL_API