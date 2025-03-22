import styles from '@/app/styles/TableProduct.module.css';

/* Añade los atributos que faltan a la interfaz */
interface Props {
    personNumber: string;
}

const TableProduct = ({ personNumber }: Props) => {
    return (
        <table className={styles.container_table}>
            <thead>
                <tr>
                    <th>{personNumber}</th>
                </tr>
            </thead>

            {/* tr = filas, td = columnas, añade aqui los datos, agregar con el width: 25% */}
            <tbody>
                {/* <tr>
                    <td style={{ width: '25%' }}>#1</td>
                    <td style={{ width: '25%' }}>Taco</td>
                    <td style={{ width: '25%' }}>2</td>
                    <td style={{ width: '25%' }}>$60</td>
                </tr> */}
            </tbody>

            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={styles.subtotal}>
                        Subtotal: <span>$0</span>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default TableProduct;
