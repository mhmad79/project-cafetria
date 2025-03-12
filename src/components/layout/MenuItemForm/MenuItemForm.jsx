import EditableImage from '../../../components/layout/EditableImage/EditableImage'
import {useState} from "react"

export default function MenuItemForm({onSubmit, menuItem}) {

    const [image, setImage] = useState(menuItem?.image || '')
    const [name, setName] = useState(menuItem?.name || '')
    const [description, setDescription] = useState(menuItem?.description || '')
    const [price, setPrice] = useState(menuItem?.price || '')
    const [sizes, setSizes] = useState([])
    function addSize() {
        setSizes(oldSizes => {
            return [...oldSizes, {name: '' , price: 0}];
        })
    }

    return (
        <form 
            onSubmit={ ev => onSubmit(ev, {image,name,description,price})} 
            className=' mt-8 max-w-md mx-auto'>
        <div className="md:grid items-start gap-4"
            style={{gridTemplateColumns:'.3fr .7fr'}}>
            <div>
               <EditableImage link={image} setLink={setImage} />
            </div>
            <div className='grow'>
                <label>Item name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                <label>Description</label>
                    <input 
                        type="text" 
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />
                <label>Base price</label>
                    <input 
                        type="text" 
                        value={price}
                        onChange={ev => setPrice(ev.target.value)}
                    />
                    <div className=' bg-gray-200 p-2 rounded-md mb-2'>
                        <label>Sizes</label>
                        {sizes?.length > 0 && sizes.map((size, index,) => (
                            <div className=' flex gap-2'>
                               <div>
                                    <label>Size name</label>
                                    <input type="text" 
                                            placeholder='Size name' 
                                            value={size.name}
                                            onChange={ev => editSize(ev, index, 'name')}
                                            />
                               </div>
                                <div>
                                    <label>Extra price</label>
                                    <input type='text' 
                                            placeholder='Extra price' 
                                            value={size.price}
                                            onChange={ev => editSize(ev, index, 'price')}
                                            />
                                </div>
                            </div>
                        ))}
                        <button 
                            type='button'
                            onClick={addSize}
                            className=' bg-white'> Add item size</button>
                    </div>
                <button type='submit'>Save</button>
            </div>
        </div>
    </form>
    )
}