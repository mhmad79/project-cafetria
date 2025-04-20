'use client'
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../components/SectionHeaders/SectionHeaders";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import Image from "next/image";
import Trash from "../../components/layout/icons/Trash";
import FormPhone from "../../components/layout/form";
import { useProfile } from "../../components/layout/UseProfile/useProfile";
import { toast } from 'react-hot-toast';

export default function CartPage() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [details, setDetails] = useState({});
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (typeof window !== 'undefined') {
          if (window.location.href.includes('canceled=1')) {
            toast.error('Payment failed 😔');
          }
        }
      }, []);
    
    useEffect(() => {
        if (profileData?.phone) {
            const { phone } = profileData;
            const addressFromProfile = { phone };
            setDetails(addressFromProfile);
        }
    }, [profileData]);

    let subtotal
    for (const p of cartProducts) {
        subtotal  += cartProductPrice(p);
    }

    function handleDetailsChange(name, value) {
        setDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();
        // address and shopping cart products
    
        const promise = new Promise((resolve, reject) => {
          fetch('/api/checkout', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                details,
              cartProducts,
            }),
          }).then(async (response) => {
            if (response.ok) {
              resolve();
              window.location = await response.json();
            } else {
              reject();
            }
          });
        });
    
        await toast.promise(promise, {
          loading: 'Preparing your order...',
          success: 'Redirecting to payment...',
          error: 'Something went wrong... Please try again later',
        })
      }
    
      if (cartProducts?.length === 0) {
        return (
          <section className="mt-8 text-center">
            <SectionHeaders mainHeader="Cart" />
            <p className="mt-4">Your shopping cart is empty 😔</p>
          </section>
        );
      }
    

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders minHeader="Cart" />
            </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.map((product, index) => (
                        <div
                            key={`${product._id}-${product.size?.name}-${index}`}
                            className="flex items-center gap-4 border-b py-2"
                        >
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={''} />
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                {product.size && (
                                    <div className="text-sm">
                                        Size: <span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className="text-sm text-gray-500">
                                        {product.extras.map((extra, idx) => (
                                            <div key={`${extra.name}-${idx}`}>
                                                {extra.name} ${extra.price}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                ${cartProductPrice(product)}
                            </div>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => removeCartProduct(index)}
                                    className="p-2"
                                >
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-2 text-right pr-16">
                        <span className="text-gray-500">Subtotal:</span>
                        <span className="text-lg font-semibold pl-2">
                            ${subtotal }
                        </span>
                    </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <FormPhone
                            addressProps={details}
                            setAddressProp={handleDetailsChange}
                        />
                        <button type='submit'>Pay ${subtotal }</button>
                    </form>
                </div>
            </div>
        </section>
    );
}