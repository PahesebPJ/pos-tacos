'use client';

import Link from 'next/link';
import styles from '../styles/navBar.module.css';
import { usePathname } from 'next/navigation';
import {
    AiOutlineAppstoreAdd,
    AiOutlineBarChart,
    AiOutlineForm,
    AiOutlineHome,
} from 'react-icons/ai';
import Image from 'next/image';

const NavBar = () => {
    const pathName = usePathname();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__logo}>
                <Image
                    className={styles.img}
                    src="/Logo-tacos.png"
                    alt="Logo de la taqueria"
                    width={500}
                    height={500}
                />
            </div>
            <ul className={styles.ul}>
                <li>
                    <Link
                        href="/"
                        className={`${styles.ul__item} ${pathName === '/' ? styles.ul__item_active : ''}`}
                    >
                        <AiOutlineHome />
                        Inicio
                        <div
                            className={`${styles.bar} ${pathName === '/' ? styles.bar_active : ''}`}
                        ></div>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/products"
                        className={`${styles.ul__item} ${pathName === '/products' ? styles.ul__item_active : ''}`}
                    >
                        <AiOutlineAppstoreAdd />
                        Productos
                        <div
                            className={`${styles.bar} ${pathName === '/products' ? styles.bar_active : ''}`}
                        ></div>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/accounting"
                        className={`${styles.ul__item} ${pathName === '/accounting' ? styles.ul__item_active : ''}`}
                    >
                        <AiOutlineBarChart /> Contabilidad
                        <div
                            className={`${styles.bar} ${pathName === '/accounting' ? styles.bar_active : ''}`}
                        ></div>
                    </Link>
                </li>
                <li>
                    <Link
                        href="/inventory"
                        className={`${styles.ul__item} ${pathName === '/inventory' ? styles.ul__item_active : ''}`}
                    >
                        <AiOutlineForm /> Inventario
                        <div
                            className={`${styles.bar} ${pathName === '/inventory' ? styles.bar_active : ''}`}
                        ></div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
