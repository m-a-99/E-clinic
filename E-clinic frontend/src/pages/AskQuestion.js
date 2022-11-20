import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AskQuestionRightColumn from "../components/page_Components/pages_Columns/ask_Question_Columns/AskQuestionRightColumn";
import HomeLeftColumn from "../components/page_Components/pages_Columns/home_Columns/HomeLeftColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";

const AskQuestion = () => {
    return (
        <>
            <Navbar />
            <PageContainer>
                <HomeLeftColumn/> 
                <AskQuestionRightColumn/>
                
            </PageContainer>
            <Footer />
        </>
    );
}
 
export default AskQuestion;