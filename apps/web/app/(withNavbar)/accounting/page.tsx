'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/accountingPage.module.css';
import TableData from '@/app/components/TableData';
import { apiURL, getApiCall } from '@/app/service/api_calls';

// const tableHeads = ['Tilin', 'Mesa', 'Descuento', 'Fecha', 'Total'];

const dateFormated = (date: string) => {
    const months = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
    ];

    const separatedDate = date.split(' ');
    const monthsDaysYears = separatedDate[0]?.split('/');
    const hoursMinutesSeconds = separatedDate[1]?.split('/');
    const amPm = separatedDate[2]?.split('/');

    if (monthsDaysYears) {
        const dateEdit = `${monthsDaysYears[0]} de ${months[Number(monthsDaysYears[1])]} de ${monthsDaysYears[2]} ${hoursMinutesSeconds} ${amPm}`;
        return dateEdit;
    }
};

const formatedData = (datas: any[]) => {
    const newDataFormated = [
        {
            idOrden: 0,
            producto: '',
            fecha: '',
            descuento: 0,
            total: 0,
        },
    ];

    return datas.map((data) => {
        const dateEdit = dateFormated(data.o_date);
        return {
            ...newDataFormated[0],
            idOrden: data.id_order,
            producto: data.p_name,
            descuento: data.op_discount,
            fecha: dateEdit,
            total: data.o_total,
        };
    });
};

const Accounting = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let total = 0;

    useEffect(() => {
        const setApiTables = async () => {
            setLoading(true);

            try {
                const dataTable = await getApiCall(
                    `${apiURL}orders-products/filter`,
                    { method: 'POST' }
                );

                setData(dataTable);
            } catch (error) {
                console.error('Error al obtener datos iniciales:', error);
            } finally {
                setLoading(false);
            }
        };

        setApiTables();
    }, []);

    const dataFormated = formatedData(data);

    if (dataFormated) {
        dataFormated?.map((dataTotal) => {
            return (total += dataTotal.total);
        });
    }

    return (
        <div className={styles.container}>
            {data.length > 0 ? (
                <>
                    <TableData data={dataFormated} />

                    <div className={styles.container_input}>
                        <h2>Total:</h2>
                        <input
                            type="text"
                            disabled={true}
                            value={`$${total.toLocaleString('es-US')}`}
                        />
                    </div>
                </>
            ) : (
                <h1>Aún no hay ordenes para mostrar</h1>
            )}
        </div>
    );
};

export default Accounting;
