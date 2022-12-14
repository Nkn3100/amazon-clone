import './Payment.css'

import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';
import { getBasketTotal } from './reducer';
import {motion} from 'framer-motion'
import { useStateValue } from './StateProvider'

function Payment() {
    
    const navigate = useNavigate();
    const [{basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])
    console.log('THE SECRET IS >>>', clientSecret)
    // console.log('😁', user)
    const handleSubmit = async (event) =>{
        // do all the fancy stripe stuff
        event.preventDefault();
        setProcessing(true)
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(( {paymentIntent} ) => {
            // paymentIntent = payment confirmation
            console.log('paymentIntent:',paymentIntent)
            db.collection('users').doc(user?.uid)
            .collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate("/orders" ,{replace:true});
        })
    }
    const handleChange = event => {
        //Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    
    return (
    <div className="payment">
        <div className="payment__container">
            <motion.h1 
            animate={{fontSize:'40px',color:'#000000'}}
            transition={{duration:1}}
            >
                Checkout(<Link to="/checkout">{basket?.length} items</Link>)
            </motion.h1>
            {/* Payment section - delivery address */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Kollam, Kerala, India</p>
                </div>
            </div>
            {/* Payment section - Review Items */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:2}}
                className="payment__items">
                    {basket.map(item => (
                        <CheckoutProduct key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </motion.div>
            </div>
            {/* Payment section - Payment method */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                    {/* Stripe magic will go */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment__priceContainer">
                        <CurrencyFormat
                            renderText={(value) =>(
                                <h3>Order Total: {value}</h3>
                                
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)} // part of the homework
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₹"}
                            
                        />
                        <motion.button 
                        whileHover={{scale:1.1,
                            transition:{
                              yoyo: Infinity
                            }}}
                        disabled={processing || disabled || succeeded}>
                            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                        </motion.button>
                        </div>
                        {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment