const AdminMedicalhistoryOrWorkExperienceCard = (props) => {
    const { title, time_period, body, certificate } = props.data;

        return (
            <div className=" w3-container ">
                <div className=" w3-container ">
                    <div className=" w3-row ">
                        <h5 className=" w3-opacity"><b>{title}</b></h5>
                    </div>
                    <h6 style={{ color: '#4d636f' }}><i className=" fa fa-calendar w3-margin-right " />{time_period}</h6>
                    <p style={{ wordBreak: "break-word" }}>{body}</p>
                    {certificate && <a style={{ color: '#4d636f' }} rel="noreferrer" href={certificate} target="_blank"><i className=" fa fa-link w3-margin-right " />Attachment</a>}
                    <hr className=" custom_output w3-input " />
                </div>
            </div>

        );
    }

export default AdminMedicalhistoryOrWorkExperienceCard;