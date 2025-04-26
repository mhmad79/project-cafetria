'use client';
import FormPhone from "../../../components/layout/form";
import {CartContext, cartProductPrice} from "../../../components/AppContext";
import SectionHeaders from "../../../components/SectionHeaders/SectionHeaders";
import CartProduct from "../../../components/menu/CartProduct";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";

export default function OrderPage() {
  const {clearCart} = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const {id} = useParams();
  useEffect(() => {
    let isMounted = true;
    fetch('/api/orders?_id=' + id)
      .then(res => res.json())
      .then(orderData => {
        if (isMounted) {
          setOrder(orderData);
          setLoadingOrder(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          console.error('Error fetching order:', error);
          setLoadingOrder(false);
        }
      });
    return () => { isMounted = false; };
  }, []);
  

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && (
        <div>Loading order...</div>
      )}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
          {order?.cartProducts?.length > 0 && order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
            
              <span className="text-black font-bold inline-block w-8">
                ${subtotal }
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <FormPhone
                disabled={true}
                addressProps={order}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}