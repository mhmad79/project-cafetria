'use client'
import {SessionProvider} from 'next-auth/react'
import {  useEffect, useState} from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
    let price = cartProduct.price || 0;
    if(cartProduct.size) {
        price += cartProduct.size.price || 0;
    }
    if(cartProduct.extras?.length > 0 ) {
        for (const extra of cartProduct.extras) {
            price += extra.price || 0;
        }
    }
    console.log(`Calculated price for product ${cartProduct.name}:`, price);
    return price;
}


export function AppProvider({children}) {
    const [cartProducts, setCartProducts]= useState([])
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        if(ls && ls.getItem('cart')) {
            setCartProducts( JSON.parse( ls.getItem("cart") ) )
        }
    }, [])

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([])
    }

    function removeCartProduct(indexToTemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts
            .filter((v,index) => index !== indexToTemove);
            saveCartProductsToLocalStorage(newCartProducts)
            return newCartProducts
        });
        toast.success('Product removed', {
            position: 'top-right'
        })
    }
    function saveCartProductsToLocalStorage(cartProducts) {
        if(ls) {
            ls.setItem("cart", JSON.stringify(cartProducts));
        }
    }

    function addToCart(product, size=null, extras=[]) {
        setCartProducts(prevProducts => {
            const cartProduct = {...product, size, extras}
            const newProducts = [...prevProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts)
            return newProducts
        })
    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    );
}