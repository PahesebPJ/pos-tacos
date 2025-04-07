"use client";

//Utils
import { IoArrowBackOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/styles/tablePage.module.css';
import { useEffect, useState } from 'react';

//Props
import { Product } from '@/app/props/Product';
import { Tableprops } from '@/app/props/TableProps';
import Order from '@/app/props/OrderProps';

//API
import api_routes from '@/app/service/api_routes';
import { apiURL, getApiCall } from '@/app/service/api_calls';

//Components
import Header from '@/app/components/Header';
import PersonList from '@/app/components/PersonList';
import Footer from '@/app/components/Footer';
import SearchBar from '@/app/components/SearchBar';
import ProductGrid from '@/app/components/ProductGrid';
import OrderTable from '@/app/components/OrderTable';

/* Esta linea le da formato de comas al total
ejemplo: 1000 -> 1,000
tuVariable.toLocaleString('es-US') */

const getTable = async (id: string): Promise<Tableprops> => {
    const table: Tableprops = await getApiCall(
        `${apiURL}${api_routes.tables}/${id}`
    );

    return table;
};

const getProducts = async (): Promise<Product[]> => {
    const products = await getApiCall(`${apiURL}${api_routes.products}`);

    return products;
};

const Table = ({ params }: { params: { id: string } }) => {
    //Fetching data
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [products, setProducts] = useState<Product[] | undefined>();
    const [orders, setOrders] = useState<Order[]>([{
        personId: 1,
        personName: "Persona 1",
        items: []
    }]);
    const [selectedPersonId, setSelectedPersonId] = useState(orders[0]?.personId || 1);

    //Searchbar
    const [searchTerm, setSearchTerm] = useState('');
    const filteredProducts = products?.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.type.toLowerCase().includes(searchTerm.toLowerCase()));

    //Functions
    const addToOrder = (productId: number, personId: number) => {
        const product = products?.find(p => p.id == productId);
        if(!product) return;

        setOrders(prevOrders => {
            const personOrders = prevOrders.find(o => o.personId === personId);
            if (personOrders) {
              const existingItem = personOrders.items.find(item => item.productId === productId.toString());
              if (existingItem) {
                return prevOrders.map(order => order.personId === personId ? {
                  ...order,
                  items: order.items.map(item => item.productId === productId.toString() ? {
                    ...item,
                    quantity: item.quantity + 1
                  } : item)
                } : order);
              } else {
                return prevOrders.map(order => order.personId === personId ? {
                  ...order,
                  items: [...order.items, {
                    id: Date.now(),
                    productId: productId.toString(),
                    quantity: 1
                  }]
                } : order);
              }
            } else {
              return [...prevOrders, {
                personId,
                personName: `Person ${personId}`,
                items: [{
                  id: Date.now(),
                  productId: productId.toString(),
                  quantity: 1
                }]
              }];
            }
        });
    }

    const addNewPerson = () => {
        const newPersonId = Math.max(...orders.map(o => o.personId)) + 1;
        setOrders(prevOrders => [...prevOrders, {
          personId: newPersonId,
          personName: `Persona ${newPersonId}`,
          items: []
        }]);
        setSelectedPersonId(newPersonId);
    };

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        fetchParams();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const table = await getTable(id);
                setName(table.name);

                const productsData = await getProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

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
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <PersonList orders={orders} selectedPersonId={selectedPersonId} onSelectPerson={setSelectedPersonId} onAddPerson={addNewPerson}/>
                <ProductGrid products={filteredProducts || []} addToOrder={addToOrder} selectedPersonId={selectedPersonId} />
                <OrderTable orders={orders} products={products || []} />
                <Footer />
            </section>
        </>
    );
};

export default Table;
