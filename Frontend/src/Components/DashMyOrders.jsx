import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';

export default function DashMyOrders() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/order/customer/${currentUser._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className='table-auto overflow-x-scroll mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <h2 className='my-7 text-center font-semibold text-3xl'>Order History</h2>

      {orders.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Order ID</Table.HeadCell>
              <Table.HeadCell>Product Image</Table.HeadCell>
              <Table.HeadCell>Product Title</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Sub Total</Table.HeadCell>
              <Table.HeadCell>Delivery Fee</Table.HeadCell>
              <Table.HeadCell>Total Cost</Table.HeadCell>
            </Table.Head>
            {orders.map((order) => (
              <Table.Body className='divide-y' key={order.orderId}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{order.orderId}</Table.Cell>
                  <Table.Cell>
                    {order.productsId.map((product) => (
                      <img key={product._id} src={product.mainImage} alt={product.title} className="w-10 h-10 object-cover" />
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    {order.productsId.map((product) => (
                      <p key={product._id} className="font-semibold">{product.title}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    {order.productsId.map((product) => (
                      <p key={product._id} className="font-semibold">{product.quantity}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell>{order.subtotal}</Table.Cell>
                  <Table.Cell>{order.deliveryfee}</Table.Cell>
                  <Table.Cell>{order.totalcost}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no orders yet!</p>
      )}
    </div>
  );
}
