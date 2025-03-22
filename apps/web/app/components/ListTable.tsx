'use client';

// import { contextCounterPerson } from '@/app/context/PersonProvider';
// import React, { useContext } from 'react';
// import TableProduct from './TableProduct';
import styles from '@/app/styles/ListTable.module.css';

/* Context te devuelve el estado y la funcion para setearlo
Ejmplo en el componente PersonList.tsx */

const ListTable = () => {
    return (
        <div className={styles.list_tables}>
            <table className={styles.container_table}>
                <thead className={styles.tonality}>
                    <tr>
                        <th style={{ width: '25%' }}>ID</th>
                        <th style={{ width: '25%' }}>PRODUCTO</th>
                        <th style={{ width: '25%' }}>CANTIDAD</th>
                        <th style={{ width: '25%' }}>SUBTOTAL</th>
                    </tr>
                </thead>
            </table>

            {/* <TableProduct key={tuKey} person={`Persona ${variable}`} /> */}
        </div>
    );
};

export default ListTable;
