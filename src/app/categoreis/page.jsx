'use client'
import { useEffect, useState } from 'react'
import UserTaps from '../../components/layout/UserTaps/UserTaps'
import toast from 'react-hot-toast';
import {useProfile} from '../../components/layout/UseProfile/useProfilee'
import DeleteButton from '../../components/DeleteButton';
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

    async function handerDeleteCliek(_id){

        const promise = new Promise(async (resolve, reject) => {
             const response = await fetch('/api/categories?_id='+_id, {
                method: "DELETE",
            })
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        
        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
        })

        fetchCategories()

        }
        
    if(profileLoading) {
        return 'Loading user info...'
    }

    if(!profileData.admin) {
        return 'Not an admin';
    }
    
    return (

        <section className=' mt-8 mx-auto max-w-2xl'>        
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
                <div className='pb-2 flex items-center gap-2'>
                    <button className='border border-primary' type='submit'>
                        {editCategories ? 'update': 'Create'}
                    </button>
                    <button type='button'  onClick={() => {
                        setEditCategories(null)
                        setCategoryName('')
                        }}>
                            Cancel</button>
                </div>
            </div> 
        </form>
        <div>
            <h2 className=' mt-8 text-sm text-gray-500'>Existing categories</h2>
            {categories?.length > 0 && categories.map(c => (
                <div
                   
                    className=' bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center'>
                    <div className=' grow ' 
                        >{c.name}
                    </div>
                    <div className='flex gap-1'> 
                        <button type="button"onClick={() => {
                            setEditCategories(c);
                            setCategoryName(c.name)
                        }}>Edit</button>
                        <DeleteButton 
                            label={'Delete'}
                            onDelete={() => handerDeleteCliek(c._id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    </section>
    )
} 