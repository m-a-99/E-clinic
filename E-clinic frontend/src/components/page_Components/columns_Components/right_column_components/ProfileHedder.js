import { useNavigate } from "react-router-dom";

const ProfileHedder = () => {
   const navto= useNavigate();
    return (
        <div onClick={() => navto("/AccountSetting")} className="w3-round w3-theme-d2 w3-margin-bottom w3-margin-right w3-margin-left " style={{ padding: '0.01em 16px', display: 'flex', justifyContent: 'space-between' }}>
            <h2>My Profile</h2>
            <i style={{ fontSize: 30 }} className="fa fa-cog settinggear" aria-hidden="true" />
        </div>
    );
}

export default ProfileHedder;