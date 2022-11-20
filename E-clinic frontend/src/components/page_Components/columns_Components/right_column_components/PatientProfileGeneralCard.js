const PatientProfileGeneralCard = (props) => {
    const {personal_phone_number,  email,  gender, about_me } = props.general;
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-user-md	" /> General</h2>
            <div className="w3-container">
                <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                    <p className=" w3-third w3-margin">
                        <label>Phone Number</label>
                        <br />
                        <span className="w3-input custom_output">{personal_phone_number}</span>
                    </p>
                    <p className="w3-third w3-margin">
                        <label >Email</label>
                        <br />
                        <span className="w3-input custom_output">{email}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label >Gender</label>
                        <br />
                        <span className="w3-input custom_output">{gender}</span>
                    </p>
                </div>
                <div className="w3-row" style={{ marginBottom: 30 }}>
                    <p className=" w3-margin">
                        <label>About me</label>
                        <br />
                    </p>
                    <div className="w3-margin custom_textArea custom_output" style={{ paddingLeft: 5, paddingBottom: 5 }}>
                        {about_me}
                    </div>
                    <p />
                </div>
            </div>
        </div>

    );
}

export default PatientProfileGeneralCard;