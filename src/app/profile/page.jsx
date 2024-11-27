'use client'
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTaps from '../../components/layout/UserTaps/UserTaps'
import EditableImage from './../../components/layout/EditableImage/EditableImage'
export default function ProfilePage () {
    const session = useSession();
    
    const [userName, setUserName] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)
    const {status} = session;

    useEffect(() => {
        if(status === 'authenticated') {
            setUserName(session.data.user.name)
            setImage(session.data.user.image)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUserName(data.name)
                    setImage(data.image)
                    setPhone(data.phone) 
                    setIsAdmin(data.admin)
                    setProfileFetched(true)
                    console.log(data);
                    
                })
            })
        }
    }, [session ,status])

    async function handleProfileInfoUbdate(ev) {
        ev.preventDefault();
            const savingPromise = new Promise(async (resolve, reject) => {
                const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name:userName,
                    image,
                    phone,
                }),
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
           
            <UserTaps isAdmin={isAdmin} />
            <div className="max-w-md mx-auto mt-8">
                
               
                <div className=" flex gap-4">
                    <div>
                        <div className=" p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage  setLink={setImage} link={image}/>
                        </div>
                    </div>
                    <form className=" grow" onSubmit={handleProfileInfoUbdate}>
                        <label>First and last name</label>
                        <input 
                            type="text" 
                            placeholder="First and last name" 
                            value={userName} 
                            onChange={ev => setUserName(ev.target.value)}
                            />
                        <label>Email</label>
                        <input 
                            type="email" 
                            disabled={true} 
                            value={session.data.user.email} 
                            placeholder="email"
                            />
                        <label>Phone</label>
                        <input 
                            type='tel' 
                            placeholder="Phone number"
                            value={phone} 
                            onChange={ev => setPhone(ev.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
    
}