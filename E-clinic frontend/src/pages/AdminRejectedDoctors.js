import AdminNavbar from "../components/AdminNavbar";
import AdminLeftColumn from "../components/page_Components/pages_Columns/admin_columns/AdminLeftColumn";
import AdminRejectedDoctorsRightColumn from "../components/page_Components/pages_Columns/admin_columns/AdminRejectedDoctorsRightColumn";

const AdminRejectedDoctors = () => {
    return (
        <>
            <AdminNavbar/>
            <div className="w3-row">

                <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 50, padding: 0,display: "flex"}}>
                    <AdminLeftColumn />
                    <AdminRejectedDoctorsRightColumn/>
                </div>
            </div>

               
        </>
       
      );
}
 
export default AdminRejectedDoctors;
