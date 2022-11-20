import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../../context/MyContext";

const Accordioncard = () => {
    const navto=useNavigate();
    const {myinfo} = useContext(MyContext);
    return (
        <>
            {/* Accordion */}
            < div className="w3-card w3-round" >
                <div className="w3-white">

                    {(myinfo?.account_type === "Patient") && <><button onClick={() => navto("/AskQuestion")} className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-circle-o-notch fa-fw w3-margin-right" /> Ask Question</button>
                        <button onClick={() => { navto("/Questions/myquestions")}} className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-calendar-check-o fa-fw w3-margin-right" /> My Questions</button></>}
                    {(myinfo?.account_type === "Doctor") && <><button onClick={() => navto("/CreateBlog")} className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-circle-o-notch fa-fw w3-margin-right" /> Create Blog</button>
                        <button onClick={()=>navto("/Myblogs")} className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-calendar-check-o fa-fw w3-margin-right" /> My Blogs</button></>}
                </div>
  
            </div >
            {/*End Accordion */}
        </>
    );
}

export default Accordioncard;