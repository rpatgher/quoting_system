import { useMemo, useRef } from "react";
import useQuoting from "../hooks/useQuoting";
import { BRANDS, PLANS } from "../constants";


const Result = () => {
    const { result, data } = useQuoting();
    const { brand, year, plan } = data;
    if(result === 0) return null;
    const [brandName] = useMemo( () =>
        BRANDS.filter(m => m.id === Number(brand))
    , [result]);
    const [planName] = useMemo( () =>
        PLANS.filter(p => p.id === Number(plan))
    , [result]);
    const yearRef = useRef(year);

    return (
        <div className="bg-gray-100 text-center mt-5 p-5 shadow">
                <h2 className="text-gray-600 font-black text-3xl ">Overview</h2>
                <p className="my-2">
                    <span className="font-bold">Brand: </span> 
                    {brandName.name}
                </p>
                <p className="my-2">
                    <span className="font-bold">Plan: </span> 
                    {planName.name}
                </p>
                <p className="my-2">
                    <span className="font-bold">Year: </span> 
                    {yearRef.current}
                </p>
                <p className="my-2 text-2xl">
                    <span className="font-bold">Total: </span> 
                    {result}
                </p>
        </div>
    )
}

export default Result
