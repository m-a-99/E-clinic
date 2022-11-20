import MidicalHistoryOrWorkExperienceCard from "./components/MedicalhistoryOrWorkExperienceCard";

const PatientProfileMedicalHistoryCard = (props) => {
    const Medicalhistories = props.medical_histories;
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className=" fa fa-suitcase fa-fw " /> Medical history
            </h2>
            {Medicalhistories.map((Medicalhistory, index) => <MidicalHistoryOrWorkExperienceCard data={Medicalhistory} key={index} />)}

            
        </div>
    );
}

export default PatientProfileMedicalHistoryCard;