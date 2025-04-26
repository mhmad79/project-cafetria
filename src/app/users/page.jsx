'use client'
import { useEffect, useState } from 'react'
import { useProfile } from '../../components/layout/UseProfile/useProfilee'
import UserTaps from '../../components/layout/UserTaps/UserTaps'
import Link from 'next/link'

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const users = await response.json();
                setUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (!data.admin) {
        return <p>You are not an admin</p>;
    }

    return (
        <section className='mt-8 mx-auto max-w-2xl'>
            <UserTaps isAdmin={true} />
            <div className='mt-8'>
                {users.length > 0 ? (
                    users.map(user => (
                        <div className='bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4' key={user._id}>
                            <div className='grid grid-cols-2 md:grid-cols-3 grow gap-4'>
                                <div className='text-gray-900'>
                                    {user.name ? (
                                        <span>{user.name}</span>
                                    ) : (
                                        <span className='italic'>No name</span>
                                    )}
                                </div>
                                <span className='text-gray-500'>{user.email}</span>
                            </div>
                            <div>
                                <Link className='button' href={`/users/${user._id}`}>
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </section>
    );
}
