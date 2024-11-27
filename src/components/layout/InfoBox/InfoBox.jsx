export default function InfoBox({children}) {
    return (
        <div className="text-center text-primary bg-blue-100 p-4 rounded-lg border border-green-300">
            {children}
        </div>
    )
}