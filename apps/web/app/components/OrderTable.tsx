import styles from '@/app/styles/tablePage.module.css';
import ListTable from '@/app/components/ListTable';
import Order from '../props/OrderProps';
import { Product } from '../props/Product';

interface OrderTableProps {
  orders: Order[];
  products: Product[];
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  products
}) => {
  
  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  }
  
  const calculateSubtotal = (productId: number, quantity: number) => {
    const product = getProductById(productId);
    return product ? product.price * quantity : 0;
  };
  return (
    <div className={styles.orders}>
        <h2>Orden Actual</h2>

        <ListTable orders={orders} getProductById={getProductById} calculateSubtotal={calculateSubtotal} />
    </div>
  )
}

export default OrderTable