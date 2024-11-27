'use client'
import { useEffect, useState } from 'react'
import UserTaps from '../../components/layout/UserTaps/UserTaps'
import toast from 'react-hot-toast';
import {useProfile} from '../../components/layout/UseProfile/useProfile'
export default function CategoreisPage() {

    const [CategoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([]);
    const [editCategories, setEditCategories] = useState(null)
    const {data:profileData, loading:profileLoading} = useProfile()

    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    async function handleCategorySuvmit(e) {
        e.preventDefault()
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = {name: CategoryName};
            if(editCategories) {
                data._id = editCategories._id;
            }
            const response = await fetch('/api/categories', {
                method: editCategories ?  'PUT': 'POST'  , 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('')
            fetchCategories();
            setCategories(null)
            if (response.ok) 
                resolve();
            else
                reject()
            
        });
        await toast.promise(creationPromise, {
            loading: editCategories 
                        ? 'Updeting category...' 
                        : 'Creating your new category...',
            success: editCategories 
                        ? 'Category updated'
                        :'Category created',
            error: 'Error, sorry...'
        })
    }

    if(profileLoading) {
        return 'Loading user info...'
    }

    if(!profileData.admin) {
        return 'Not an admin';
    }
    
    return (

        <section className=' mt-8 mx-auto max-w-md'>        
            <UserTaps isAdmin={true} />
        <form className='mt-8' onSubmit={handleCategorySuvmit}>
            <div className=' flex gap-2 items-end'>
                <div className=' grow'>
                    <label>
                        {editCategories ? 'update cate' : 'New category name'}
                        {editCategories && (
                            <>
                                : <b>{editCategories.name}</b>
                            </>
                        )}
                    </label>
                    <input type="text"
                        value={CategoryName}
                        onChange={e => setCategoryName(e.target.value)}
                     />    
                </div>
                <div className='pb-2'>
                    <button className='border border-primary' type='submit'>
                        {editCategories ? 'update': 'Create'}
                    </button>
                </div>
            </div> 
        </form>
        <div>
            <h2 className=' mt-8 text-sm text-gray-500'>Edit category</h2>
            {categories?.length > 0 && categories.map(c => (
                <button
                    onClick={() => {
                        setEditCategories(c);
                        setCategoryName(c.name)
                    }} 
                    className='bg-gray-200 rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1'>
                    <span className=' text-gray-500'>edit category: </span>
                    <span>{c.name}</span>
                </button>
            ))}
        </div>
    </section>
    )
} 