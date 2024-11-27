export default function MenuItem() {
    return (
        <>
            <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition duration-500 ease-in-out hover:shadow-2xl hover:shadow-black'>
                <div className=" text-center">
                    <img src={'/pizza.png'} alt="pizza"  className=" max-h-24 block mx-auto "></img>
                </div>
                    <h4 className=" font-semibold text-lg my-3">
                        Pepperoni Pizza
                    </h4>
                    <p className=" text-gray-500 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </p>
                    <button className=" mt-4 bg-primary text-white rounded-full px-6 py-2">
                        Add to cart 100 EGP
                    </button>
                </div>
        </>
    )
}