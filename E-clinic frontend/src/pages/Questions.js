import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QuestionRightColumn from "../components/page_Components/pages_Columns/questions_Columns/QuestionRightColumn";
import QuestionsLeftColumn from "../components/page_Components/pages_Columns/questions_Columns/QuestionsLeftColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";
import useGetFetch from "../custom hooks/useGetFetch";

const Questions = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [All] = useState({ id: "all", name: "All Departments" });
    const [search, setsearch] = useState("");

    const [currentDepartment, setcurrentDepartment] = useState(All);
    const [questions, setquestions] = useState([]);


    const page = useRef(1);
    const [url, seturl] = useState("/get/department/questions/?department_id=all&page=1");
    // const [hasNext, sethasNext] = useState(true)
    const hasNext=useRef(true)


    const { data, IsPending, err } = useGetFetch(url);

    useEffect(() => {
        if (currentDepartment) {
            page.current = 1;
            seturl(`/get/department/questions/?department_id=${currentDepartment.id}&page=${page.current}`)
            setquestions([])
        }
        if (search.length>0){
            page.current = 1;
            seturl(`/get/department/questions/?department_id=${currentDepartment.id}&page=${page.current}&search=${search}`)
            setquestions([])
        }
    }, [currentDepartment,search]);

    const Scroll_Top = useRef(0)

    useEffect(() => {
        if (data) {
            if (data.next) {
                page.current += 1
                hasNext.current=true;
            }
            else {
                 hasNext.current=false;
            }
            setquestions(q => [...q, ...data.results]);

        }

    }, [data])


    // const deleteIsPending=false

    // function DeleteFetch(){
    //     navto("/questions")
    //     setquestions(questions => questions.filter((question) => question.id !== 147))
    //     console.log("aadd")
    // }
    //const { data: deleteData, IsPending: deleteIsPending, DeleteFetch } = useDeleteFetch();

    // useEffect(() => {
    //     if (deleteData){
    //         //setquestions(questions => questions.filter((question) => question.id !== deleteData.id))
    //         navto("/Questions");

    //     }
    // }, [deleteData,navto]);

    return (
        <>
            <Navbar />
            <PageContainer>
                <QuestionsLeftColumn currentDepartment={currentDepartment}/>
                <Outlet context={{ currentDepartment, questions, setquestions, hasNext, IsPending, err, seturl, page, Scroll_Top,setsearch,search }} />
                <QuestionRightColumn currentDepartment={currentDepartment} setcurrentDepartment={setcurrentDepartment} All={All}/>
            </PageContainer>
            <Footer />
        </>
    );
}

export default Questions;