import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useOutlet, useOutletContext } from "react-router-dom";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import QuestionsMiddleColumnQuestionCard from "../../columns_Components/middle_column_components/QuestionsMiddleColumnQuestionCard";
import QuestionsMiddleColumnSearchbarCard from "../../columns_Components/middle_column_components/QuestionsMiddleColumnSearchbarCard";

const MyQuestionMiddleColumn = () => {


    const page = useRef(1)
    const [url, seturl] = useState("/get/personal/questions/?page=1");
    const [questions, setquestions] = useState([]);
    const hasNext = useRef(true)
    const { data, IsPending, err } = useGetFetch(url);

    const [search, setsearch] = useState('');



    const { Scroll_Top } = useOutletContext();


    const [lastElement, setlastElement] = useState(null);

    useEffect(()=>{
        if(search.length>0){
            page.current=1
            setquestions([])
            seturl(`/get/personal/questions/?page=${page.current}&search=${search}`)
        }
        else{
            page.current=1
            setquestions([])
            seturl(`/get/personal/questions/?page=${page.current}`)
        }
    },[search])

    useEffect(() => {
        if (data) {
            if (data.next) {
                page.current += 1
                hasNext.current = true;

            }
            else {
                hasNext.current = false;
            }
            setquestions(q => [...q, ...data.results])

        }

    }, [data])
    const handle = useCallback(() => {
        setTimeout(() => {
            if (hasNext.current) {
                if (search.length === 0) {
                    seturl(`/get/personal/questions/?page=${page.current}`)
                }
                else {
                    seturl(`/get/personal/questions/?page=${page.current}&search=${search}`)
                }
            }
        }, 0);
    }, [search])

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


    useLayoutEffect(() => {
        window.scrollTo(0, Scroll_Top.current);
        console.log("mount")
        return (() => {
            Scroll_Top.current = window.scrollY;
        })
    }, [Scroll_Top]);


    return (
        <div className="w3-col m8" style={{ paddingTop: 3 }}>
            <QuestionsMiddleColumnSearchbarCard setsearch={setsearch} search={search}/>
            {
                questions.map((question, index) => {

                    if (index === questions.length - 1) {
                        return <div ref={setlastElement} key={question.id} >
                            <QuestionsMiddleColumnQuestionCard question={question} />

                        </div>
                    }
                    else {
                        return <div key={question.id} >
                            <QuestionsMiddleColumnQuestionCard question={question} />

                        </div>

                    }
                })
            }
            {IsPending && <h4 className='w3-center'>Loadding...</h4>}
            {err && <>{err}</>}
        </div>



    );
}

export default MyQuestionMiddleColumn;