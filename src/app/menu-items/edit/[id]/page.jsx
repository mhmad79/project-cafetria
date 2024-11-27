'use client'
import { useEffect, useState } from 'react'
import { useProfile } from '../../../../components/layout/UseProfile/UseProfile'
import UserTaps from '../../../../components/layout/UserTaps/UserTaps'
import EditableImage from '../../../../components/layout/EditableImage/EditableImage'
import toast from 'react-hot-toast'
import Link from 'next/link'
import IconLeft from '../../../../components/layout/icons/left'
import {redirect, useParams} from "next/navigation";

    export default function EditMenuItemPage () {
    const {id} = useParams()
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [rediectTolItems, setRediectToItems] = useState(false)
    const {loading, data} = useProfile()

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
          res.json().then(items => {
            const item = items.find(i => i._id === id);
                setImage(item.image)
                setName(item.name)
                setDescription(item.description)
                setPrice(item.price)
          });
        })
      }, []);
    
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data = {image, name, description, price,};
        const saveingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type' : 'application/json'}
            })
            if (response.ok) 
                resolve();
            else 
                reject()
            
        })
        await toast.promise(saveingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error',
        });
        setRediectToItems(true)
    }

    if(rediectTolItems) {
        return redirect('/menu-items')
    }

    if (loading) {
        return 'Loding user info...'
    }

    if (!data.admin) {
        return 'Not an admin.'
    }

    return (
        <section className=' mt-8'>
            <UserTaps isAdmin={true} />
            <div className='max-w-md mx-auto mt-8'>
                <Link 
                    className='button'
                    href={'/menu-items'}>
                        <IconLeft />
                    <span>Sho all menu items</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className=' mt-8 max-w-md mx-auto'>
                <div className=' grid items-start gap-4'
                style={{gridTemplateColumns: '.3fr  7.fr'}}>
                    <div className=''>
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
                        <button type='submit'>Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}