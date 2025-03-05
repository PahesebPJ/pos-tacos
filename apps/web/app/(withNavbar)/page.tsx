'use client';

import Table from '../components/Table';
import useTables from '../hooks/useTables';
import styles from './page.module.css';

export default function Home() {
    const { tables } = useTables();

    return (
        <section className={styles.main}>
            <h1 className={styles.main__title}>Visualizador de mesas</h1>

            <section className={styles.tables_grid}>
                <Table isStatic={true} />
                {tables.map(({ id, name, status }) => (
                    <Table
                        key={id}
                        name={name}
                        href={`/table/${id}`}
                        status={status}
                    />
                ))}
            </section>
        </section>
    );
}
