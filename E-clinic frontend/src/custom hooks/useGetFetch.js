import { useEffect, useRef, useState } from "react";

const useGetFetch = (url) => {
    const [data, setdata] = useState(null);
    const [IsPending, setIsPending] = useState(false);
    const [err, seterr] = useState(null);
    const ok = useRef(true);

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    useEffect(() => {
        const abortCont = new AbortController()
        console.log("fetch")
        setIsPending(true)
        seterr(null)
        const urll = "http://localhost:8000"+url
        setTimeout(() => {
            fetch(urll, { signal: abortCont.signal ,headers:{
                Authorization: "Token " + getCookie("token")?.trim()
            }})
                .then(res => {
                    console.log(res)
                    if (!res.ok) {
                        ok.current = false
                    }
                    else {
                        ok.current = true
                    }
                    return res.json();
                })
                .then(d => {
                    if (!ok.current) {
                        throw Error(JSON.stringify(d));
                    }

                    else {
                        setdata(d);
                        setIsPending(false)
                    }

                })
                .catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('fetch aborted',urll);
                    }
                    else{
                        seterr(error.message)
                        setIsPending(false)
                    }
                    
                })
        }, 0);
        

        return (() =>abortCont.abort())
    }, [url]);
    return { data, setdata, IsPending, err }
}


export default useGetFetch;