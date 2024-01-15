import useQuoting from "../hooks/useQuoting"

const Error = () => {
    const { error } = useQuoting();
    return (
        <div className="border border-red-400 bg-red-100 py-3 text-red-700 text-center">
            <p>{error}</p>
        </div>
    )
}

export default Error
