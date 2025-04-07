'use client';

import { useContext } from 'react';
import styles from '@/app/styles/Footer.module.css';
import Button from './Button';
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5';
import { contextCounterPerson } from '../context/PersonProvider';

const Footer = () => {
    const context = useContext(contextCounterPerson);

    if (!context) return;

    const clearArrayPerson = () => {
        context.setCounterPerson([]);
    };

    return (
        <footer className={styles.footer}>
            <p>
                Total: <span>$0</span>
            </p>
            <div>
                <Button
                    onClick={clearArrayPerson}
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #bbb8b8',
                        boxShadow: 'none',
                        color: '#868484',
                    }}
                >
                    <IoClose />
                    Cancelar
                </Button>
                <Button className={styles.translate}>
                    <IoCheckmarkSharp />
                    Cerrar Orden
                </Button>
            </div>
        </footer>
    );
};

export default Footer;
