import AddToCartButton from './addToCartButton'

export default function MenuItemTitle({ onAddToCart, ...item }) {
    const {
        image, name, description, price,
        sizes, extraIngredientPrices
    } = item;

    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;

    // إضافة تحقق من الصورة لتجنب الأخطاء في حالة عدم وجود صورة
    const itemImage = image || '/default-image.png'; // صورة افتراضية في حال عدم وجود صورة

    return (
        <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition duration-500 ease-in-out hover:shadow-2xl hover:shadow-black'>
            <div className="text-center">
                <img src={itemImage} alt={name} className="max-h-24 block mx-auto" />
            </div>
            <h4 className="font-semibold text-sm my-3 sm:text-sm  md:text-lg">
                {name || 'No name available'} {/* إذا كانت القيمة غير موجودة، تعرض رسالة بديلة */}
            </h4>
            <p className="text-gray-500 line-clamp-3 md:line-clamp-none text-sm">
                {description || 'No description available'} {/* إذا كانت القيمة غير موجودة، تعرض رسالة بديلة */}
            </p>
            <AddToCartButton
                image={itemImage}
                hasSizesOrExtras={hasSizesOrExtras}
                onClick={onAddToCart}
                price={price}
            />
        </div>
    )
}
