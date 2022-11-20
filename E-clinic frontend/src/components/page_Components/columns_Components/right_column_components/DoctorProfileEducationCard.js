const DoctorProfileEducationCard = (props) => {
    const { university, degree, time_period } = props.education;
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-mortar-board" /> Education</h2>
            <div className="w3-container">
                <div className="w3-row" style={{  display: "flex", justifyContent: "space-between" }}>
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
            </div>
        </div>

    );
}

export default DoctorProfileEducationCard;