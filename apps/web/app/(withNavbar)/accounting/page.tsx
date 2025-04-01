import styles from '@/app/styles/accountingPage.module.css';
import TableData from '@/app/components/TableData';
import { apiURL, getApiCall } from '@/app/service/api_calls';

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
        const dateEdit = `${monthsDaysYears[0]} de ${months[Number(monthsDaysYears[1]) - 1]} de ${monthsDaysYears[2]} ${hoursMinutesSeconds} ${amPm}`;
        return dateEdit;
    }
};

const formatedData = (datas: any[]) => {
    const newDataFormated = [
        {
            id: 0,
            idOrden: 0,
            mesa: '',
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
            id: data.op_id,
            idOrden: data.id_order,
            mesa: data.table,
            producto: data.p_name,
            descuento: data.op_discount,
            fecha: dateEdit,
            total: data.o_total,
        };
    });
};

const fetchData = async () => {
    const dataTable = await getApiCall(`${apiURL}orders-products/filter`, {
        method: 'POST',
    });

    return dataTable;
};

const Accounting = async () => {
    let total = 0;

    const data = await fetchData();

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
