const AdminNavbar = () => {
    return (
        <div className="w3-top" style={{ zIndex: 5 }}>
            <div className="w3-bar w3-left-align w3-large" style={{ backgroundColor: "#2b3238", width: "100%", height: 60 }}>
                <div style={{ height: "100%", display: "flex", alignItems: "center", marginLeft: 5, color: "white" }}><i className="fa fa-pie-chart fa-fw w3-margin-right" />Admin Dashboard</div>
            </div>
        </div>
    );
}
 
export default AdminNavbar;