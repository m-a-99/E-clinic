import PendingDoctorcards from "../../columns_Components/right_column_components/PendingDoctorcards";
import PendingDoctorHedder from "../../columns_Components/right_column_components/PendingDoctorHedder";
const AdminPendingDoctorsRightColumn= () => {


        
        return (

            <div className="w3-col m10 " style={{ marginTop: 15, minHeight: "calc(100vh - 65px)"}}>
                <div style={{ position: "relative" }}>
                    <PendingDoctorHedder/>
                    <PendingDoctorcards/>
                </div>
            </div>
        );

    }


export default AdminPendingDoctorsRightColumn ;