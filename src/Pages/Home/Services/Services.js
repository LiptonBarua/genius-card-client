import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
    const[services, setServices] = useState([]);
   
    useEffect(()=>{
         fetch('https://genius-car-server-vert.vercel.app/services')
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])
    return (
        <div className='my-12'>
            <div className='text-center'>
                <p className='text-2xl font-bold text-orange-600'>Service</p>
                <h1 className='text-5xl font-bold py-3'>Our Service Area</h1>
                <p className='w-1/2 mx-auto'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
             <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
                {/* <h1>Services: {services.length}</h1> */}
                {
                    services.map(service=><ServicesCard key={service._id} service={service}></ServicesCard>)
                }
             </div>
        </div>
    );
};

export default Services;