import tableStyle from '../styles/table.module.css';
import { BiAddToQueue, BiBlock, BiCheck } from 'react-icons/bi';
import Link from 'next/link';
import Modal from './Modal';
import { useState } from 'react';

interface propsDynamic {
    name?: string;
    href?: string;
    status?: number;
}

interface propsStatic {
    onClick?: () => void;
    openModal?: boolean;
}

interface propTable extends propsDynamic {
    isStatic?: boolean;
}

const Table = ({ isStatic = false, name, status, href }: propTable) => {
    const [modal, setModal] = useState(false);

    {
        if (isStatic) {
            return (
                <TableStatic
                    onClick={() => {
                        setModal(!modal);
                    }}
                    openModal={modal}
                />
            );
        }
    }

    return <TableDynamic status={status} name={name} href={href} />;
};

const TableStatic = ({ onClick, openModal }: propsStatic) => {
    return (
        <div
            onClick={onClick}
            className={`${tableStyle.card_container} ${tableStyle.card_static}`}
        >
            <h2 className={tableStyle.card_title}>Añade una mesa</h2>
            <BiAddToQueue className={tableStyle.card_icon__large} />

            <Modal open={openModal}>hola</Modal>
        </div>
    );
};

const TableDynamic = ({ name, href, status }: propsDynamic) => {
    let hrefStringOnly = '/error';

    if (typeof href === 'string') {
        hrefStringOnly = href;
    }

    return (
        <Link
            href={hrefStringOnly}
            className={`${tableStyle.card_container} ${tableStyle.card_dynamic}`}
        >
            <h2
                className={`${tableStyle.card_title} ${tableStyle.color_orange}`}
            >
                {name}
            </h2>

            {/* Checo si la mesa esta ocupada para renderizar frase, icono y clases */}
            {status === 0 ? (
                <span
                    className={`${tableStyle.status_message} ${tableStyle.color_green}`}
                >
                    Mesa desocupada
                    <BiCheck
                        className={`${tableStyle.card_icon__medium} ${tableStyle.color_green}`}
                    />
                </span>
            ) : (
                <span
                    className={`${tableStyle.status_message} ${tableStyle.color_gray}`}
                >
                    Mesa ocupada
                    <BiBlock
                        className={`${tableStyle.card_icon__medium} ${tableStyle.color_gray}`}
                    />
                </span>
            )}
            {/* ToDo: Hacer el boton eliminar y editar de las mesas */}
            {/* <button></button>
            <button></button> */}
        </Link>
    );
};

export default Table;
