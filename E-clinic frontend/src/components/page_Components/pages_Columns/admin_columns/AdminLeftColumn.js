import { useNavigate } from "react-router-dom";

const AdminLeftColumn = () => {
    const navto =useNavigate()
    return (
        <div className="w3-col m2" style={{ display: "list-item" }}>
            <div className="w3-col m2" style={{ backgroundColor: "#212529", position: 'fixed', top: 60, height: 'calc(100vh - 60px)' }}>
                <br />
                <button onClick={() => { navto("/PendingDoctors") }} className="w3-button w3-left-align" style={{ color: "gray", width: "100%" }}><i className="fa fa-circle-o-notch fa-fw w3-margin-right " style={{marginTop:8,marginBottom:8}} /> Pending Doctors</button>
                <button onClick={() => { navto("/AcceptedDoctors") }} className="w3-button w3-left-align" style={{ color: "gray", width: "100%" }}><i className="fa  fa-check-square-o fa-fw w3-margin-right" style={{ marginTop: 8, marginBottom: 8 }}/> Accepted Doctors</button>
                <button onClick={() => { navto("/RejectedDoctors") }} className="w3-button w3-left-align" style={{ color: "gray", width: "100%" }}><i className="fa  fa-times-circle fa-fw w3-margin-right" style={{ marginTop: 8, marginBottom: 8 }}/> Rejected Doctors</button>

                <button onClick={() => { navto("/AddDepartment") }} className="w3-button w3-left-align" style={{ color: "gray", width: "100%" }}><i className="fa fa-calendar-check-o fa-fw w3-margin-right" style={{ marginTop: 8, marginBottom: 8 }}/> Add Department</button>
            </div>
        </div>
    );
}

export default AdminLeftColumn;