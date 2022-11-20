import AcceptedDoctorcards from "../../columns_Components/right_column_components/AcceptedDoctorcards";
import AcceptedDoctorHedder from "../../columns_Components/right_column_components/AcceptedDoctorHedder";
const AdminAcceptedDoctorsRightColumn= () => {


        
        return (

            <div className="w3-col m10 " style={{ marginTop: 15, minHeight: "calc(100vh - 65px)"}}>
                <div style={{ position: "relative" }}>
                    <AcceptedDoctorHedder/>
                    <AcceptedDoctorcards/>
                </div>
            </div>
        );

    }


export default AdminAcceptedDoctorsRightColumn ;