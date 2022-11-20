import {  useLayoutEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import QuestionRightColumn from "../components/page_Components/pages_Columns/questions_Columns/QuestionRightColumn";
import QuestionsLeftColumn from "../components/page_Components/pages_Columns/questions_Columns/QuestionsLeftColumn";
import QuestionDetailsMiddleColumn from "../components/page_Components/pages_Columns/question_Details_Columns/QuestionDetailsMiddleColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";

const  QuestionDetails = () => {
    useLayoutEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return ( 
        <>
            <Navbar />
            <PageContainer>
                <QuestionsLeftColumn />
                <QuestionDetailsMiddleColumn />
                <QuestionRightColumn />
            </PageContainer>
            <Footer />
        </>
     );
}
 
export default QuestionDetails ;