'use client'
import UserTaps from "../../../components/layout/UserTaps/UserTaps";
import { useProfile } from "../../../components/layout/UseProfile/useProfilee";
import UserForm from "../../../components/layout/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const { loading, data } = useProfile();
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch('/api/users');
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const users = await res.json();
                const foundUser = users.find(u => u._id === id);
                setUser(foundUser);
            } catch (error) {
                console.error('Error fetching users:', error);
                setUser(null); // وضع القيمة الافتراضية للمستخدم في حالة حدوث خطأ
            }
        };

        fetchUserData();
    }, [id]); // تأكد من أن الـ id يتم تحديثه بشكل صحيح

    const handleSaveButtonClick = async (ev, data) => {
        ev.preventDefault();
        try {
            const res = await fetch('/api/profile', {
                method: "PUT",
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });
            if (res.ok) {
                toast.success('User saved');
            } else {
                throw new Error('Failed to save user');
            }
        } catch (error) {
            toast.error('An error has occurred while saving the user');
            console.error(error);
        }
    };

    if (loading) {
        return <p>Loading user profile...</p>;
    }

    if (!data.admin) {
        return <p>You are not an admin</p>;
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
