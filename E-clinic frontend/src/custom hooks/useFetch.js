import { useEffect, useRef, useState } from "react";
const useFetch = () => {

    const [data, setdata] = useState(null);
    const [IsPending, setIsPending] = useState(false);
    const [err, seterr] = useState(null);
    const [abortCont] = useState(new AbortController())
    const ok = useRef(true);

    useEffect(() => {
        return () => {
            abortCont.abort();
        };
    }, [abortCont]);
    function post(url, body,type,method) {
        let options;
        if (type==="json"){
            options = {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
                signal: abortCont.signal
            }
        }
        else{
            options = {
                method: method,
                credentials: 'include',
                body: body,
                signal: abortCont.signal
            }
        }
        console.log("post2")
        setIsPending(true)
        seterr(null)
        const urll = url
        setTimeout(() => {
            fetch(urll, options)
                .then(res => {
                    console.log(res)
                    if (!res.ok) {
                        ok.current=false
                    }
                    else {
                        ok.current=true
                    }

                    return res.json();
                })
                .then(d => {
                    if (!ok.current){
                        throw Error(JSON.stringify(d));
                    }
                        
                    else {
                        setdata(d);
                        setIsPending(false)
                    }

                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('fetch aborted');
                    }
                    else {
                        console.log(error.message)
                        seterr(error.message)
                        setIsPending(false)

                    }

                })
        }, 0);

    }
    return { data, IsPending, err, post }

}

export default useFetch;