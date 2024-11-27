'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTaps({isAdmin}) {
    const path = usePathname()
    return (
        <div className=" flex mx-auto gap-2 tabs justify-center" >
        <Link 
            className={path === '/profile' ? 'active' : ''}  
            href={'/profile'}
        >
            Profile
        </Link>
        {isAdmin &&(
            <>
                <Link 
                    href={'/categoreis'}
                    className={path === '/categoreis' ? 'active' : ''}
                >
                    Categoreis
                </Link>

                <Link 
                    href={'/menu-items'}
                    className={path.includes('menu-items') ? 'active' : ''}
                >
                    Menu Items
                </Link>
                <Link 
                    href={'/users'}
                    className={path === '/users' ? 'active' : ''}
                >
                    Users
                </Link>
            </>
        )}
    </div>
    )
}