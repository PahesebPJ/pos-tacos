import tableStyle from '../styles/table.module.css';
import { BiAddToQueue, BiBlock, BiCheck, BiPaperPlane } from 'react-icons/bi';
import Link from 'next/link';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import Card from './Card';
import useTables from '../hooks/useTables';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

interface propsDynamic {
    id?: number;
    name?: string;
    href?: string;
    status?: number;
}

interface propTable extends propsDynamic {
    isStatic?: boolean;
}

const Table = ({ id, isStatic = false, name, status, href }: propTable) => {
    {
        if (isStatic) {
            return <TableStatic />;
        }
    }

    return <TableDynamic id={id} status={status} name={name} href={href} />;
};

const TableStatic = () => {
    const { modal, openModal, closeModal } = useModal();

    const handleCloseModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeModal();
    };

    return (
        <div
            onClick={openModal}
            className={`${tableStyle.card_container} ${tableStyle.card_static}`}
        >
            <h2 className={tableStyle.card_title_static}>Añade una mesa</h2>
            <BiAddToQueue className={tableStyle.card_icon__large} />

            <Modal open={modal}>
                <Card
                    close={handleCloseModal}
                    title="Agregar mesa"
                    isActiveModal={modal}
                >
                    <input type="text" placeholder="Escribe algo.." />
                </Card>
            </Modal>
        </div>
    );
};

const TableDynamic = ({ id, name, href, status }: propsDynamic) => {
    const { modal, openModal, closeModal } = useModal();
    const [tableName, setTableName] = useState('');
    const { updateTable } = useTables();
    const inputTable = useRef<HTMLInputElement | null>(null);

    let hrefStringOnly = '/error';

    const changeStatusMessage = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    const changeTableName = (e: React.MouseEvent) => {
        e.preventDefault();
        if (inputTable.current) {
            inputTable.current.focus();
        }
        openModal();
    };

    const closeModalTitle = (e: React.MouseEvent) => {
        e.preventDefault();

        closeModal();
        setTableName('');
    };

    const handlerForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateTable(id as number, {
            name: tableName,
            status: status as number,
        });

        closeModal();
        setTableName('');
    };

    const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTableName(e.target.value);
    };

    if (typeof href === 'string') {
        hrefStringOnly = href;
    }

    return (
        <>
            <Link
                href={hrefStringOnly}
                className={`${tableStyle.card_container} ${tableStyle.card_dynamic}`}
            >
                <h2
                    className={`${tableStyle.card_title} ${tableStyle.color_orange}`}
                    onClick={changeTableName}
                >
                    {name}
                </h2>

                {status === 0 ? (
                    <span
                        className={`${tableStyle.status_message} ${tableStyle.color_green}`}
                        onClick={changeStatusMessage}
                    >
                        Mesa desocupada
                        <div>
                            <BiCheck
                                className={`${tableStyle.card_icon__medium} ${tableStyle.color_green}`}
                            />
                        </div>
                    </span>
                ) : (
                    <span
                        className={`${tableStyle.status_message} ${tableStyle.color_gray}`}
                        onClick={changeStatusMessage}
                    >
                        Mesa ocupada
                        <div>
                            <BiBlock
                                className={`${tableStyle.card_icon__medium} ${tableStyle.color_gray}`}
                            />
                        </div>
                    </span>
                )}
            </Link>

            <Modal open={modal}>
                <Card
                    close={closeModalTitle}
                    isActiveModal={modal}
                    title="Cambiar nombre"
                >
                    <form className={tableStyle.form} onSubmit={handlerForm}>
                        <input
                            ref={inputTable}
                            type="text"
                            name="table-name"
                            placeholder={name}
                            value={tableName}
                            onChange={handlerChange}
                            className={tableStyle.input}
                        />
                        <button className={tableStyle.btn_form}>
                            <BiPaperPlane />
                        </button>
                    </form>
                </Card>
            </Modal>
        </>
    );
};

export default Table;
