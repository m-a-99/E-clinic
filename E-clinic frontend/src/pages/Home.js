import {useLayoutEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HomeLeftColumn from "../components/page_Components/pages_Columns/home_Columns/HomeLeftColumn";
import HomeMiddleColumn from "../components/page_Components/pages_Columns/home_Columns/HomeMiddleColumn";
import HomeRightColumn from "../components/page_Components/pages_Columns/home_Columns/HomeRightColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";

const Home = () => {



    const [blogs, setblogs] = useState([]);



    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <PageContainer>
                <HomeLeftColumn />
                <HomeMiddleColumn blogs={blogs} setblogs={setblogs} />
                <HomeRightColumn />
            </PageContainer>
            <Footer />
        </>
    );
}

export default Home;