'use client';

import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Table from '../components/Table';
import TableStatic from '../components/TableStatic';
import { useModal } from '../hooks/useModal';
import useTables from '../hooks/useTables';
import styles from './page.module.css';

export default function Home() {
    const { tables, loading, updateTable, createTable } = useTables();
    const { modal, closeModal, openModal } = useModal();

    return (
        <section className={styles.main}>
            <h1 className={styles.main__title}>Visualizador de mesas</h1>

            <section className={styles.tables_grid}>
                <TableStatic createTable={createTable} />

                {!loading &&
                    tables.map(({ id, name, status }) => (
                        <Table
                            key={id}
                            id={id}
                            name={name}
                            href={`/table/${id}`}
                            status={status}
                            updateTable={updateTable}
                        />
                    ))}
            </section>

            <Button onClick={openModal} isFloat={true} className={styles.hover}>
                Corte
            </Button>

            <Modal open={modal}>
                <Card
                    isActiveModal={modal}
                    title="¿Seguro/a que quieres hacer corte?"
                    close={closeModal}
                >
                    <div className={styles.container_buttons}>
                        <Button className={`${styles.button} ${styles.hover}`}>
                            Si
                        </Button>
                        <Button
                            onClick={closeModal}
                            className={`${styles.no_background} ${styles.hover}`}
                        >
                            No
                        </Button>
                    </div>
                </Card>
            </Modal>
        </section>
    );
}
