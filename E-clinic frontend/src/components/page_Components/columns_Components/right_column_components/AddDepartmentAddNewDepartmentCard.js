import { useEffect, useState } from "react";
import usePostFetch from "../../../../custom hooks/usePostFetch";

const AddDepartmentAddNewDepartmentCard = () => {
    const [AddEnabeld, setAddEnabeld] = useState(false);


    const [newDepratment, setnewDepratment] = useState("");
    
    const {data,IsPending,err,post}=usePostFetch()

    useEffect(() => {
        if (newDepratment.length>0){
            setAddEnabeld(true)
        }
        else{
            setAddEnabeld(false)
        }
    }, [newDepratment]);


    function add(){
        const formdata=new FormData()
        formdata.append('name',newDepratment)
        post("/create/department/", formdata);

    }
    return ( 
        <div style={{ position: "relative" }}>

            {IsPending &&
                < div className="w3-container w3-card  w3-round" style={{ position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-plus" /> Add New Department</h2>
            {err&&<h3>{err}</h3>}
            <div className="w3-container">
                <div className="w3-row" style={{ display: "flex", justifyContent: "center" }}>
                    <p className=" w3-third	 w3-margin">
                        <label>Department Name</label>
                        <br />
                        <input className="w3-input " type="text" onChange={(e) => setnewDepratment(e.target.value)} value={newDepratment} />
                    </p>
                    <button disabled={!AddEnabeld} onClick={add} style={{ alignSelf: "center", marginTop: 25, display: "flex", justifyContent: "center", alignItems: "center" }} className="w3-rest w3-theme-d2 w3-right w3-button w3-round ">
                        Add
                    </button>
                    
                </div>
            </div>
        </div>
        </div>

     );
}
 
export default AddDepartmentAddNewDepartmentCard;