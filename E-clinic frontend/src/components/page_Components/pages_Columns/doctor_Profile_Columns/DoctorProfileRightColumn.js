import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePutFetch from "../../../../custom hooks/usePutFetch";
import AdminPendingActionCard from "../../columns_Components/right_column_components/AdminDoctorProfileActionCard";
import AdminProfilecard from "../../columns_Components/right_column_components/AdminDoctorProfilecard";
import AdminDoctorProfileMessageCard from "../../columns_Components/right_column_components/AdminDoctorProfileMessageCard";

const DoctorProfileRightColumn = ({ data, departments, departmentid, setdepartmentid, setrejectEnable, rejectEnable, setacceptEnable,acceptEnable}) => {
    const { data: rejectdata, IsPending: rejectIsPending, put: rejectput } = usePutFetch();
    const { data: updatestatusdata, IsPending: updatestatusIsPending,  put: updatestatusput } = usePutFetch();
    const { data: assigntodepartmentdata,  IsPending: assigntodepartmentIsPending, put: assigntodepartmentput } = usePutFetch();
    const [status_message, setstatus_message] = useState(data.status_message||"");


    
    const navto=useNavigate()

    useEffect(()=>{
        if (updatestatusdata){
            handle_UpdateDepartment()
        }
    }, [updatestatusdata])

    useEffect(()=>{
        if (assigntodepartmentdata){
            navto("/")
        }
    }, [assigntodepartmentdata])

    useEffect(() => {
        if (rejectdata) {
            navto("/")
        }
    }, [rejectdata])

    const { id } = useParams();
    function handle_reject() {
        setrejectEnable(false)
        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("status",0)
        formdata.append("status_message", status_message)
        rejectput("/update/doctor/status/", formdata);
    }

    function handle_accept(){
        setacceptEnable(false)
        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("status", 1)
        formdata.append("status_message",status_message)
        updatestatusput("/update/doctor/status/", formdata)

    }

    function handle_UpdateDepartment() {
        const formdata2 = new FormData();
        formdata2.append("doctor", id);
        formdata2.append("department", departmentid)
        assigntodepartmentput("/update/doctor/department/", formdata2)
    }

    

        return (

               
            <div className="w3-col  m2" style={{ marginTop: 15 ,position:"fixed",right:0}} >
                {(updatestatusIsPending || assigntodepartmentIsPending || rejectIsPending) &&
                    < div className="w3-container w3-card  w3-round" style={{zIndex:1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="loader"></div>

                    </div>
                }
                {rejectEnable &&
                    < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", height: '100%', width: "-webkit-fill-available", backgroundColor: "rgb(223 223 223 / 94%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{display:"flex"}}>
                            <button onClick={() => setrejectEnable(false)} style={{ marginRight: 5 }} className="w3-button w3-grey ">cancel</button>
                            <button onClick={handle_reject} className="w3-button w3-red " >Reject</button>
                        </div>

                    </div>
                }
                {acceptEnable &&
                    < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", height: '100%', width: "-webkit-fill-available", backgroundColor: "rgb(223 223 223 / 94%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ display: "flex" }}>
                            <button onClick={() => setacceptEnable(false)} style={{ marginRight: 5 }} className="w3-button w3-grey ">cancel</button>
                            <button onClick={handle_accept} className="w3-button w3-green " >Accept</button>
                        </div>

                    </div>
                }
                <AdminProfilecard image={data.general.image}/>
                <AdminDoctorProfileMessageCard status_message={status_message} setstatus_message={setstatus_message}/>
                
                <AdminPendingActionCard departments={departments} departmentid={departmentid} setdepartmentid={setdepartmentid} setrejectEnable={setrejectEnable} setacceptEnable={setacceptEnable} updatestatusput={updatestatusput} assigntodepartmentput={assigntodepartmentput}/>
            </div>

        ) 
    }

 
export default DoctorProfileRightColumn ;