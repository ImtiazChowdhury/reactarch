import { useEffect, useState } from "react";

export default function useFetch(fn){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);


    async function load(){
        setLoading(true);
        setData(await fn());
        setLoading(false);
    }

    useEffect(()=>{
        console.log(typeof fn)
        load();

    }, [])

    return {
        loading, data
    }

}