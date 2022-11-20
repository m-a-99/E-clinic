import { useNavigate } from "react-router-dom";

const QuestionsMiddleColumnQuestionCard = ({question}) => {
   const navto= useNavigate();
    const { id: question_id, patient_details, title, body, to_doctor_details, department_details, files_details, discussions_count, created_at}=question;
    const { id:patient_id, full_name,image, } = patient_details
    return (
        <div onClick={() => navto("/Questions/"+question_id.toString())} className="w3-container w3-card w3-white w3-round w3-margin boxx"><br />
            <img  src={image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60 }} />
            <span className="w3-right w3-opacity">{new Date(created_at).toLocaleString()}</span>
            <h4>{full_name}</h4><br />
            <hr className="w3-clear" />
            <h4>{title}</h4>
            <p>{body}</p>
            <div style={{ display: "flex", justifyContent: "space-between"  }}>
                <div style={{ display: "flex", alignItems: "center" }}>

                    <pre>
                        <span  className="w3-opacity"><i style={{WebkitTextStroke:"thin"}}className="fa fa-stethoscope w3-large" /> {department_details.name} </span>

                    </pre>
                </div>
 
                <div style={{ display: "flex", alignItems: "center" }}>
                    
                    <pre>
                        <span className="w3-opacity"><i className="fa fa-file" /> {files_details.length} </span>
                        <span className="w3-opacity"><i className="fa fa-comment" /> {discussions_count} </span>
                    </pre>
                </div>

            </div>
        </div>

    );
}

export default QuestionsMiddleColumnQuestionCard;