'use client'
import { useContext } from "react";
import SectionHeaders from "../../components/SectionHeaders/SectionHeaders";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import Image from "next/image";
import Trash from "../../components/layout/icons/Trash";

export default function CartPage() {
    const {cartProducts, removeCartProduct} = useContext(CartContext)
    return (
        <section className="mt-8 ">
            <div className=" text-center">
                <SectionHeaders minHeader="Cart" />
            </div>
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                   {cartProducts?.map((product, index) => (
                    <div
                        key={`${product._id}-${product.size?.name}-${index}`}
                        className="flex items-center gap-4 mb-2 border-b py-2"
                    >
                        <div className="w-24">
                            <Image width={240} height={240} src={product.image} alt={''} />
                        </div>
                        <div className=" grow ">
                        <h3 className=" font-semibold">{product.name}</h3>
                        {product.size && (
                            <div 
                                className=" text-sm ">
                                    Size: <span>{product.size.name}</span>
                            </div>
                        )}
                        {product.extras?.length > 0 && (
                            <div className="text-sm text-gray-500">
                                {product.extras.map(extra => (
                                    <div>{extra.name} ${extra.price}</div>
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
                </div>
                <div>right</div>
            </div>
        </section>
    )
}