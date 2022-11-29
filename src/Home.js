import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

import React, { useState } from 'react'

import Carousel from 'react-bootstrap/Carousel'
import Product from "./Product"
import img1 from './photo_2022-05-06_15-16-35.jpg'
import { motion } from 'framer-motion'

function Home() {

  return (
  
    <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1,transition:{duration:1.5}}}
      className="home">
          
          <div className="home__container">
            <Carousel>
            
                  <Carousel.Item>
                  <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=""/>
                  </Carousel.Item>
                  <Carousel.Item>
                  <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Aug/1500x600_Hero-Tall_np._CB404803728_.jpg" alt=""/>
                  </Carousel.Item> 
            
          </Carousel>
          </div>
          
        
        <div className="home__row">

            <Product
            id="12321341"
            title="കരുതൽ സ്പർശം: From the experiences of a spine surgeon. By, Dr Suresh S Pillai"
            price={299}
            rating={5}
            image={img1}
            />

          
            <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={1769}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
          />
    
        </div>
        <div className="home__row">
            <Product
            id="4903850"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={3499}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
            />
            <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={3199}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            />
            <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={140900}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
            />
        </div>
        <div className="home__row">
            <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={49000}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            />
        </div>
    </motion.div>
  
  )
}

export default Home