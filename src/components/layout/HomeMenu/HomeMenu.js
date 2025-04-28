'use client'
import { useEffect, useState } from "react";
import MenuItem from "../../menu/menu";
import SectionHeaders from "../../SectionHeaders/SectionHeaders";
import Image from "next/image";

export default function HomeMenu () {
    const [bestSellers, setBestSellers] = useState([])
    
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                // استخدام slice لتحديد عدد معين من العناصر (مثلاً أول 5 عناصر)
                const slicedItems = menuItems.slice(0, 3); 
                setBestSellers(slicedItems);
            })
        })
    }, [])

    return (
        <>
        <section className="">
            <div className=" absolute left-0 right-0 w-fill justify-start">
                <div className=" absolute -left-0 top-[70%] text-left -z-10 ">
                    <Image src={'/sallad1.png'} alt="sallad" width={109} height={109}></Image>
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                <Image src={'/sallad2.png'} alt="sallad" width={107} height={195}></Image>
                </div>
            </div>
            <SectionHeaders 
                subHeader={ 'Chek out'}
                minHeader={'Our Best Sellers'}
            />
            <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestSellers?.length > 0 && bestSellers.map(item => (
            <MenuItem key={item._id} {...item} />
            ))}

            </div>
        </section>
        </>
    )
}