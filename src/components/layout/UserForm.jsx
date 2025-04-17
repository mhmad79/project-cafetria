'use client'
import { useState } from "react"
import EditableImage from './../../components/layout/EditableImage/EditableImage'
import { useProfile } from "./UseProfile/useProfile"


export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.name || '')
        const [image, setImage] = useState(user?.image || '')
        const [phone, setPhone] = useState(user?.phone || '')
        const [admin, setAdmin] = useState(user?.admin || false)
        const {data:loggedInUserData} = useProfile();
    return(
           
        <div className=" flex gap-4">
        <div>
            <div className=" p-2 rounded-lg relative max-w-[120px]">
                <EditableImage  setLink={setImage} link={image}/>
            </div>
        </div>
        <form 
            className=" grow" 
            onSubmit={ev => 
            onSave(ev, {name:userName, image, phone, admin})
            }
            >
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
                value={user.email} 
                placeholder="email"
                />
            <label>Phone</label>
            <input 
                type='tel' 
                placeholder="Phone number"
                value={phone} 
                onChange={ev => setPhone(ev.target.value)}
            />
            {loggedInUserData.admin && (
                <div>
                    <label
                        className="p-2 inline-flex items-center gap-2 mb-2"  
                        htmlFor="adminCb">
                        <input id="adminCb" type="checkbox" className="" value={'1'}
                            checked={admin}
                            onClick={ev =>  setAdmin(ev.target.checked) }
                        />
                        <span>Admin</span>
                    </label>
                </div>
            )}
     
            <button type="submit">Save</button>
        </form>
    </div>
    )
}