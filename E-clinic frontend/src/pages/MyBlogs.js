import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HomeLeftColumn from "../components/page_Components/pages_Columns/home_Columns/HomeLeftColumn";
import HomeRightColumn from "../components/page_Components/pages_Columns/home_Columns/HomeRightColumn";
import MyBlogsMiddleColumns from "../components/page_Components/pages_Columns/my_Blogs_Columns/MyBlogsMiddleColumns";
import PageContainer from "../components/page_Components/page_Container/PageContainer";

const MyBlogs = () => {
    const [blogs, setblogs] = useState([]);



    return ( 

        <>
            <Navbar />
            <PageContainer>
                <HomeLeftColumn />
                <MyBlogsMiddleColumns blogs={blogs} setblogs={setblogs} />
                <HomeRightColumn />
            </PageContainer>
            <Footer />
        </>
     );
}
 
export default MyBlogs;