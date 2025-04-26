import Trash from '../layout/icons/Trash'
import Plus from '../layout/icons/Plus'
import ChevronDown from '../layout/icons/ChevronDown'
import ChevronUp from '../layout/icons/ChevronUp'
import { useState } from 'react'

export default function MenuItemPriceProps({ addLable, name, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false)

    function addProp() {
        setProps(prevProps => [
            ...prevProps,
            { name: '', price: 0 }
        ]);
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevProps => {
            const updatedProps = [...prevProps];
            updatedProps[index][prop] = newValue;
            return updatedProps;
        });
    }

    function removeProp(indexToRemove) {
        setProps(prevProps => prevProps.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div className='bg-gray-200 p-2 rounded-md mb-2'>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className='inline-flex p-1 border-0 justify-start'
                type="button"
            >
                {isOpen ? <ChevronUp /> : <ChevronDown />}
                <span>{name}</span>
                <span>({props.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props.length > 0 ? (
                    props.map((size, index) => (
                        <div className='flex items-end gap-2' key={index}>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder='Size name'
                                    value={size.name}
                                    onChange={ev => editProp(ev, index, 'name')}
                                />
                            </div>
                            <div>
                                <label>Extra price</label>
                                <input
                                    type="text"
                                    placeholder='Extra price'
                                    value={size.price}
                                    onChange={ev => editProp(ev, index, 'price')}
                                />
                            </div>
                            <div>
                                <button
                                    onClick={() => removeProp(index)}
                                    className='bg-white mb-2 px-2'
                                >
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No properties added yet.</p>
                )}
                <button
                    type='button'
                    onClick={addProp}
                    className='bg-white'
                >
                    <Plus />
                    <span>{addLable}</span>
                </button>
            </div>
        </div>
    )
}
