import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import QuestionsLeftColumnSpetialiestCard from "../../columns_Components/left_column_components/QuestionsLeftColumnSpetialiestCard";

const QuestionsLeftColumn = ({ currentDepartment}) => {
    const page = useRef(1)
    const [url, seturl] = useState("/get/doctors?department_id=all&page=1");
    const hasnext = useRef(true);
    const [doctors, setdoctors] = useState([]);

    const { data, IsPending, err } = useGetFetch(url);

    useEffect(()=>{
        if(currentDepartment){
            setdoctors([])
            page.current=1;
            seturl(`/get/doctors/?page=${page.current}&department_id=${currentDepartment.id}`);
        }

    }, [currentDepartment])
    useEffect(() => {
        if (data) {
            setdoctors(doctorss => [...doctorss, ...data.results]);
            if (!data.next) {
                hasnext.current = false;
            }
            else {
                hasnext.current = true;
                page.current += 1;
            }
        }
    }, [data])


    const [lastElement, setlastElement] = useState(null);

    const handle = useCallback(() => {
        if (hasnext.current) {
            seturl(`/get/doctors/?page=${page.current}&department_id=${currentDepartment.id}`);
        }
    }, [currentDepartment])

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
        <div className="w3-col m2" style={{ position: 'sticky', top: 60, maxHeight: '100%', paddingTop: 3,marginBottom:18}}>
            <div className="w3-card w3-round w3-theme-l1" >
                <h5 style={{ marginTop:0,textAlign: 'center', display:"flex",justifyContent:"center",alignItems:"center",height:72 }}>
                    <div>
                        <i className="fa fa-stethoscope" style={{margin:3}}/>
                        Our specialists
                        </div>
                    </h5>
            </div>
            <div className="barrr" style={{ padding: "3px 5px", overflowY: 'scroll', height: "calc( 100vh - 150px )", marginLeft: -5, width: "calc(100% + 10px)" }}>
                {
                    doctors.map((doctor, index) => {
                        if (index === doctors.length - 1) {

                            return <div ref={setlastElement} key={doctor.id}>
                                <QuestionsLeftColumnSpetialiestCard doctor={doctor}/>
                            </div>

                        }
                        else {
                            return <div key={doctor.id}>
                                <QuestionsLeftColumnSpetialiestCard doctor={doctor}/>
                            </div>
                        }
                    })
                }
                {IsPending && <h4 className='w3-center'>Loadding...</h4>}
                {err && <>{err}</>}
            </div>
        </div>

    );
}

export default QuestionsLeftColumn;