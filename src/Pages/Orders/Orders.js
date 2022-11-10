import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user} = useContext(AuthContext);
    const [orders, setOrders] = useState([])
    
    
    useEffect(()=>{
    if(user?.email){
        fetch(`https://genius-car-server-vert.vercel.app/orders?email=${user?.email}`,{
          headers:{
            authorization: `Bearer ${localStorage.getItem('genius-token')}`
          }
        })
        .then(res=>res.json())
        .then(data=>setOrders(data))
    }
    }, [user?.email])

    const handleDelete=id=>{
      const procced = window.confirm('Are you sure, you want to cancel this order');
      if(procced){
       fetch(`https://genius-car-server-vert.vercel.app/orders/${id}`,{
           method: 'DELETE'
       })
       .then(res=>res.json())
       .then(data=>{
           console.log(data)
           if(data.deletedCount){
            alert('deleted successfully');
            const remaining =orders.filter(ods=>ods._id!==id);
            setOrders(remaining);
           }
       })
      }
  }

  const handleUpdateStatus =(id)=>{
    fetch(`https://genius-car-server-vert.vercel.app/orders/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status: 'Approved'})
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
    if(data.modifiedCount>0){
      const remaining = orders.filter(ods=>ods._id!==id);
      const approved = orders.find(ods=>ods._id===id);
      approved.status = 'Approved'

      const newOrders = [...remaining, approved]
      setOrders(newOrders)
    }
    })
  
  }
    return (
        <div>
            <h1>{orders?.length}</h1>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">

    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {
        orders.map(order=><OrderRow order={order._id} order={order} handleDelete={handleDelete} handleUpdateStatus={handleUpdateStatus}></OrderRow>)
      }

    </tbody>
    
  </table>
</div>
 
   



</div>
      
    );
};

export default Orders;