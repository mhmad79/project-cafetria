'use client'
import { useEffect, useState } from 'react'
import UserTaps from '../../../../components/layout/UserTaps/UserTaps'
import toast from 'react-hot-toast'
import Link from 'next/link'
import IconLeft from '../../../../components/layout/icons/left'
import { redirect, useParams } from "next/navigation";
import MenuItemForm from '../../../../components/layout/MenuItemForm/MenuItemForm'
import { useProfile } from '../../../../components/layout/UseProfile/useProfile'

export default function EditMenuItemPage() {
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const { loading, data } = useProfile();

    useEffect(() => {
        if (!id) return;
        setLoadingData(true);
        fetch('/api/menu-items')
            .then(res => res.json())
            .then(items => {
                const item = items.find(i => i._id === id);
                if (item) {
                    setMenuItem(item);
                } else {
                    setMenuItem(null);
                }
            })
            .catch(err => console.error("خطأ في جلب البيانات:", err))
            .finally(() => setLoadingData(false)); 
    }, [id]);

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = { ...data, _id: id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) 
                resolve();
            else 
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (!data.admin) {
        return <p>Not an admin.</p>;
    }

    if (loadingData) {
        return <p>جارٍ تحميل بيانات العنصر...</p>;
    }

    return (
        <section className='mt-8'>
            <UserTaps isAdmin={true} />
                <div className='max-w-md mx-auto mt-8'>
                    <Link className='button' href={'/menu-items'}>
                        <IconLeft />
                        <span>Show all menu items</span>
                    </Link>
                </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
        </section>
    );
}