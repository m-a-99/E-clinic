import { useNavigate } from "react-router-dom";

const QuestionsLeftColumnSpetialiestCard = ({ doctor }) => {
    const { id, first_name, last_name, image, department_details, location, degree } = doctor
    const navto = useNavigate()
    return (
        <div onClick={() => navto("/UserProfile/" + id)} className="w3-card w3-round w3-white w3-margin-bottom boxx">
            <div className="w3-container" style={{wordBreak:"break-all"}}>
                <p className="w3-center"><img src={image} className="w3-circle" style={{ height: '70%', width: '70%' }} alt="Avatar" /></p>
                <hr />
                <p><i className="fa fa-user-circle	fa-fw w3-margin-right w3-text-theme" /> {first_name} {last_name}</p>
                <p><i className="fa fa-certificate fa-fw w3-margin-right w3-text-theme" /> {degree}</p>
                <p><i className="fa fa-th-list fa-fw w3-margin-right w3-text-theme" /> {department_details.name}</p>
                <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> {location}</p>
            </div>
        </div>
    );
}

export default QuestionsLeftColumnSpetialiestCard;