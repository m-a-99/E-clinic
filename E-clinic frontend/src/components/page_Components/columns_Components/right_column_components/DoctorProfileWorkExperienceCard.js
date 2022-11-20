import MedicalhistoryOrWorkExperienceCard from "./components/MedicalhistoryOrWorkExperienceCard";

const DoctorProfileWorkExperienceCard = (props) => {
    const WorkExperiences = props.work_experiences;
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin">
            <h2 style={{ color: '#4d636f' }}><i className=" fa fa-suitcase fa-fw " /> Work Experience
            </h2>
            {WorkExperiences.map((WorkExperience, index) => <MedicalhistoryOrWorkExperienceCard data={WorkExperience} key={index}/>)}
        
            
            
        </div>

    );
}

export default DoctorProfileWorkExperienceCard;