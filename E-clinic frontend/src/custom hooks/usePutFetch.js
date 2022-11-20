import { useEffect, useState } from "react";
const usePutFetch = () => {

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
    function put(url, body) {
        console.log("put2")
        setIsPending(true)
        seterr(null)
        const urll = "http://localhost:8000"+url
        setTimeout(() => {
            fetch(urll, {
                method: 'PUT',
                headers: {  Authorization: "Token " + getCookie("token")?.trim() },
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
    return { data, setdata,IsPending, err, put }

}

// const usePutFetch = (url, body,sig,sig1) => {
//     const [data, setdata] = useState(null);
//     const [IsPending, setIsPending] = useState(true);
//     const [err, seterr] = useState(null);
//     useEffect(() => {
//         const abortCont = new AbortController()
//         console.log("fetch")
//         setIsPending(true)
//         seterr(null)
//         if (sig.current!==0)
//         setTimeout(() => {
//             fetch(url, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify(body),
//                 signal: abortCont.signal
//             })
//                 .then(res => {
//                     console.log(res)
//                     if (!res.ok) {
//                         throw Error('could not fetch the data for that resource');
//                     }
//                     return res.json();
//                 })
//                 .then(d => {
//                     setdata(d);
//                     setIsPending(false)
//                 })
//                 .catch(error => {
//                     if (error.name === 'AbortError') {
//                         // *** It seems odd that `isPending` isn't cleared here
//                         console.log('fetch aborted');
//                     }
//                     else{
//                         seterr(error.message)
//                     setIsPending(false)
//                     }

//                 })
//         }, 3000);
//         sig.current=0;
//         return (() => abortCont.abort())
//     }, [url,body,sig,sig1]);
//     return { data, setdata, IsPending, err }

// }
export default usePutFetch;