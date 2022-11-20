
const AdminDoctorProfileActionCard = ({ departments, setdepartmentid, departmentid, setrejectEnable, setacceptEnable}) => {



    return (
        <>
            < div className="w3-card w3-round w3-white"  style={{marginTop:10}}>
                <div className="w3-container">
                    <p className=" w3-margin">
                        <label >Assign to department</label>
                        <br />
                        <select className=" w3-select w3-round " id="doctor_id" name="doctor" onChange={(e) => setdepartmentid(e.target.value)} value={departmentid}>
                            <option value={"0"} disabled >Choose your option </option>
                            {departments.map((department) => {
                                return <option value={department.id} key={department.id}>{department.name} </option>
                            })}
                        </select>
                    </p>
                    <p className=" w3-margin">
                        <button onClick={()=>setrejectEnable(true)}style={{width:"100%"}} className="w3-button w3-red">Reject</button>
                        <button disabled={departmentid === "0"} onClick={() => setacceptEnable(true)} style={{ width: "100%",marginTop:5 }} className="w3-button w3-green">Accept</button>
                        
                    </p>

                </div>
            </div >
        </>
        
     );
}
 
export default AdminDoctorProfileActionCard;