'use client';

import React, { useState, createContext } from 'react';

interface CounterPersonContextType {
    counterPerson: number[];
    setCounterPerson: React.Dispatch<React.SetStateAction<number[]>>;
}

export const contextCounterPerson = createContext<
    CounterPersonContextType | undefined
>(undefined);

export function CounterPersonProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [counterPerson, setCounterPerson] = useState<number[]>([]);

    return (
        <contextCounterPerson.Provider
            value={{ counterPerson, setCounterPerson }}
        >
            {children}
        </contextCounterPerson.Provider>
    );
}
