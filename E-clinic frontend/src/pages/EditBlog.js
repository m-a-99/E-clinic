import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import EditBlogMiddleColumns from "../components/page_Components/pages_Columns/edit_Blog_Columns/EditBlogMiddleColumns";
import HomeLeftColumn from "../components/page_Components/pages_Columns/home_Columns/HomeLeftColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";

const EditBlog = () => {

    return ( 
        <>
         <Navbar />
        <PageContainer>
            <HomeLeftColumn />
                <EditBlogMiddleColumns />
        </PageContainer>
        <Footer />
        </>
    );
}
 
export default EditBlog;