const AdminDoctorProfileEducationCard = (props) => {
    const { university, degree, time_period, certificate, medical_licence } = props.education;
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-mortar-board" /> Education</h2>
            <div className="w3-container">
                <div className="w3-row" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p className=" w3-third	 w3-margin" >
                        <label>University</label>
                        <br />
                        <span className="w3-input custom_output">{university}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label >Degree</label>
                        <br />
                        <span className="w3-input custom_output">{degree}</span>
                    </p>
                    <p className="w3-third w3-margin" >
                        <label >Time period</label>
                        <br />
                        <span className="w3-input custom_output">{time_period}</span>
                    </p>
                </div>
                <div className="w3-row" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p className=" w3-half	w3-margin" >
                        <label>Graduate Certificate in Medicine</label>
                        <br />
                        <span className="w3-input custom_output"><a href={certificate} target="_blank" style={{ cursor: "pointer", color: "#4d636f" }} >{certificate && <><i className=" fa fa-link w3-margin-right "></i><>Attatchment</></>}</a></span>
                    </p>
                    <p className="w3-half w3-margin" >
                        <label >Medical license</label>
                        <br />
                        <span className="w3-input custom_output"><a href={medical_licence} target="_blank" style={{ cursor: "pointer", color: "#4d636f" }}>{medical_licence&&<><i className=" fa fa-link w3-margin-right "></i><>Attatchment</></>}</a></span>
                    </p>
                </div>
            </div>
        </div>

    );
}
export default AdminDoctorProfileEducationCard;