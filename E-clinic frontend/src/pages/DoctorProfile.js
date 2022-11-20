import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminLeftColumn from "../components/page_Components/pages_Columns/admin_columns/AdminLeftColumn";
import DoctorProfileRightColumn from "../components/page_Components/pages_Columns/doctor_Profile_Columns/DoctorProfileRightColumn";
import  DoctorProfileMiddleColumn from "../components/page_Components/pages_Columns/doctor_Profile_Columns/DoctorProfileMiddleColumn";
import useGetFetch from "../custom hooks/useGetFetch";
import { useState } from "react";

const DoctorProfile = () => {
    const { id } = useParams()
    const { data, IsPending, err } = useGetFetch("/user/get/profile/details/?user_id=" + id)
    const { data: departments, IsPending: departmentsIsPending, err: departmentserr } = useGetFetch("/get/departments/")

    const [departmentid, setdepartmentid] = useState("0");
    const[rejectEnable,setrejectEnable]=useState(false);
    const [acceptEnable, setacceptEnable] = useState(false);


 
    return (  
        <>
            <AdminNavbar />
            <div className="w3-row">

                <div className="w3-container w3-content w3-white" style={{ maxWidth: 1400, marginTop: 50, padding: 0 }}>
                    <AdminLeftColumn />
                    {(IsPending || departmentsIsPending) && <h4 className="w3-center">Loading...</h4>}
                    {(err || departmentserr) && <div className="w3-center">{err}</div>}
                    {data && <DoctorProfileMiddleColumn data={data} />}
                    {data && departments && <DoctorProfileRightColumn data={data} departments={departments} departmentid={departmentid} setdepartmentid={setdepartmentid} rejectEnable={rejectEnable} setrejectEnable={setrejectEnable} acceptEnable={acceptEnable} setacceptEnable={setacceptEnable}/>} 
                </div>
            </div>
        
        </>
    );
}
 
export default DoctorProfile;