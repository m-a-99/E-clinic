import { useEffect, useRef, useState } from "react";
const usePostFetch = () => {

    const [data, setdata] = useState(null);
    const [IsPending, setIsPending] = useState(false);
    const [err, seterr] = useState(null);
    const [abortCont] = useState(new AbortController())
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
        return () => {
            abortCont.abort();
        };
    }, [abortCont]);
    function post(url, body) {
        console.log("post2")
        setIsPending(true)
        seterr(null)
        const urll = "http://localhost:8000" + url
        setTimeout(() => {
            fetch(urll, {
                method: 'POST',
                headers: { Authorization: "Token " + getCookie("token")?.trim() },
                credentials: 'include',
                body: body,
                signal: abortCont.signal
            })
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

export default usePostFetch;