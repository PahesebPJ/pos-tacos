/* eslint-disable @typescript-eslint/no-explicit-any */
export interface propsProduct {
    id?: number;
    name?: string;
    description?: string;
    type?: string;
    price?: number;
    url?: string;
    onDelete?: (id: number) => void;
    onUpdate?: (...args: any[]) => any;
}
