'use client';

import Link from 'next/link';
import styles from '../styles/navBar.module.css';
import { usePathname } from 'next/navigation';
import {
    AiOutlineAppstoreAdd,
    AiOutlineBarChart,
    AiOutlineHome,
    AiOutlineSetting,
} from 'react-icons/ai';

const NavBar = () => {
    const pathName = usePathname();

    return (
        <nav className={styles.navbar}>
            <span className={styles.navbar__logo}>Buisness Logo</span>
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
                        href="/config"
                        className={`${styles.ul__item} ${pathName === '/config' ? styles.ul__item_active : ''}`}
                    >
                        <AiOutlineSetting /> Configuración
                        <div
                            className={`${styles.bar} ${pathName === '/config' ? styles.bar_active : ''}`}
                        ></div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
