import AdminMedicalhistoryOrWorkExperienceCard from "./components/AdminMedicalhistoryOrWorkExperienceCard";

const AdminDoctorProfileWorkExperienceCard = (props) => {

    const WorkExperiences = props.work_experiences;
        return (
            <div className="w3-container w3-card w3-white w3-round w3-margin">
                <h2 style={{ color: '#4d636f' }}><i className=" fa fa-suitcase fa-fw " /> Work Experience
                </h2>
                {WorkExperiences.map((WorkExperience, index) => <AdminMedicalhistoryOrWorkExperienceCard data={WorkExperience} key={WorkExperience.id} />)}
            </div>

        );
    } 

 
export default AdminDoctorProfileWorkExperienceCard;