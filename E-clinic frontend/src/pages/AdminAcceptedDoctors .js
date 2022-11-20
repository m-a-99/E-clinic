import AdminNavbar from "../components/AdminNavbar";
import AdminAcceptedDoctorsRightColumn from "../components/page_Components/pages_Columns/admin_columns/AdminAcceptedDoctorsRightColumn";
import AdminLeftColumn from "../components/page_Components/pages_Columns/admin_columns/AdminLeftColumn";

const AdminAcceptedDoctors  = () => {
    return (
        <>
            <AdminNavbar/>
            <div className="w3-row">

                <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 50, padding: 0,display: "flex"}}>
                    <AdminLeftColumn />
                    <AdminAcceptedDoctorsRightColumn/>
                </div>
            </div>

               
        </>
       
      );
}
 
export default AdminAcceptedDoctors ;
