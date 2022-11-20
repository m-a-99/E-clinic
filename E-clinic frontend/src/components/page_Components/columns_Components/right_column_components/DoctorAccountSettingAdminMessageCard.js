const DoctorAccountSettingAdminMessageCard = (props) => {
    const { status, status_message} = props;
        return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-user-circle-o 	" /> Account</h2>
            <div className="w3-container">
                <div className="w3-row" style={{ marginTop: 30}}>
                        <p className=" w3-third w3-margin">
                            <label>Account Status</label>
                            <br />
                            <span className="w3-input custom_output">{status}</span>
                        </p>
                </div>
                    {(status_message?.length>0)&&<div className="w3-row">
                    <p className=" w3-margin">
                        <label>Admin Message</label>
                        <br />
                    </p>
                    <div className="w3-margin custom_textArea custom_output" style={{ paddingLeft: 5, paddingBottom: 5 }}>
                            {status_message}
                    </div>
                </div>}
                
            </div>
        </div>


    );
}

export default DoctorAccountSettingAdminMessageCard;