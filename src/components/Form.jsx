import { Fragment, useState } from 'react'
import { BRANDS, YEARS, PLANS } from '../constants/index'
import useQuoting from '../hooks/useQuoting'
import Error from './Error'
import { getYearsDifference, calculateBrand, calculatePlan, formatToMoney }  from '../helpers/index' 

const Form = () => {
    const { handleChange, data, error, setError, setResult, setLoading } = useQuoting();
    const quoteInsurance = () => {
        // Base price
        let result = 2000;
        // Get the difference of years
        let difference = getYearsDifference(data.year);
        // For each year substract 3%
        result -= result * difference * 3 / 100;
        // American 15%
        // European 30%
        // Asian 5%
        result *= calculateBrand(data.brand);
        // Basic +20%
        // Complete +50%
        result *= calculatePlan(data.plan).toFixed(2);
        // Formating to money
        result = formatToMoney(result);
        // Saving result
        setLoading(true);
        setResult(result);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(Object.values(data).includes('')) {
            setError('All fields are required');
            return;
        }
        setError('');
        quoteInsurance();
    }

    return (
        <>
            {error && <Error />}
            <form
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label htmlFor="brand" className="block mb-3 font-bold text-gray-400 uppercase">Brand</label>
                    <select 
                        name="brand" 
                        id="brand"
                        className="w-full bg-white border border-gray-200 p-3"
                        onChange={handleChange}
                        value={data.brand}
                    >
                        <option value="">--- Select Brand ---</option>
                        {BRANDS.map(brand => (
                            <option 
                                key={brand.id}
                                value={brand.id}
                            >{brand.name}</option>
                        ))}
                    </select>
                </div>
                <div className="my-5">
                    <label htmlFor="year" className="block mb-3 font-bold text-gray-400 uppercase">Year</label>
                    <select 
                        name="year" 
                        id="year"
                        className="w-full bg-white border border-gray-200 p-3"
                        onChange={handleChange}
                        value={data.year}
                    >
                        <option value="">--- Select Year ---</option>
                        {YEARS.map(year => (
                            <option 
                                key={year}
                                value={year}
                            >{year}</option>
                        ))}
                    </select>
                </div>
                <div className="my-5">
                    <label htmlFor="brand" className="block mb-3 font-bold text-gray-400 uppercase">Choose your Plan</label>
                    <div className="flex gap-6 items-center">
                        {PLANS.map(plan => (
                            <Fragment key={plan.id}>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="plan" 
                                        id={plan.id}
                                        onChange={handleChange}
                                        value={plan.id}
                                    />
                                    <label htmlFor={plan.id} className="ml-2">{plan.name}</label>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                    <input type="submit" value="Quote" className='w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold mt-5' />
                </div>
            </form>
        </>
    )
}

export default Form
