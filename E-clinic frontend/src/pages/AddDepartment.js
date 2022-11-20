import AdminNavbar from "../components/AdminNavbar";
import AddDepartmentRightColumn from "../components/page_Components/pages_Columns/add_Department_Columns/AddDepartmentRightColumn";
import AdminLeftColumn from "../components/page_Components/pages_Columns/admin_columns/AdminLeftColumn";

const AddDepartment = () => {
    return ( 

          <>
            <AdminNavbar/>
            <div className="w3-row">

                <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 50 ,padding:0,display: "flex"}}>
                    <AdminLeftColumn />
                    <AddDepartmentRightColumn/>
                </div>
            </div>

               
        </>
      

     );
}
 
export default AddDepartment;