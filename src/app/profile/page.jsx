'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTaps from '../../components/layout/UserTaps/UserTaps'
import UserForm from '../../components/layout/UserForm'
export default function ProfilePage () {
    const session = useSession();

    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)
    const {status} = session;

    useEffect(() => {
        if(status === 'authenticated') {
          
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                   setUser(data)
                    setProfileFetched(true)
                    console.log(data);
                    
                })
            })
        }
    }, [session ,status])

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
            const savingPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data),
            });
            if(response.ok) 
                resolve()
            else 
            reject()
        })

            await toast.promise(savingPromise, {
                loading: 'Saving...',
                success: 'Profile saved!',
                error: 'Error',
            });
        }
        
        
        
        
        if(status === 'loading' || !profileFetched) {
            return ('Loading......')
        }
        
        
        if(status === 'unauthenticated') {
        return redirect('/login')
        
    }
    
    // const userImage = session.data.user.image;
    
    return (
        <section className=" mt-8">
           
            <UserTaps isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">    
                <UserForm user={user}  onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    )
    
}