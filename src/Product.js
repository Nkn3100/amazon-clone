import './Product.css'

import React from 'react'
import {motion} from 'framer-motion'
import { useStateValue } from './StateProvider'

function Product({id, title, image, price, rating}) {
  
  const [{}, dispatch] = useStateValue();
  // console.log('this is the basket >>>', basket)
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });  
  };
  return (
    <motion.div
              whileHover={{scale:1.05}}
              transition={{type:'spring', stiffness:500}}
            
          className='product'>
        <div className="product__info">
            <p className="product__title">{title}</p>
            <p className="product__price">
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">
                {Array(rating).fill().map((_, i)=>(<p>⭐</p>))}
                
            </div>
        </div>
        <img src={image} alt="" />
        <motion.button 
        whileHover={{scale:1.1, transition:{yoyo: Infinity}}}
        onClick={addToBasket}>Add to Basket</motion.button>
    </motion.div>
  )
}

export default Product