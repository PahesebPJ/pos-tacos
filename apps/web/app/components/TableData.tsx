import styles from '@/app/styles/tableData.module.css';

interface props {
    titles?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
}

let titlesHeader = [];

const TableData = ({ titles, data }: props) => {
    titlesHeader = titles ? titles : Object.keys(data[0]);

    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {titlesHeader.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.keys(row).map((value, i) => (
                                <td key={i}>{row[value]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableData;
