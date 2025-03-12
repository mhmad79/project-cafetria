'use client';
import {  useState } from "react";
import Image from "next/image"
import { signIn } from 'next-auth/react' ;


export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(false)
    
    async function handleFormSubmit(ev) {
        ev.preventDefault();

        setLoginInProgress(true)

        await signIn('credentials' , {email, password, callbackUrl: '/'} )
            
        
        
        setLoginInProgress(false)

    } 
    return (
        <section className=" mt-8 ">
        <h1 className=" text-center text-4xl mb-3 text-primary" >
            Login
        </h1>
      
        <form className=" block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" name="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={loginInProgress} />
            <input type="password" name="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={loginInProgress} />
            <button type="submit" disabled={loginInProgress}  placeholder="submit" >Login</button>
            <div className=" my-4 text-gray-500 text-center">
                or login with provider
            </div>
            <button
                type="button" 
                onClick={() => signIn('google', {callbackUrl: '/'}  )  }  
                className=" flex gap-4 justify-center" >
                <Image src={'/google-icon.png'} alt={"google"} width={24} height={24} />
                Login with Google
            </button>
            </form>
        </section>
    )
}