import { IoArrowBackOutline, IoSearchOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import api_routes from '@/app/service/api_routes';
import { apiURL, getApiCall } from '@/app/service/api_calls';
import styles from '@/app/styles/tablePage.module.css';
import PersonList from '@/app/components/PersonList';
import Footer from '@/app/components/Footer';
import ButtonProducts from '@/app/components/ButtonProducts';
import ListTable from '@/app/components/ListTable';
// import { Suspense } from 'react';

type Table = {
    id: number;
    name: string;
    status: number;
};

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    type: string;
    url: string;
};

/* Esta linea le da formato de comas al total
ejemplo: 1000 -> 1,000
tuVariable.toLocaleString('es-US') */

const getTable = async (id: string): Promise<Table> => {
    const table: Table = await getApiCall(
        `${apiURL}${api_routes.tables}/${id}`
    );

    return table;
};

const getProducts = async (): Promise<Product[]> => {
    const products = await getApiCall(`${apiURL}${api_routes.products}`);

    return products;
};

const Table = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const { name } = await getTable(id);
    const products = await getProducts();

    return (
        <>
            <Header>
                <div className={styles.navbar__logo}>
                    <Image
                        className={styles.img}
                        src="/Logo-tacos.png"
                        alt="Logo de la taqueria"
                        width={500}
                        height={500}
                    />
                </div>
                <h1>{name}</h1>
                <Link className={styles.link} href={'/'}>
                    <IoArrowBackOutline className={styles.icon} />
                    Atrás
                </Link>
            </Header>

            <section className={styles.body}>
                <div className={styles.search}>
                    <div className={styles.container_search}>
                        <IoSearchOutline />
                        <input
                            type="search"
                            placeholder="Buscar productos por nombre o tipo..."
                        />
                    </div>
                </div>

                <PersonList />

                <div className={styles.menu}>
                    <h2>Productos</h2>

                    <div className={styles.list_products}>
                        {products.map(({ id, name, price, type, url }) => (
                            <ButtonProducts
                                key={id}
                                name={name}
                                price={price}
                                type={type}
                                url={url}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.orders}>
                    <h2>Orden Actual</h2>

                    <ListTable />
                </div>

                <Footer />
            </section>
        </>
    );
};

export default Table;
