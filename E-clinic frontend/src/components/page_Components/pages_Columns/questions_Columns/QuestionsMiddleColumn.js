import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import QuestionsMiddleColumnQuestionCard from "../../columns_Components/middle_column_components/QuestionsMiddleColumnQuestionCard";
import QuestionsMiddleColumnSearchbarCard from "../../columns_Components/middle_column_components/QuestionsMiddleColumnSearchbarCard";

const QuestionsMiddleColumn = () => {

    const { currentDepartment, questions, hasNext, IsPending, err, seturl, page, Scroll_Top, setsearch,search } = useOutletContext();

  
    const [lastElement, setlastElement] = useState(null);

    const handle = useCallback(() => {
        setTimeout(() => {
            if (hasNext.current){
                if(search.length===0){
                seturl(`/get/department/questions/?department_id=${currentDepartment.id}&page=${page.current}`)

                }
                else{
                    seturl(`/get/department/questions/?department_id=${currentDepartment.id}&page=${page.current}&search=${search}`)

                }

            }
        }, 0);
    }, [hasNext, currentDepartment, page, seturl,search])

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

export default QuestionsMiddleColumn;