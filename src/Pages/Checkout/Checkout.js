import { data } from 'autoprefixer';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Checkout = () => {
    const {_id, title, price} = useLoaderData();
    const{user} =useContext(AuthContext)

    const handlePleaseOrder=(event)=>{
        event.preventDefault();
        const form = event.target;
        const name =`${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregister';
        const message = form.message.value;
        const phone = form.phone.value;

        const order={
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone, 
            message
        }

        // if(phone.length>10){
        //     alert ('Phone number should be 10 characters or longer');
        // }

        fetch('https://genius-car-server-vert.vercel.app/orders',{
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                alert('Order Placed Successfully')
                form.reset()
            }
            console.log(data)
        })
        .catch(error=>console.log(error))
    }
    return (
       <form onSubmit={handlePleaseOrder}>
        <h2 className='text-4xl'>You are about to order: {title}</h2>
        <h3 className='text-3xl'>Price: {price}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" required/>
            <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" />
            <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full" required/>
            <input name='email' type="text" placeholder="Email Id" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
        </div>
        <textarea name='message' className="textarea textarea-primary w-full h-24 my-5" placeholder="You are Message" required></textarea>
        <input name='' className='btn my-3' type="submit" value="Please Your Order" />
       </form>
    );
};

export default Checkout;