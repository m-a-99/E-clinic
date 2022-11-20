import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";

const Navbar = () => {
    const navto=useNavigate();
    const{myinfo}=useContext(MyContext);
    
    return (<div className="w3-top" style={{ zIndex: 5}}>
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
            <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="/"><i className="fa fa-bars" /></a>
            <div onClick={()=>navto("/")} className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-home w3-margin-right" />Logo</div>
            <div onClick={() => navto("/Questions")} className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe" /></div>
            <div onClick={()=>navto("/accountSetting")} className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user" /></div>
            {(myinfo.status === "Accepted"&&myinfo.account_type==="Doctor") && <><a href="https://localhost:5000" target={"_blank"} rel="noreferrer" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa  fa-video-camera" /></a>
                <a href="http://localhost:4000" target={"_blank"} rel="noreferrer" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-comments" /></a></>}
            {(myinfo.account_type === "Patient") && <><a href="https://localhost:5000" target={"_blank"} rel="noreferrer" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa  fa-video-camera" /></a>
                <a href="http://localhost:4000" target={"_blank"} rel="noreferrer" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-comments" /></a></>}


            {/* <div onClick={() => navto("/Question/myquestion")} className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="my question"><i className="fa fa-envelope" /></div> */}
            
            <div onClick={()=>{navto("/Profile")}} className="w3-bar-item w3-button w3-hide-small w3-right w3-hover-white" title="My Account">
                <img src={myinfo.account_photo} className="w3-circle" style={{ height: 35, width: 35 }} alt="Avatar" />
            </div>
        </div>
    </div>);
}
 
export default Navbar;