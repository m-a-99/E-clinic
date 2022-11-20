import { useNavigate } from "react-router-dom";

const AccountSettingHedder = () => {
    const navto=useNavigate()
    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
   function logout(){

       eraseCookie("token")
       navto("/login")
   }
    return (
        <>
            <style>{`.xx{margin-top:0 !important;}`}</style>
            <div className="w3-container w3-card w3-round w3-theme-d2 w3-margin xx" style={{display:"flex"}}>
                <div style={{ width:"-webkit-fill-available"}}>
                    <h2>Edit My Profile</h2>

                </div>
                <div style={{ width:"-webkit-fill-available",display:"flex",justifyContent:"end"}}>
                    <button onClick={logout} className="w3-button">Logout</button>

                </div>
              
            </div>
        </>

    );
}

export default AccountSettingHedder;