import { useEffect, useState } from "react";
const useDeleteFetch = () => {

    const [data, setdata] = useState(null);
    const [IsPending, setIsPending] = useState(false);
    const [err, seterr] = useState(null);
    const [abortCont] = useState(new AbortController())
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
    function DeleteFetch(url, body) {
        console.log("DELETE2")
        setIsPending(true)
        seterr(null)
        const urll = "http://localhost:8000" + url
        setTimeout(() => {
            fetch(urll, {
                method: 'DELETE', 
                headers: { Authorization: "Token " + getCookie("token")?.trim() },
                credentials: 'include',
                body: body,
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
                        console.log('fetch aborted');
                    }
                    else {
                        seterr(error.message)
                        setIsPending(false)
                    }
                })
        }, 1000);

    }
    return { data, IsPending, err, DeleteFetch }

}

export default useDeleteFetch;