import { useContext } from "react";
import { MyContext } from "../../../../context/MyContext";

const AskQuestionQuestionDetialsCard = (props) => {
    // const [iamThePatient, setiamThePatient] = useState(true);
    const {departmentsDoctors} = useContext(MyContext);
    const { Title,setTitle,body,setbody,Department,setDepartment,ToDoctor,setToDoctor}=props
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin" >
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-user-md 	"> Qustion detials </i></h2>
            <div className="w3-container">
                {/* <div className="w3-row w3-margin-bottom">
                    <p className="w3-margin">
                        <input onChange={()=>{setiamThePatient(v=>!v)}} id="Iam_The_Patient" className="w3-check " type="checkbox" defaultChecked />
                        <label className=" w3-padding">Iam The Patient</label>
                    </p>
                </div> */}
                {/* {!iamThePatient&& <div className="w3-row Iam_not_The_Patient">
                    <p className=" w3-third w3-margin" style={{ width: '28.5%' }}>
                        <label>Patient Name</label>
                        <br />
                        <input className="w3-input" type="text" />
                    </p>
                    <p className="w3-third w3-margin" style={{ width: '28.5%' }}>
                        <label>Patient Age</label>
                        <br />
                        <input className="w3-input" type="number" />
                    </p>
                    <p className="w3-third w3-margin" style={{ maxWidth: '28.4%' }}>
                        <label >Gender</label>
                        <br />
                        <select className="w3-select w3-round" name="option" defaultValue={0}>
                            <option value={0} disabled >Choose your option</option>
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                        </select>
                    </p>
                </div>} */}
                <div className="w3-row ">
                    <p className="w3-half w3-margin" style={{ width: '44.5%' }}>
                        <label >Title</label>
                        <br />
                        <input className="w3-input" type="text" onChange={(e)=>setTitle(e.target.value)} value={Title}/>
                    </p>
                </div>
                <div className="w3-row">
                    <p className="w3-half w3-margin" style={{ width: '44.5%' }}>
                        <label >Specialist category</label>
                        <br />
                        <select className=" w3-select w3-round " id="doctor_id" name="doctor" onChange={(e)=>setDepartment(e.target.value)} value={Department}>
                            <option value={"0"} disabled >Choose your option </option>

                            {departmentsDoctors&&departmentsDoctors.map((department)=>{
                                return <option value={department.id} key={department.id}>{department.name} </option>
                            })}
                        </select>
                    </p>
                    <p className="w3-half w3-margin" style={{ maxWidth: '44.5%' }}>
                        <label >Specific Doctor</label>
                        <br />
                        <select disabled={Department==="0"} className="w3-select w3-round" name="option" onChange={(e)=>setToDoctor(e.target.value)} value={ToDoctor}>
                            <option value={"0"}>All</option>

                            {(Department !== "0") && departmentsDoctors && departmentsDoctors.filter((value) => value.id.toString() === Department)[0].doctors.map(doctor=>{
                               return <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>

                            })}
                            
                        </select>
                    </p>
                </div>
                <div className="w3-row">
                    <p className=" w3-margin">
                        <label>Detailed Description</label>
                        <br />
                        <textarea rows={3} cols={90} style={{ resize: 'none', width: '-webkit-fill-available', maxWidth: 920 }}  onChange={(e)=>setbody(e.target.value)} value={body} />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AskQuestionQuestionDetialsCard;