import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AccountSettingLeftColumn from "../components/page_Components/pages_Columns/account_Setting_Columns/AccountSettingLeftColumn";
import AccountSettingRightColumn from "../components/page_Components/pages_Columns/account_Setting_Columns/AccountSettingRightColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";
import useGetFetch from "../custom hooks/useGetFetch";


const AccountSetting = () => {
    const { data, IsPending, err } = useGetFetch("/user/get/profile/info/");

 
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Navbar />
            <PageContainer>
                <AccountSettingLeftColumn />
                {IsPending && <h4 className="w3-center">Loading...</h4>}
                {err && <div className="w3-center">{err}</div>}
                {data && <AccountSettingRightColumn data={data} />}
            </PageContainer>
            <Footer />
        </>
    );
}

export default AccountSetting;