import React, { useEffect, useState } from 'react';

const OrderRow = ({order,handleDelete, handleUpdateStatus}) => {
   const {_id, serviceName,price, customer, phone, service, status} =order;
   const[orderService, setOrderService] =useState({})

   useEffect(()=>{
    fetch(`https://genius-car-server-vert.vercel.app/services/${service}`)
    .then(res=>res.json())
    .then(data=>setOrderService(data))
   },[service])


    return (
        <tr>
        <th>
          <label>
          <button onClick={()=>handleDelete(_id)} className="btn btn-circle btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="rounded w-24 h-24">
                {
                    orderService?.img &&
                    <img src={orderService.img} alt="Avatar Tailwind CSS Component" />
                }
                
              </div>
            </div>
            <div>
              <div className="font-bold">{customer}</div>
              <div className="text-sm opacity-50">{phone}</div>
            </div>
          </div>
        </td>
        <td>
         
          <br/>
          <span className="badge badge-ghost badge-sm">{serviceName}</span><br/>
          <span className="badge badge-ghost badge-sm">$ {price}</span>
        </td>
        <td>Purple</td>
        <th>
          <button onClick={()=>handleUpdateStatus(_id)} className="btn btn-ghost btn-xs">{status? status: 'pending'}</button>
        </th>
      </tr>
    );
};

export default OrderRow;