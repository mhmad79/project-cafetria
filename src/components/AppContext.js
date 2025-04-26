'use client'
import {SessionProvider} from 'next-auth/react'
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext({})

// حساب السعر بناءً على حجم المنتج والإضافات
export function cartProductPrice(cartProduct) {
    let price = cartProduct.price || 0;
    if (cartProduct.size) {
        price += cartProduct.size.price || 0;
    }
    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price || 0;
        }
    }
    console.log(`Calculated price for product ${cartProduct.name}:`, price);
    return price;
}

// مكون الـ AppProvider لإدارة سلة التسوق
export function AppProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        // تحميل السلة من localStorage عند التحميل
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem("cart")));
        }
    }, []);

    // مسح السلة
    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    // إزالة منتج من السلة
    function removeCartProduct(indexToTemove) {
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToTemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
        toast.success('Product removed', {
            position: 'top-right'
        });
    }

    // حفظ السلة في localStorage
    function saveCartProductsToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem("cart", JSON.stringify(cartProducts));
        }
    }

    // إضافة منتج إلى السلة
    function addToCart(product, size = null, extras = []) {
        setCartProducts(prevProducts => {
            const cartProduct = {...product, size, extras};
            const newProducts = [...prevProducts, cartProduct];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
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
