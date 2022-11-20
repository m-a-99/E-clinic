
const AdminDoctorProfilecard = ({image}) => {

    return (
        <>
        < div className = "w3-card w3-round w3-white" >
            <div className="w3-container">
                <h4 className="w3-center">Profile photo</h4>
                    <p className="w3-center"><img src={image} className="w3-circle" style={{ height: 120, width: 120 }} alt="Avatar" /></p>
                <hr />
                  
            </div>
        </div >
        </>
        
     );
}
 
export default AdminDoctorProfilecard;