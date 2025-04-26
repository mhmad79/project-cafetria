'use client'
import { useEffect, useState } from 'react'
import { useProfile } from '../../components/layout/UseProfile/useProfilee'
import UserTaps from '../../components/layout/UserTaps/UserTaps'
import Link from 'next/link'

export default function UsersPage() {

    const [users, setUsers] = useState([])
    const {loading, data} = useProfile()

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users)
                console.log(users.name);
                console.log(users.email);
                
            })
        })
    }, [])


    if(loading) {
        return 'Loading user info...';
    }

    if(!data.admin) {
        return 'Not an admin';
    }

    return (
        <section className=' mt-8 mx-auto max-w-2xl'>
            <UserTaps isAdmin={true} />
            <div className='mt-8'>
                {users?.length > 0 && users.map(user => {
                    return (

                        <div className='bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4'>
                        <div className=' grid grid-cols-2 md:grid-cols-3 grow gap-4'>
                            <div className='text-gray-900'>
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className=' italic'>No name</span>)}
                            </div>
                            <span className=' text-gray-500'>{user.email}</span>
                        </div>
                        <div>
                            <Link className='button' href={'/users/'+user._id}>
                                Edite
                            </Link>
                        </div>
                    </div>
            )
                })}
            </div>
            
        </section>
    )
}