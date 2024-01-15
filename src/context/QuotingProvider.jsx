import { createContext, useState } from 'react';


const QuotingContext = createContext();

const QuotingProvider = ({ children }) => {
    const [ data, setData ] = useState({
        brand: '',
        year: '',
        plan: ''
    });
    const [ error, setError ] = useState('');
    const [result, setResult] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }
    return (
        <QuotingContext.Provider value={{
            handleChange,
            data,
            error,
            setError,
            result,
            setResult,
            loading,
            setLoading
        }}>
            {children}
        </QuotingContext.Provider>
    );
}

export {
    QuotingProvider
}

export default QuotingContext;