import { propsInputTypes } from "../props/propsInputTypes";

export function getCookie(name: string): string {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(`${name}`));
    return cookie ? decodeURIComponent(cookie.split('=')[1] || '') : '';
}

export function generateObjectConfigForInputs(
    items: string[], 
    translated_items: string[] = items, 
    inputs_type: (string | propsInputTypes)[] = new Array(items.length).fill("text")
) {
    const inputs = items.map((name, index) => ({
        id: name,
        name: name,
        placeholder: "Ingresa el " + translated_items[index],
        type: inputs_type[index],
    }));

    return inputs;
}