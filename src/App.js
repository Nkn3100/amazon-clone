import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, { useEffect } from "react";

import Checkout from './Checkout';
import {Elements} from "@stripe/react-stripe-js"
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Orders from './Orders';
import Payment from './Payment'
import { auth } from './firebase';
import {loadStripe} from "@stripe/stripe-js";
import { useStateValue } from './StateProvider';

const promise = loadStripe("pk_test_51KvaL7SCrWx8JsIGYb6nIvcrJvkSXQzvdQNhFq4KzP2PqDYHoALdaRG0QCI3faZsUu7Hf4tkPjBW6nKMVqEjD7Au00WcSODw1B");

function App() {
  const[{}, dispatch] = useStateValue();
  
    useEffect(()=>{
      // will only run once when the app component loads...
      auth.onAuthStateChanged(authUser => {
        console.log('THE USER IS >>> ', authUser);
        
        if(authUser){
          // the user just logged in / the user was logged in
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        } else {
          // the user is logged out
          dispatch({
            type:'SET_USER',
            user: null
          })
          
        }
        
      })
    }, [])
    
    return(
      // BEM
      <div className='app'>
        <BrowserRouter >
          
            <Routes>
              
                <Route exact path="/" element={<><Header /><Home /></>} />
                <Route path="/checkout" element={<><Header /><Checkout/></>} />  
                <Route path="/login" element={<Login />}/>
                <Route path="/payment" element={<>
                <Header />
                <Elements stripe={promise} ><Payment/></Elements>
                
                </>} />
                <Route path="/orders" element={<><Header /><Orders/></>}/>
            </Routes>
          
        </BrowserRouter>
      </div>
      
   
    );
}

export default App;
