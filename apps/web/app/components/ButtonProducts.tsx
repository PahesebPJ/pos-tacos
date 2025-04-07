import React from 'react';
import styles from '@/app/styles/ButtonProdcuts.module.css';
import Image from 'next/image';
import { IoAddSharp } from 'react-icons/io5';

type Props = {
    id: number;
    name: string | undefined;
    price: number | undefined;
    type: string | undefined;
    url: string | undefined;
    addToOrder: (productId: number, personId: number) => void;
    selectedPersonId: number;
};

const ButtonProducts = ({ id, name, url, price, type, addToOrder, selectedPersonId }: Props) => {
    return (
        <div className={styles.card_button} onClick={() => addToOrder(id, selectedPersonId)}>
            <div className={styles.container_image}>
                <Image
                    src={`${url}`}
                    className={styles.image}
                    alt="Imagen del producto"
                    width={500}
                    height={500}
                />
            </div>
            <div className={styles.info}>
                <h3>
                    {name} -<span> ${price}</span>
                </h3>

                <span className={styles.orange}>{type}</span>
            </div>

            <div className={styles.container_icon}>
                <IoAddSharp className={styles.icon} />
            </div>
        </div>
    );
};

export default ButtonProducts;
