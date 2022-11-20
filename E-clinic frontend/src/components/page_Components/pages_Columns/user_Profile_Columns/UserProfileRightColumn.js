import DoctorProfileEducationCard from "../../columns_Components/right_column_components/DoctorProfileEducationCard";
import DoctorProfileGeneralCard from "../../columns_Components/right_column_components/DoctorProfileGeneralCard";
import DoctorProfileWorkExperienceCard from "../../columns_Components/right_column_components/DoctorProfileWorkExperienceCard";
import PatientProfileGeneralCard from "../../columns_Components/right_column_components/PatientProfileGeneralCard";
import PatientProfileMedicalHistoryCard from "../../columns_Components/right_column_components/PatientProfileMedicalHistoryCard";
import UserProfileHedder from "../../columns_Components/right_column_components/UserProfileHedder";

const UserProfileRightColumn = ({data}) => {
    
    if (data.general.account_type === "Patient") {
        const { general, medical_histories } = data;

        return (
            <div className="w3-col m9 ">
                <UserProfileHedder />
                <PatientProfileGeneralCard general={general} />
                <PatientProfileMedicalHistoryCard medical_histories={medical_histories} />
            </div>


        );
    }
    else if (data.general.account_type === "Doctor") {
        const { general, education, work_experiences } =data;

        return (
            <div className="w3-col m9 ">
                <UserProfileHedder />
                <DoctorProfileGeneralCard general={general} />
                <DoctorProfileEducationCard education={education} />
                <DoctorProfileWorkExperienceCard work_experiences={work_experiences} />
            </div>

        );
    }
}
 
export default UserProfileRightColumn;