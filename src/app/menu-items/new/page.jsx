'use client'
import { useState } from 'react'
import UserTaps from '../../../components/layout/UserTaps/UserTaps'
import toast from 'react-hot-toast'
import Link from 'next/link'
import IconLeft from '../../../components/layout/icons/left'
import {redirect} from "next/navigation";
import MenuItemForm from '../../../components/layout/MenuItemForm/MenuItemForm'
import { useProfile } from '../../../components/layout/UseProfile/useProfilee'
export default function NewMenuIremPage() {

    
    const [rediectTolItems, setRediectToItems] = useState(false)
    const {loading, data} = useProfile()

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        console.log("🔵 Data before POST:", data);

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
            <div className='max-w-2xl mx-auto mt-8'>
                <Link 
                    className='button'
                    href={'/menu-items'}>
                        <IconLeft />
                    <span>Sho all menu items</span>
                </Link>
            </div>
                <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    )
}