const AdminDoctorProfileMessageCard = ({ status_message, setstatus_message}) => {

    return (
        <>
            < div className="w3-card w3-round w3-white"  style={{marginTop:10}}>
                <div className="w3-container">
                    <div className="w3-row" >
                        <div className=" w3-margin" style={{ display: "flex", flexDirection: "column" }}>
                            <label>Action Message</label>
                            <br />
                            <textarea id="w3review" name="w3review" rows={3} cols={90} style={{ resize: 'none' }} onChange={(e) => setstatus_message(e.target.value)} value={status_message} />
                        </div>
                    </div>
                   
                </div>
            </div >
        </>
        
     );
}
 
export default AdminDoctorProfileMessageCard;