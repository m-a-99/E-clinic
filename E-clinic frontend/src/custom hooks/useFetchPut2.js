import { useEffect, useRef, useState } from "react";

const useFetchPut2 = () => {
    const [data, setdata] = useState(null);
    const [IsPending, setIsPending] = useState(true);
    const [err, seterr] = useState(null);
    const [abortCont] = useState(new AbortController())
    
    useEffect(() => {
        return () => {
            abortCont.abort();
        };
    }, []);
    function put(url,body) {
        console.log("put2")
        setIsPending(true)
        seterr(null)
        setTimeout(() => {
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body),
                signal: abortCont.signal
            })
                .then(res => {
                    console.log(res)
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(d => {
                    setdata(d);
                    setIsPending(false)
                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        // *** It seems odd that `isPending` isn't cleared here
                        console.log('fetch aborted');
                    }
                    else {
                        seterr(error.message)
                        setIsPending(false)
                    }

                })
        }, 0);

    }
    return { data, IsPending, err, put }

}

export default useFetchPut2;