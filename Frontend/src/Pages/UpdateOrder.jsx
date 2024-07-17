import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';

import { useNavigate , useParams} from "react-router-dom";

export default function UpdateOrder() {
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { orderId } = useParams();

    const navigate = useNavigate();
    // const { currentUser } = useSelector((state) => state.user);

    //fetch relevant order using id
        useEffect(() => {
            try {
            const fetchOrder = async () => {
                const res = await fetch(`/api/order/getorder/${orderId}`);
                const data = await res.json();
                if (!res.ok) {
                console.log(res);
                }
                if (res.ok) {
                    console.log(data);
                //   setFormData(data.orders[0]);
                setFormData(data);
                }
            };
        
            fetchOrder();
            } catch (error) {
            console.log(error.message);
            }
        }, [orderId]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/order/updateorder/${formData._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
    
          if (res.ok) {
            setPublishError(null);
            navigate('/dashboard?tab=orders');
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className="p-3 mx-auto">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Order</h1>
        <form className="flex max-w-3xl flex-col mx-auto pb-10" onSubmit={handleSubmit} >
            <div className='flex flex-col justify-center'>
                <div>
                    <TextInput type='text' required id='userId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, _id: e.target.value })} value={formData._id} placeholder="id" />
                    <TextInput type='text' required id='userId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, userId: e.target.value })} value={formData.userId} placeholder="User ID" readOnly/>
                    <TextInput type='text' required id='orderId' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, orderId: e.target.value })} value={formData.orderId} placeholder="Order ID" readOnly/>
                    <label>First Name</label>
                    <TextInput type='text' required id='first_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} value={formData.first_name} placeholder="First Name"/>
                    <label>Last Name</label>
                    <TextInput type='text' required id='last_name' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} value={formData.last_name} placeholder="Last Name"/>
                    <label>Email</label>
                    <TextInput type='text' required id='email' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} placeholder="Email"/>
                    <label>Phone</label>
                    <TextInput type='text' required id='phone' className='p-2' onChange={(e) => setFormData({ ...formData, phone: e.target.value })} value={formData.phone} placeholder="Phone"/>
                </div>
                <div >
                <label>Address</label>
                    <TextInput type='text' required id='address' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, address: e.target.value })} value={formData.address} placeholder="Address"/>
                    {/* <TextInput type='text' required id='state' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, state: e.target.value })} value={formData.state} placeholder="State"/> */}
                    <label>Zip</label>
                    <TextInput type='text' required id='zip' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, zip: e.target.value })} value={formData.zip} placeholder="ZIP"/>
                    {/* <TextInput type='text' required id='subtotal' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })} value={formData.subtotal} placeholder="Subtotal" readOnly/>
                    <TextInput type='text' required id='deliveryfee' className='p-2 mb-2' onChange={(e) => setFormData({ ...formData, deliveryfee: e.target.value })} value={formData.deliveryfee} placeholder="Delivery Fee" readOnly/>
                    <TextInput type='text' required id='totalcost' className='p-2' onChange={(e) => setFormData({ ...formData, totalcost: e.target.value })} value={formData.totalcost} placeholder="Total Cost" readOnly/> */}
                </div>
            </div>
            <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
            {publishError && (
            <Alert className='mt-5' color='failure'>
                {publishError}
            </Alert>
            )}
            </form>

    </div>
  )
}

