'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../AppContext";
import ShoppingCart from '../icons/Cart'
export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext)
  if(userName && userName.includes(' ')) {
    userName = userName.split(' ')[0]
  }

    return (
  <>
    <header className=" items-center flex justify-between">
      <nav className=" flex items-center gap-4 text-gray-600 font-semibold  ">
       
      <Link href='/' className=" mr-3 text-primary font-semibold text-2xl" >
        CAFETERIA   <span className=" text-green-700">O.I</span>
      </Link> 
      <Link href={'/'}>Home</Link>
      <Link href={'/menu'}>Menu</Link>
      <Link href={'/#about'}>About</Link>
      <Link href={'/#contact'}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
      {status === 'authenticated' && (
      <>
      <Link className=" whitespace-nowrap" href={'/profile'}>
        Hello {userName}
      </Link>
          <button  
            onClick={() => signOut()}
            className=" bg-primary rounded-full text-white px-8 py-2">
            Logout
        </button>
      </>
        )}
      {status === 'unauthenticated' && (
          <>
              <Link href={'/login'}>Login</Link>
              <Link href={'/register'} className=" bg-primary rounded-full text-white px-8 py-2">
                Register
              </Link>
          </>
        )}
        <Link href={'/cart'} className=" relative">
          <ShoppingCart /> 
          <span className=" absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3"> {cartProducts.length}</span>
        </Link>
      </nav>
    </header>
        </>
    )
}