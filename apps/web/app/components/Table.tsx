import tableStyle from '../styles/table.module.css';
import {
    BiBlock,
    BiCheck,
    BiCheckCircle,
    BiErrorCircle,
    BiPaperPlane,
} from 'react-icons/bi';
import Link from 'next/link';
import { useModal } from '../hooks/useModal';
import Modal from './Modal';
import Card from './Card';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { inputTableValidation } from '@/app/lib/validations';
import { usePopUp } from '../hooks/usePopUp';
import PopUp from './PopUp';

interface propsDynamic {
    id?: number;
    name?: string;
    href?: string;
    status?: number;
    updateTable?: (id: number, updateTable: tableInterface) => Promise<void>;
}

interface tableInterface {
    id?: number;
    name: string;
    status: number;
}

const Table = ({ id, name, href, status, updateTable }: propsDynamic) => {
    const { modal, openModal, closeModal } = useModal();
    const [tableName, setTableName] = useState('');
    const inputTable = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { popup, openPopUp } = usePopUp(2500);

    let hrefStringOnly = '/error';

    const changeStatusMessage = async (e: React.MouseEvent) => {
        e.preventDefault();

        const newStatus = status === 0 ? 1 : 0;

        const tableUpdated = {
            name: name as string,
            status: newStatus as number,
        };

        if (updateTable) {
            try {
                await updateTable(id as number, tableUpdated);
            } catch (error) {
                console.error('Error updating table:', error);
            }
        } else {
            console.warn(
                'updateTable function is not defined. Skipping update.'
            );
        }
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

    const handlerForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            inputTableValidation.parse(tableName);
            setError(null);
        } catch (err: any) {
            setError(err.errors[0].message);
            openPopUp('error');
            return;
        }

        const tableUpdated = {
            name: tableName,
            status: status as number,
        };

        if (updateTable) {
            try {
                await updateTable(id as number, tableUpdated);
                openPopUp('success');
            } catch (error) {
                console.error('Error updating table:', error);
            }
        } else {
            console.warn(
                'updateTable function is not defined. Skipping update.'
            );
        }

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

            <PopUp
                text={`${error}`}
                popupId={popup}
                type="error"
                backGround="#e03b3b"
                textColor="#fff"
                icon={<BiErrorCircle />}
                colorIcon="#fff"
            />

            <PopUp
                text={`Nombre editado`}
                popupId={popup}
                type="success"
                backGround="#19a051"
                textColor="#fff"
                icon={<BiCheckCircle />}
                colorIcon="#fff"
            />
        </>
    );
};

export default Table;
