'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "../../AppContext";
import ShoppingCart from '../icons/Cart';

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <nav className="bg-white border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-primary">
            CAFETERIA <span className="text-green-700">O.I</span>
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={menuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu Items */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full  md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex lg:items-center md:items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link onClick={() => setMenuOpen(false)} href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setMenuOpen(false)} href="/menu" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0">
                Menu
              </Link>
            </li>
            <li>
              <Link onClick={() => setMenuOpen(false)} href="/#about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0">
                About
              </Link>
            </li>
            <li>
              <Link onClick={() => setMenuOpen(false)} href="/#contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0">
                Contact
              </Link>
            </li>

            {/* Authentication buttons */}
            {status === 'authenticated' && (
              <>
                <li>
                  <Link onClick={() => setMenuOpen(false)} href="/profile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0">
                    Hello {userName}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="block py-2 px-3 bg-primary text-white rounded-full hover:bg-primary-dark md:bg-primary md:hover:bg-primary-dark md:text-white md:rounded-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {status === 'unauthenticated' && (
              <>
                <li>
                  <Link onClick={() => setMenuOpen(false)}  href="/login"  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0">
                    Login
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setMenuOpen(false)} href="/register" className="block py-2 px-3 bg-primary text-white rounded-full hover:bg-primary-dark md:bg-primary md:hover:bg-primary-dark md:text-white md:rounded-full">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Cart icon */}
            <li>
              <Link href="/cart" className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0">
                <ShoppingCart />
                {cartProducts.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-primary text-white text-xs px-1 rounded-full">
                    {cartProducts.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}