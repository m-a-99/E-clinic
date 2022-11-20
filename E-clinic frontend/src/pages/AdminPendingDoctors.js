import AdminNavbar from "../components/AdminNavbar";
import AdminLeftColumn from "../components/page_Components/pages_Columns/admin_columns/AdminLeftColumn";
import AdminPendingDoctorsRightColumn from "../components/page_Components/pages_Columns/admin_columns/AdminPendingDoctorsRightColumn";

const AdminPendingDoctors = () => {
    return (
        <>
            <AdminNavbar/>
            <div className="w3-row">

                <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 50, padding: 0,display: "flex"}}>
                    <AdminLeftColumn />
                    <AdminPendingDoctorsRightColumn/>
                </div>
            </div>

               
        </>
       
      );
}
 
export default AdminPendingDoctors;
