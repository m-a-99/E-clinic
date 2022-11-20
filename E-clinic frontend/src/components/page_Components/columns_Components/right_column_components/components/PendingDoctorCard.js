import { useNavigate } from "react-router-dom";

const PendingDoctorCard = ({doctor}) => {
    const { id, first_name, last_name, image, specialization, university, degree}=doctor;
    console.log("aaaaaaaaa",doctor)
    const navto=useNavigate()
    return (

        <div className="cardcard w3-white" style={{ display: "flex", flexDirection: "column" ,width:250 }}>
            <img src={image} alt="John" style={{ objectFit:"cover",height:150}} />
            <h3 style={{ margin: 5 }}>{first_name + " " + last_name} </h3>
            <div className="cardtitle">{degree}</div>
            <div className="cardtitle">{specialization} </div>
            <div>{university}</div>
            <br />
            <div style={{ display: "flex", flexDirection: "column" ,justifyContent:"end",height:'100%'}}>
                <button onClick={()=>navto("/DoctorProfile/"+id)} className="cardbutton">Show Profile</button>

            </div>
        </div>

    );
}

export default PendingDoctorCard;