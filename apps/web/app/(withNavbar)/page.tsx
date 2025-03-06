'use client';

import { useEffect } from 'react';
import Table from '../components/Table';
import useTables from '../hooks/useTables';
import styles from './page.module.css';

export default function Home() {
    const { tables, loading } = useTables();

    useEffect(() => {
        console.log('Estado tables en Home:', tables);
    }, [tables]);

    return (
        <section className={styles.main}>
            <h1 className={styles.main__title}>Visualizador de mesas</h1>

            <section className={styles.tables_grid}>
                <Table isStatic={true} />

                {!loading &&
                    tables.map(({ id, name, status }) => (
                        <Table
                            key={id}
                            id={id}
                            name={name}
                            href={`/table/${id}`}
                            status={status}
                        />
                    ))}
            </section>
        </section>
    );
}
