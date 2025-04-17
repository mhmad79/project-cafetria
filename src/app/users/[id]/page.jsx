'use client'
import UserTaps from "../../../components/layout/UserTaps/UserTaps";
import { useProfile } from "../../../components/layout/UseProfile/useProfile";
import UserForm from "../../../components/layout/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function EditUserPage() {
    const {loading, data} = useProfile();
    const [user, setUser] = useState(null)
    const {id} = useParams();

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
            const user =  users.find(u => u._id === id );
                setUser(user);
            })
        })
    }, [])

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: "PUT",
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({...data,_id:id})
            });
            if(res.ok)
                resolve()
            else 
                reject()
        })
            await toast.promise(promise, {
                loading: 'Saving user...',
                success: 'User saved',
                error: 'An error has occurred while saving the user',
            })
        }

    if(loading) {
        return 'Loading user profile...'
    }

    if(!data.admin) {
        return 'Not an admin'
    }
    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTaps isAdmin={true} />
            <div className="mt-8">
            {user ? (
                <UserForm user={user} onSave={handleSaveButtonClick} />
            ) : (
                <p>Loading user data...</p>
            )}
            </div>

        </section>
    );
}