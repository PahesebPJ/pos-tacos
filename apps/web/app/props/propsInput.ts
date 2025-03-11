export interface InputConfig {
    id: string,
    name: string,
    placeholder: string,
    type?: string | { type: "select"; options: string[] },
}