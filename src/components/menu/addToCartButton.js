import FlyIngButton from 'react-flying-item';

export default function AddToCartButton({
    hasSizesOrExtras, onClick, price, image
}) { 
    if (!hasSizesOrExtras) {
        return (
            <div className=' flying-button-parent mt-4'>
                <FlyIngButton
                    targetTop={'5%'}
                    targetLeft={'95%'}
                    src={image}>
                    <div onClick={onClick}>
                        Add to cart ${price}
                    </div>
                </FlyIngButton>

           </div>
        )
    }
    return (
        <button
            type='button'
            onClick={onClick}
            className="mt-4 bg-primary text-white rounded-full px-6 py-2"
            >
                <span>Add to cart ( From ${price} )</span>
        </button>
    )
}