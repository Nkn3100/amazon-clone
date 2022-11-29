import "./Subtotal.css";

import CurrencyFormat from 'react-currency-format';
import React from 'react';
import { getBasketTotal } from "./reducer";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Subtotal() {

    const navigate = useNavigate();
    const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
        <CurrencyFormat
        renderText={(value) =>(
            <>
            {/* Part of the homewrok */}
            <p>Subtotal ({basket.length} items):<strong>{value}</strong></p>
            <small className="subtotal__gift"><input type="checkbox"/>This order contain a gift</small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
        
        />
        <motion.button 
         initial={{opacity:0}}
         animate={{opacity:1}}
         transition={{delay:0.2, duration:1}}
         whileHover={{scale:1.1,
          transition:{
            yoyo: Infinity
          }}}
        //  transition={{type: 'spring', delay:0.2}}
        onClick={e=> navigate('/payment')}>Proceed to Checkout</motion.button>
    </div>
  )
}

export default Subtotal