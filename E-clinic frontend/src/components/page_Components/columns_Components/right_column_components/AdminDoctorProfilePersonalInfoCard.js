const AdminDoctorProfilePersonalInfoCard = (props) => {
    const { personal_phone_number, personal_ID, face_photo, marital_status, location } = props.personal_info;
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-address-card-o" /> Personal Info</h2>
            
            <div className="w3-container">
                
                <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                    <p className=" w3-margin" >

                        <img src={face_photo} className="w3-circle" alt="Avatar" style={{ height: 106, width: 106 }} />
                    </p>
                    <p className=" w3-third w3-margin">
                        <label>Personal Phone Number</label>
                        <br />
                        <span className="w3-input custom_output">{personal_phone_number}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label>Personal ID</label>
                        <br />
                        <span className="w3-input custom_output">{personal_ID}</span>
                    </p>
                    
                </div>
                <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                    <p className=" w3-half w3-margin">
                        <label>Marital Status</label>
                        <br />
                        <span className="w3-input custom_output">{marital_status}</span>
                    </p>
                    <p className="w3-half w3-margin" >
                        <label>Location</label>
                        <br />
                        <span className="w3-input custom_output">{location}</span>
                    </p>
                  
                </div>
                
            </div>
        </div>
    );
}
export default AdminDoctorProfilePersonalInfoCard;