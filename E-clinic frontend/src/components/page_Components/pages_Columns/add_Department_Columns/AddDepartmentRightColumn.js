import AddDepartmentAddNewDepartmentCard from "../../columns_Components/right_column_components/AddDepartmentAddNewDepartmentCard";
import AddDepartmentHedder from "../../columns_Components/right_column_components/AddDepartmentHedder";

const AddDepartmentRightColumn = () => {
    return (
        <div className="w3-col m10 " style={{ marginTop: 15, minHeight: "calc(100vh - 65px)" }}>
            <div style={{ position: "relative" }}>
                <AddDepartmentHedder/>
                < AddDepartmentAddNewDepartmentCard />
            </div>
        </div>
    );
}
 
export default AddDepartmentRightColumn;