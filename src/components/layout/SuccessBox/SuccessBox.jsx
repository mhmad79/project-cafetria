export default function SuccessBox({children}) {
    return (
        <div className="text-center text-primary bg-green-100 p-4 rounded-lg border border-blue-300">
            {children}
        </div>
    )
}