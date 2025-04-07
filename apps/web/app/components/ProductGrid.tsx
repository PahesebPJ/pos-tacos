import styles from '@/app/styles/tablePage.module.css';
import ButtonProducts from '@/app/components/ButtonProducts';
import { Product } from '../props/Product';

interface ProductGridProps {
    products: Product[];
    addToOrder: (productId: number, personId: number) => void;
    selectedPersonId: number;
}

function ProductGrid({ products, addToOrder, selectedPersonId }: ProductGridProps) {
  if (!Array.isArray(products)) {
    console.error('Invalid products prop passed to ProductGrid:', products);
    return <div>No products available</div>;
  }
  return (
    <div className={styles.menu}>
        <h2>Productos</h2>

        <div className={styles.list_products}>
            {products?.map(({ id, name, price, type, url }) => (
                <ButtonProducts
                    key={id}
                    id={id}
                    name={name}
                    price={price}
                    type={type}
                    url={url}
                    addToOrder={addToOrder} 
                    selectedPersonId={selectedPersonId}
                />
            ))}
        </div>
    </div>
  )
}

export default ProductGrid