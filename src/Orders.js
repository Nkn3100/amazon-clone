import "./Orders.css"

import React, { useEffect, useState } from 'react'

import Order from './Order';
import { db } from './firebase';
import {motion} from 'framer-motion';
import { useStateValue } from './StateProvider';

function Orders() {
  const [{basket, user}, dispath] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    if(user) {
      db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(
        snapshot =>{
          setOrders(snapshot.docs.map(doc=>({
            id: doc.id,
            data: doc.data()
          })))
        }
      )
    }else {
      setOrders([])
    }

  }, [user])
  
  return (
    <div className="orders">
        <h1>Your Orders</h1>
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2}}
        className="orders__order">
          {orders?.map(order =>(
            <Order order={order}/>
          ))}
        </motion.div>
    </div>
  )
}

export default Orders