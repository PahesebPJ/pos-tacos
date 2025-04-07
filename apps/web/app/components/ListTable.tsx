'use client';
import { Fragment } from 'react';
// import TableProduct from './TableProduct';
import styles from '@/app/styles/ListTable.module.css';
import Order from '../props/OrderProps';

interface ListTableProps {
    orders: Order[];
    getProductById: (id: number) => any;
    calculateSubtotal: (productId: number, quantity: number) => any;
}

const ListTable: React.FC<ListTableProps> = ({ orders, getProductById, calculateSubtotal }) => {
    const calculatePersonTotal = (items: {
        productId: number;
        quantity: number;
      }[]) => {
        return items.reduce((total, item) => total + calculateSubtotal(item.productId, item.quantity), 0);
      };
    return (
        <div className={styles.list_tables}>
            <table className={styles.container_table}>
                <thead className={styles.tonality}>
                    <tr>
                        <th style={{ width: '25%' }}>ID</th>
                        <th style={{ width: '25%' }}>PRODUCTO</th>
                        <th style={{ width: '25%' }}>CANTIDAD</th>
                        <th style={{ width: '25%' }}>SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => <Fragment key={order.personId}>
                        <tr className="bg-gray-100">
                        <td colSpan={4} className="px-4 py-2 text-sm font-medium text-gray-900">
                            {order.personName}
                        </td>
                        </tr>
                        {order.items.map(item => {
                            const product = getProductById(Number(item.productId));
                            return <tr key={item.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        #{item.id}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {product?.name || 'Unknown Product'}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {item.quantity}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                        $
                                        {calculateSubtotal(Number(item.productId), item.quantity).toFixed(2)}
                                    </td>
                                    </tr>;
                        })}
                        <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right text-gray-700">
                            Subtotal:
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${calculatePersonTotal(order.items.map(item => ({
                                productId: Number(item.productId),
                                quantity: item.quantity
                            }))).toFixed(2)}
                        </td>
                        </tr>
                    </Fragment>)}
                </tbody>
            </table>
        </div>
    );
};

export default ListTable;
