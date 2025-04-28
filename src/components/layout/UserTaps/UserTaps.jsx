'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTaps({ isAdmin }) {
  const path = usePathname();

  return (
    <div className="flex flex-wrap gap-2 justify-center mx-auto p-2">
      <Link
        className={`px-4 py-2 rounded-full text-sm ${path === '/profile' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
        href={'/profile'}
      >
        Profile
      </Link>

      {isAdmin && (
        <>
          <Link
            href={'/categoreis'}
            className={`px-4 py-2 rounded-full text-sm ${path === '/categoreis' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Categories
          </Link>

          <Link
            href={'/menu-items'}
            className={`px-4 py-2 rounded-full text-sm ${path.includes('menu-items') ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Menu Items
          </Link>

          <Link
            href={'/users'}
            className={`px-4 py-2 rounded-full text-sm ${path.includes('/users') ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Users
          </Link>

          <Link
            href={'/orders'}
            className={`px-4 py-2 rounded-full text-sm ${path === '/orders' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Orders
          </Link>
        </>
      )}
    </div>
  );
}