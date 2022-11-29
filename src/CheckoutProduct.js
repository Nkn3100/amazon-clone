import './CheckoutProduct.css'

import React from 'react'
import {motion} from 'framer-motion'
import { useStateValue } from './StateProvider'

function CheckoutProduct({id, image, title, price, rating, hideButton}) {
    
    const [{ basket }, dispatch] = useStateValue();
    
    const removeFromBasket =() =>{
        //remove tem from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id:id,
        })
    }
    return (
    
    <div
        
        className="checkoutProduct">
            
        <img className='checkoutProduct__image' src={image} alt=""/>
        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{title}</p>
            <p className="checkoutProduct__price">
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
               {Array(rating).fill().map((_, i) => (<p>⭐</p>))} 
            </div>
            {!hideButton && (
                 <motion.button
                    whileHover={{scale:1.1,
                    transition:{
                      
                      yoyo: Infinity
                    }}} onClick={removeFromBasket}>Remove from basket</motion.button>
            )}
           
        </div>
    </div>
  )
}

export default CheckoutProduct