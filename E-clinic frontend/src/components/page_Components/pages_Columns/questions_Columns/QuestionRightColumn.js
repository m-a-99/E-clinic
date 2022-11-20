import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../../context/MyContext";

const QuestionRightColumn = ({All, currentDepartment, setcurrentDepartment}) => {
    const { departments } = useContext(MyContext);
    const navto=useNavigate();
    const {myinfo} = useContext(MyContext);
    return (

        <div style={{ position: 'sticky', top: 60, width: '16.6666%', float: "right", marginBottom: 13, paddingTop: 3 }}>
               <div id="menu" >
                    < div className="w3-card w3-round" >
                        <div className="w3-white ">
                        {(myinfo?.account_type === "Patient") && <button onClick={() => navto("/AskQuestion")} style={{ borderRadius: "4px 4px 0 0" }} className="w3-button w3-theme-d4  w3-block w3-left-align"><i style={{ marginRight: 5 }} className="fa fa-circle-o-notch fa-fw " />Ask Question</button>}
                        {(myinfo?.account_type === "Patient") && <button onClick={() => navto("/Questions/myquestions")} className="w3-button w3-theme-d4 w3-block  w3-left-align"><i style={{ marginRight: 5 }} className="fa fa-calendar-check-o fa-fw " /> My Questions</button>}
                        {(myinfo?.account_type === "Doctor") && <button onClick={() => navto("/CreateBlog")} style={{ borderRadius: "4px 4px 0 0" }} className="w3-button w3-theme-d4  w3-block w3-left-align"><i style={{ marginRight: 5 }} className="fa fa-circle-o-notch fa-fw " />Create Blog</button>}
                        {(myinfo?.account_type === "Doctor") && <button onClick={() => navto("/MyBlogs")} className="w3-button w3-theme-d4 w3-block  w3-left-align"><i style={{ marginRight: 5 }} className="fa fa-calendar-check-o fa-fw " /> My Blogs</button>}
                        {(myinfo?.account_type === "Doctor") && <button onClick={() => navto("/QusetionsDirectedToMe")} className="w3-button w3-theme-d4 w3-block  w3-left-align"><i style={{ marginRight: 5 }} className="fa  fa-user-md fa-fw " /> Direct Quesions</button>}
                        </div>
                    </div >
                </div>

            <div className="w3-card w3-round w3-theme-d4 w3-center" style={{ margin:"5px 0 2px 0", display: "flex", justifyContent: "center",alignItems:"center", height: 72, width: "100%" }}>
                <div>
                    <h4 style={{ margin: 10 }}><i className="fa fa-stethoscope" /> Departments</h4>

                </div>

                {/* 
                <div className="w3-card w3-round w3-theme-l4" style={{ textAlign: 'center' ,fontSize: "1.5vw"}}>
                      Categories
                </div> */}

            </div>
            {(myinfo?.account_type === "Patient") &&<div className="barrr" style={{ padding: "3px 5px", overflowY: 'scroll', height: "calc(100vh - 232px)", marginLeft: -5, width: "calc(100% + 10px)" }}>
                <div id="menu" >
                    <div onClick={() => {setcurrentDepartment(All);navto("/Questions");}} className={` w3-card  ${(currentDepartment.id === "all") ? "w3-theme-d3" : 'w3-theme-l1 w3-button '} w3-block  w3-left-align`} style={{ padding: "8px 16px", marginBottom: 5, whiteSpace: "break-spaces", textOverflow: "ellipsis" }}>
                        All Departments
                    </div>
                    {
                        departments.map((d, i) => {
                            return <div key={d.id} onClick={() => { setcurrentDepartment(d); navto("/Questions");}} className={` w3-card  ${(currentDepartment.id === d.id) ? "w3-theme-d3" : 'w3-theme-l1 w3-button '} w3-block  w3-left-align`} style={{ padding: "8px 16px", marginBottom: 5, whiteSpace: "break-spaces", textOverflow: "ellipsis" }}>
                                {d.name}
                            </div>

                        })
                    }
                </div>

            </div>}
            {(myinfo?.account_type === "Doctor") && <div className="barrr" style={{ padding: "3px 5px", overflowY: 'scroll', height: "calc(100vh - 262px)", marginLeft: -5, width: "calc(100% + 10px)" }}>
                <div id="menu" >
                    <div onClick={() => { setcurrentDepartment(All); navto("/Questions"); }} className={` w3-card  ${(currentDepartment.id === "all") ? "w3-theme-d3" : 'w3-theme-l1 w3-button '} w3-block  w3-left-align`} style={{ padding: "8px 16px", marginBottom: 5, whiteSpace: "break-spaces", textOverflow: "ellipsis" }}>
                        All Departments
                    </div>
                    {
                        departments.map((d, i) => {
                            return <div key={d.id} onClick={() => { setcurrentDepartment(d); navto("/Questions"); }} className={` w3-card  ${(currentDepartment.id === d.id) ? "w3-theme-d3" : 'w3-theme-l1 w3-button '} w3-block  w3-left-align`} style={{ padding: "8px 16px", marginBottom: 5, whiteSpace: "break-spaces", textOverflow: "ellipsis" }}>
                                {d.name}
                            </div>

                        })
                    }
                </div>

            </div>}
            
           
           
        </div>


    );
}

export default QuestionRightColumn;