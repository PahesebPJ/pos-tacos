'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/accountingPage.module.css';
import TableData from '@/app/components/TableData';

// const tableHeads = ['Tilin', 'Mesa', 'Descuento', 'Fecha', 'Total'];

const dataTable = [
    {
        orden: 1,
        mesa: 1,
        descuento: 0,
        fecha: '17/Ene/2025 7:00pm',
        total: 100,
    },
    {
        orden: 2,
        mesa: 1,
        descuento: 0,
        fecha: '17/Ene/2025 7:00pm',
        total: 125,
    },
    {
        orden: 3,
        mesa: 2,
        descuento: 0,
        fecha: '17/Ene/2025 7:00pm',
        total: 95,
    },
];

const Accounting = () => {
    /* ToDo: hacer funcionar el total */
    const [total, setTotal] = useState(0);
    const [data, setData] = useState(dataTable);

    return (
        <div className={styles.container}>
            {data.length > 0 ? (
                <>
                    <TableData data={data} />

                    <div className={styles.container_input}>
                        <h2>Total:</h2>
                        <input
                            type="text"
                            disabled={true}
                            value={`$${total}`}
                        />
                    </div>
                </>
            ) : (
                <h1>Haga corte de caja</h1>
            )}
        </div>
    );
};

export default Accounting;
