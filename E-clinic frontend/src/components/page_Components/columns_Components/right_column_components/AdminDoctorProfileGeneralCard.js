const AdminDoctorProfileGeneralCard = (props) => {
    const { work_phone_number, email, gender, about_me, specialization, years_of_experience, first_name, last_name, birthday } = props.general;
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-user-md	" /> General</h2>
            <div className="w3-container">
                <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                    <p className=" w3-third w3-margin">
                        <label>Work Phone Number</label>
                        <br />
                        <span className="w3-input custom_output">{work_phone_number}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label>Email</label>
                        <br />
                        <span className="w3-input custom_output">{email}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label >Gender</label>
                        <br />
                        <span className="w3-input custom_output">{gender}</span>
                    </p>


                </div>
                <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                    <p className=" w3-third w3-margin">
                        <label>First Name</label>
                        <br />
                        <span className="w3-input custom_output">{first_name}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label>Last Name</label>
                        <br />
                        <span className="w3-input custom_output">{last_name}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label >Birthday</label>
                        <br />
                        <span className="w3-input custom_output">{birthday}</span>
                    </p>
                </div>
                <div className="w3-row">
                    <p className=" w3-margin">
                        <label>About me</label>
                        <br />
                    </p>
                    <div className="w3-margin custom_textArea custom_output" style={{ paddingLeft: 5, paddingBottom: 5 }}>
                        {about_me}
                    </div>
                    <p />
                </div>
                <div className="w3-row  w3-center" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p className="w3-margin w3-third ">
                        <label>Specialization</label>
                        <br />
                        <span className="w3-input custom_output">{specialization}</span>
                    </p>
                    <p className="w3-margin w3-third">
                        <label>Years of Experience</label>
                        <br />
                        <span className="w3-input custom_output">{years_of_experience} years</span>
                    </p>

                </div>
            </div>
        </div>
    );
}
export default AdminDoctorProfileGeneralCard;