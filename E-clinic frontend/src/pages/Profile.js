import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileLeftColumn from "../components/page_Components/pages_Columns/profile_Columns/ProfileLeftColumn";
import ProfileRightColumn from "../components/page_Components/pages_Columns/profile_Columns/ProfileRightColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";
import { MyContext } from "../context/MyContext";
import useGetFetch from "../custom hooks/useGetFetch";

const Profile = () => {
    const { data:data, IsPending, err } = useGetFetch("/user/get/profile/info/");

    return (
        <>
            <Navbar />
            <PageContainer>
                <ProfileLeftColumn />
                {IsPending && <h4 className="w3-center">Loading...</h4>}
                {err && <div className="w3-center">{err}</div>}
                {data && <ProfileRightColumn data={data} />}
            </PageContainer>
            <Footer />
        </>
    );
}

export default Profile;