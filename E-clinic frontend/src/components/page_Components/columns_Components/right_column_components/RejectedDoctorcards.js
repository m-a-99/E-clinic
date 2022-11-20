import { useCallback, useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import PendingDoctorCard from "./components/PendingDoctorCard";

const RejectedDoctorcards = () => {
    const [doctors,setdoctors] =useState([])


    const [page, setpage] = useState(1);
    const [url, seturl] = useState("/get/doctors/?status=0&page=1");
    const hasnext = useRef(true);

    const { data, IsPending, err } = useGetFetch(url);
    useEffect(() => {
        seturl("/get/doctors/?status=0&page=" + page);

    }, [page])

    useEffect(() => {
        if (data) {
            setdoctors(doctors => [...doctors, ...data.results]);
            if (!data.next) {
                hasnext.current = false;
            }
        }
    }, [data, setdoctors])


    const [lastElement, setlastElement] = useState(null);

    const handle = useCallback(() => {
        if (hasnext.current) {
            setpage(page => page + 1);
        }
    }, [setpage])

    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: 0
        }
    }, [])
    const handleIntersect = useCallback((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                handle()
                console.log("intersct")
            }
        });
    }, [handle])
    const observer = useRef(new IntersectionObserver(handleIntersect, options));

    useEffect(() => {
        if (lastElement) {
            observer.current.disconnect();
            observer.current = new IntersectionObserver(handleIntersect, options);
            observer.current.observe(lastElement);
        }
    }, [lastElement, handleIntersect, options]);


    return (
        <div className="w3-container w3-card  w3-round w3-margin" style={{ padding: "0px 25px 0 25px" }}>
            {
                (()=>{
                    let tmp=[]
                    for (let i = 0; i < doctors.length; i+=3) {

                        if (i === doctors.length - 1) {

                            tmp.push( <div ref={setlastElement} key={doctors[i].id}>

                                <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
                                    <PendingDoctorCard doctor={doctors[i]} />
                                    {(i+1<=doctors.length - 1)&& <PendingDoctorCard doctor={doctors[i+1]} />}
                                    {(i +2 <= doctors.length - 1) && <PendingDoctorCard doctor={doctors[i + 2]} />}
                                </div>
                            </div>)

                        }
                        else {
                            tmp.push( <div key={doctors[i].id}>

                                <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
                                    <PendingDoctorCard doctor={doctors[i]} />
                                    {(i + 1 <= doctors.length - 1) && <PendingDoctorCard doctor={doctors[i + 1]} />}
                                    {(i + 2 <= doctors.length - 1) && <PendingDoctorCard doctor={doctors[i + 2]} />}

                                </div>
                            </div>)
                        }
                    }
                    return tmp

                })()  
            }
            {IsPending && <h4 className='w3-center'>Loadding...</h4>}
            {err && <>{err}</>}
        </div>
    );
  
           
            
           
}

export default RejectedDoctorcards;