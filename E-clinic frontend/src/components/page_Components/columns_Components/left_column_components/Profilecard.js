import { useContext } from "react";
import { MyContext } from "../../../../context/MyContext";

const Profilecard = () => {
    const {myinfo} = useContext(MyContext);
    return (
        <>
        {/* Profile */ }
        < div className = "w3-card w3-round w3-white" >
            <div className="w3-container">
                <h4 className="w3-center">My Profile</h4>
                    <p className="w3-center"><img src={myinfo.account_photo} className="w3-circle" style={{ height: 106, width: 106 }} alt="Avatar" /></p>
                <hr />
                    <p><i className="fa fa-user-circle	fa-fw w3-margin-right w3-text-theme" />{myinfo.first_name + " " + myinfo.last_name}</p>
                    <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" />{myinfo.location}</p>
                    <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" />{myinfo.birthday}</p>
            </div>
        </div >
        {/* End Profile */ }
        </>
        
     );
}
 
export default Profilecard;