'use client';
import { useProfile } from '../../components/layout/UseProfile/useProfilee'
import UserTaps from '../../components/layout/UserTaps/UserTaps'
import IconRight from "../../components/layout/icons/Right";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {

  const [menuItems, setMenuItems] = useState([]);
  const {loading, data} = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
      });
    })
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTaps isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex"
          href={'/menu-items/new'}>
            <span>Crete new menu item</span>
          <IconRight />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/'+item._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative flex flex-col items-center">
                <Image
                  className="rounded-md h-44"
                  src={item.image} alt={''} width={200} height={200} />
              <div className="text-center">
                {item.name}
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}