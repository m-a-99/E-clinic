import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CreateBlogRightColumn from "../components/page_Components/pages_Columns/create_Blog_Columns/CreateBlogRightColumn";
import HomeLeftColumn from "../components/page_Components/pages_Columns/home_Columns/HomeLeftColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";

const CreateBlog = () => {
    return (
    <>
        <Navbar />
        <PageContainer>
            <HomeLeftColumn />
            <CreateBlogRightColumn />


        </PageContainer>
        <Footer />
    </>);
}

export default CreateBlog;