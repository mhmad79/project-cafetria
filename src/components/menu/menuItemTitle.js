export default function MenuItemTitle({onAddToCart, ...item}) {
    const {
        image, name, description, price,
        sizes, extraIngredientPrices
    } = item
    return (
        <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition duration-500 ease-in-out hover:shadow-2xl hover:shadow-black'>
            <div className="text-center">
                <img src={image} alt="pizza" className="max-h-24 block mx-auto" />
            </div>
            <h4 className="font-semibold text-lg my-3">
                {name}
            </h4>
            <p className="text-gray-500 text-sm">
                {description}
            </p>
            <button
                type='button'
                onClick={onAddToCart}
                className="mt-4 bg-primary text-white rounded-full px-6 py-2"
                >
                {(sizes?.length > 0 || extraIngredientPrices?.length > 0) ? (
                    <span>Add to cart ( From ${price} )</span>
                ) : (
                    <span>Add to cart ${price}</span>
                )}
            </button>
    </div>   
    )
}