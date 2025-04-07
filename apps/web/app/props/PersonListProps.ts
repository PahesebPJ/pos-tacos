import Order from "./OrderProps";

export interface PersonListProps {
    orders: Order[];
    selectedPersonId: number;
    onSelectPerson: (personId: number) => void;
    onAddPerson: () => void;
}