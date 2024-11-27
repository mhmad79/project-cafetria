import Image from "next/image"
import IconRight from "../icons/Right"
export default function Hero() {
    return (
        <section className=" hero mt-4">
            <div className=" py-12">
                <h1 className=" text-4xl font-semibold ">
                    Evruthing <br />
                    is better  <br />
                    with a&nbsp;
                    <span className=" text-primary">
                        Cafeteria
                    </span>
                </h1>
                <p className=" my-6 text-gray-500">
                    the missing thing in the morning is out brackfast
                </p>
                <div className=" flex gap-4 text-sm">
                    <button className=" flex justify-between items-center gap-2 bg-primary text-white uppercase  px-4 py-2 rounded-full">
                        Order now
                        <IconRight />
                    </button>

                    <button className=" flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
                        Learn more
                        <IconRight />
                    </button>
                </div>
            </div>
            <div className=" relative ">
                <Image  src='/pizza.png' alt="Pizza" layout={"fill"} objectFit={"contain"} ></Image>
            </div>
        </section>
    )
}