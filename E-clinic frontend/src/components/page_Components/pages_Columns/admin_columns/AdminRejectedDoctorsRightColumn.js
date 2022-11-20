import RejectedDoctorcards from "../../columns_Components/right_column_components/RejectedDoctorcards";
import RejectedDoctorHedder from "../../columns_Components/right_column_components/RejectedDoctorHedder";
const AdminRejectedDoctorsRightColumn= () => {


        
        return (

            <div className="w3-col m10 " style={{ marginTop: 15, minHeight: "calc(100vh - 65px)"}}>
                <div style={{ position: "relative" }}>
                    <RejectedDoctorHedder/>
                    <RejectedDoctorcards/>
                </div>
            </div>
        );

    }


export default AdminRejectedDoctorsRightColumn ;