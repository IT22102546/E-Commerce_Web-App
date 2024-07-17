import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineCurrencyDollar, HiOutlineExclamationCircle, HiOutlineShoppingBag } from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js';

export default function DashOrders() {
    const { currentUser } = useSelector((state) => state.user);
    const [Orders, setOrders] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState('');

    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSale, setTotalSale] = useState(0);
    const [searchName, setSearchName] = useState('');

    const deliveryfee = 300;

    const calculateTotalSale = () => {
        const total = Orders.reduce((accumulator, currentOrder) => {
            return accumulator + parseFloat(currentOrder.totalcost);
        }, 0);
        setTotalSale(total);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/order/getorders`);
                if (res.ok) {
                    const data = await res.json();
                    const newOrders = data.map(order => ({
                        ...order,
                        isNew: true
                    }));
                    newOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(newOrders);
                    setTotalOrders(newOrders.length);
                    calculateTotalSale(newOrders);
                }
            } catch (error) {
                console.log("error in fetching", error);
            }
        };
        calculateTotalSale();

        if (currentUser) {
            fetchOrders();
        }
    }, [Orders]);

    const handleDeleteOrder = async () => {
        setShowModel(false);
        try {
            const res = await fetch(`/api/order/deleteorder/${orderIdToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setOrders((prev) =>
                    prev.filter((orders) => orders._id !== orderIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleOrderClick = (orderId) => {
        const updatedOrders = Orders.map(order => {
            if (order._id === orderId) {
                return { ...order, isNew: false };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    const generatePDFReport = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        const content = `
        <style>
          table {
            margin:0 auto;
            width: 90%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
            font-size: 10px; 
          }
          td {
            font-size: 10px; 
          }
          .report-title{
            text-align:center;
            font-size:18px;
          }
          .details{
            margin-top:50px;
            margin-left:30px;
          }
          .report{
            margin-left:30px;
            font-size:10px;
            margin-bottom:10px;
          }
        </style>

        <h1 class="report-title"><b>Order Details Report</b></h1>
        <div class="details">
          <p>Total Orders: ${totalOrders}</p>
          <p>Total Sales : Rs.${totalSale}.00</p>
          <p>Total Profit: Rs.${totalSale - 300 * totalOrders}.00</p>
        </div>
        <br>
        <br>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Items</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Subtotal</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            ${Orders.map((order) => `
              <tr>
                <td>${order._id}</td>
                <td>
                  ${order.productsId.map((product) => `
                      <p>Name: ${product.title}</p>
                      <p>Quantity: x${product.quantity}</p>
                  `).join('')}
                </td>
                <td>${order.email}</td>
                <td>${order.phone}</td>
                <td>${order.address}, ${order.state}, ${order.zip}</td>
                <td>Rs. ${order.subtotal}.00</td>
                <td>Rs. ${order.totalcost}.00</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
        html2pdf().from(content).set({ margin: 1, filename: 'orders_report.pdf' }).save();
    };

    const handleGenerateReport = () => {
        generatePDFReport();
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            <div className="flex flex-wrap gap-5">
                <div>
                    <Button
                        gradientDuoTone='purpleToBlue'
                        outline
                        onClick={handleGenerateReport}
                        className=""
                    >
                        Generate Report
                    </Button>
                </div>
                <br />
                <div className='flex-wrap flex gap-4 justify-center'>
                    <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <div>
                                <h3 className='text-gray-500 text-md uppercase'>Total Orders</h3>
                                <p className='text-2xl'>{totalOrders}</p>
                            </div>
                            <HiOutlineShoppingBag className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                        </div>
                        <div className='flex gap-2 text-sm'>
                            <span className='text-green-500 flex items-center'>
                                <HiOutlineShoppingBag />
                                {totalSale}
                            </span>
                            <div className='text-gray-500'>Total Sales</div>
                        </div>
                    </div>
                    <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <div>
                                <h3 className='text-gray-500 text-md uppercase'>
                                    Total Sales
                                </h3>
                                <p className='text-2xl'>Rs. {totalSale}.00</p>
                            </div>
                            <HiOutlineCurrencyDollar className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                        </div>
                        <div className='flex gap-2 text-sm'>
                            <span className='text-green-500 flex items-center'>
                                <HiOutlineCurrencyDollar />
                                {totalSale}.00
                            </span>
                            <div className='text-gray-500'>Currently</div>
                        </div>
                    </div>
                    <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <div>
                                <h3 className='text-gray-500 text-md uppercase'>
                                    Total Profit
                                </h3>
                                <p className='text-2xl'>{totalSale}.00 - 300 x {totalOrders}</p>
                            </div>
                            <HiOutlineCurrencyDollar className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                        </div>
                        <div className='flex gap-2 text-sm'>
                            <span className='text-green-500 flex items-center'>
                                <HiOutlineCurrencyDollar />
                                {totalSale - deliveryfee * totalOrders}.00
                            </span>
                            <div className='text-gray-500'>All the time</div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="pt-6 px-4 font-semibold">Orders received</h1>
            {Array.isArray(Orders) && Orders.length > 0 ? (
                <>
                    <div className="flex ">
                        <TextInput
                            type='text'
                            placeholder='Search an order by (First Name or Last Name)'
                            required
                            id='title'
                            className='flex-1'
                            style={{ width: 700, marginTop: 30, marginBottom: 30, marginLeft: 250 }}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Order Items</Table.HeadCell>
                            <Table.HeadCell>First Name</Table.HeadCell>
                            <Table.HeadCell>Last Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Phone</Table.HeadCell>
                            <Table.HeadCell>Address</Table.HeadCell>
                            <Table.HeadCell>Subtotal</Table.HeadCell>
                            <Table.HeadCell>Delivery Fee</Table.HeadCell>
                            <Table.HeadCell>Payment</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        {Orders.filter((orders) => {
                            const searchQuery = searchName.toLowerCase();
                            const firstName = orders.first_name.toLowerCase().includes(searchQuery);
                            const lastName = orders.last_name.toLowerCase().includes(searchQuery);
                            const orderId = orders._id.toLowerCase().includes(searchQuery);
                            return firstName || lastName || orderId;
                        }).map((orders) => (
                            <Table.Body className='divide-y' key={orders._id}>
                                <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${orders.isNew ? 'font-bold' : ''}`} onClick={() => handleOrderClick(orders._id)}>
                                    <Table.Cell>
                                        {orders.productsId.map((product) => (
                                            <div key={product.title} className="w-40">
                                                <img src={product.mainImage} alt={product.title} className="w-10 h-10 object-cover" />
                                                <p className="font-semibold">Name : {product.title}</p>
                                                <p className="font-semibold">Quantity: x{product.quantity}</p>
                                                <br />
                                            </div>
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell>{orders.first_name}</Table.Cell>
                                    <Table.Cell>{orders.last_name}</Table.Cell>
                                    <Table.Cell>{orders.email}</Table.Cell>
                                    <Table.Cell>{orders.phone}</Table.Cell>
                                    <Table.Cell>{orders.address}, {orders.state}, {orders.zip}</Table.Cell>
                                    <Table.Cell>Rs.{orders.subtotal}.00</Table.Cell>
                                    <Table.Cell>Rs.{orders.deliveryfee}.00</Table.Cell>
                                    <Table.Cell>Rs.{orders.totalcost}.00</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex flex-row gap-2">
                                            <Link to={`/update-order/${orders._id}`}>
                                                <Button className="text-green-500">Edit Order</Button>
                                            </Link>
                                            <Button  className="text-red-500"onClick={() => {
                                                setShowModel(true);
                                                setOrderIdToDelete(orders._id);
                                            }}>Delete Order</Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                   
                </>
            ) : (
                <p>You have not any orders yet</p>
            )}
            <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Order</h3>
                    </div>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={handleDeleteOrder}>
                            Yes, I am sure
                        </Button>
                        <Button color='gray' onClick={() => setShowModel(false)}>
                            No, cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
