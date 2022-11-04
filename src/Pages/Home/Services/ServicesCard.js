import React from 'react';
import { Link } from 'react-router-dom';

const ServicesCard = ({service}) => {
    console.log(service)
    const{_id, img, title, price}=service;
    return (
        <div className="card w-82 bg-base-100 shadow-xl">
        <figure><img src={img} alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className='text-semibold text-orange-600'>Price: $ {price}</p>
          <div className="card-actions justify-end">
            <Link to={`/checkout/${_id}`}><button className="btn btn-danger">Check Out</button></Link>
          </div>
        </div>
      </div>
    );
};

export default ServicesCard;