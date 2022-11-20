import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UserProfileLeftColumn from "../components/page_Components/pages_Columns/user_Profile_Columns/UserProfileLeftColumn";
import UserProfileRightColumn from "../components/page_Components/pages_Columns/user_Profile_Columns/UserProfileRightColumn";
import PageContainer from "../components/page_Components/page_Container/PageContainer";
import useGetFetch from "../custom hooks/useGetFetch";

const UserProfile = () => {
    const {id}=useParams()
    const { data: data, IsPending, err } = useGetFetch("/user/get/profile/details/?user_id="+id);

    return (
        <>
            <Navbar />
            <PageContainer>
                <UserProfileLeftColumn data={data}/>
                {IsPending && <h4 className="w3-center">Loading...</h4>}
                {err && <div className="w3-center">{err}</div>}
                {data && <UserProfileRightColumn data={data} />}
            </PageContainer>
            <Footer />
        </>
    );
}
 
export default UserProfile;