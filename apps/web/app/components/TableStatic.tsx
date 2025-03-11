import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { inputTableValidation } from '@/app/lib/validations';
import { useModal } from '../hooks/useModal';
import tableStyle from '../styles/table.module.css';
import {
    BiAddToQueue,
    BiCheckCircle,
    BiErrorCircle,
    BiPaperPlane,
} from 'react-icons/bi';
import Modal from './Modal';
import Card from './Card';
import PopUp from './PopUp';
import { usePopUp } from '../hooks/usePopUp';

interface propTableStatic {
    createTable?: (newTable: { name: string; status: number }) => Promise<void>;
}

const TableStatic = ({ createTable }: propTableStatic) => {
    const { modal, openModal, closeModal } = useModal();
    const { popup, openPopUp } = usePopUp(2500);
    const [tableName, setTableName] = useState('');
    const inputTable = useRef<HTMLInputElement | null>(null);

    const closeModalTitle = (e: React.MouseEvent) => {
        e.stopPropagation();

        closeModal();
        setTableName('');
    };

    const openModalTitle = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (inputTable.current) {
            inputTable.current.focus();
        }

        openModal();
    };

    const handlerForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            inputTableValidation.parse(tableName);
        } catch (err: any) {
            openPopUp({
                text: 'Nombre demasiado corto',
                visible: true,
                backGround: '#e03b3b',
                textColor: '#fff',
                icon: <BiErrorCircle />,
                colorIcon: '#fff',
            });
            return;
        }

        const newTable = {
            name: tableName,
            status: 0,
        };

        if (createTable) {
            try {
                await createTable(newTable);

                openPopUp({
                    text: `Nombre editado`,
                    visible: true,
                    backGround: '#19a051',
                    textColor: '#fff',
                    icon: <BiCheckCircle />,
                    colorIcon: '#fff',
                });
            } catch (error) {
                console.error('Error creating table:', error);
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

    return (
        <div
            onClick={openModalTitle}
            className={`${tableStyle.card_container} ${tableStyle.card_static}`}
        >
            <h2 className={tableStyle.card_title_static}>Añade una mesa</h2>
            <BiAddToQueue className={tableStyle.card_icon__large} />
            <Modal open={modal}>
                <Card
                    close={closeModalTitle}
                    isActiveModal={modal}
                    title="Crear mesa"
                >
                    <form className={tableStyle.form} onSubmit={handlerForm}>
                        <input
                            ref={inputTable}
                            type="text"
                            placeholder="Nombre de la mesa"
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
                text={popup?.text as string}
                visible={popup?.visible as boolean}
                backGround={popup?.backGround}
                textColor={popup?.textColor}
                icon={popup?.icon}
                colorIcon={popup?.colorIcon}
            />
        </div>
    );
};

export default TableStatic;
