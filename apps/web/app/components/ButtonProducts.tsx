import React from 'react';
import styles from '@/app/styles/ButtonProdcuts.module.css';
import Image from 'next/image';
import { IoAddSharp } from 'react-icons/io5';

type Props = {
    id?: number;
    name: string;
    price: number;
    type: string;
    url: string;
};

const ButtonProducts = ({ name, url, price, type }: Props) => {
    return (
        <div className={styles.card_button}>
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
