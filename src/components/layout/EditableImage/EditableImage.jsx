import Image from "next/image";
import { loadEnvFile } from "process";
import toast from "react-hot-toast";

export default function EditableImage({link, setLink}) {

    async function handelFileChange(ev) {
        const files = ev.target.files;

        if(files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            const uploadPromise = fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                }).then(response => {
                    if (response.ok) {
                        return response.json().then(link => {
                            setLink(link);
                        });
                    } 
                    throw new Error('Something went wrong');
                });

                await toast.promise(uploadPromise, {
                    loading: 'Uploading...',
                    success: 'Upload complete',
                    error: 'Upload error',
                })
        }
    }
    return (
        <>
            {link && (
                    <Image className=" rounded-lg w-full h-full mb-1" 
                    src={link} alt="avatar" 
                    width={250} height={250}
                     />
                 )}
                 {!link && (
                    <div className=" text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                        No image
                    </div>
                 )}

                 
            <label className=" text-center">
                    <input type="file" className=" hidden" onChange={handelFileChange}/>
                    <span className=" text-center block border p-2 cursor-pointer rounded-lg ">Edit</span>
            </label>
        </>
    )
}