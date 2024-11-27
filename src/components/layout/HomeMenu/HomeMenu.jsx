import MenuItem from "../../menu/menu";
import SectionHeaders from "../../SectionHeaders/SectionHeaders";
import Image from "next/image";

export default function HomeMenu () {
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
                minHeader={'Menu'}
            />
            <div className=" grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
        </>
    )
}