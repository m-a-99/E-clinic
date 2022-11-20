import { useContext } from "react";
import { MyContext } from "../../../../context/MyContext";
import DoctorProfileEducationCard from "../../columns_Components/right_column_components/DoctorProfileEducationCard";
import DoctorProfileGeneralCard from "../../columns_Components/right_column_components/DoctorProfileGeneralCard";
import DoctorProfileWorkExperienceCard from "../../columns_Components/right_column_components/DoctorProfileWorkExperienceCard";
import PatientProfileGeneralCard from "../../columns_Components/right_column_components/PatientProfileGeneralCard";
import PatientProfileMedicalHistoryCard from "../../columns_Components/right_column_components/PatientProfileMedicalHistoryCard";
import ProfileHedder from "../../columns_Components/right_column_components/ProfileHedder";

const ProfileRightColumn = (props) => {
    const {myinfo} = useContext(MyContext);
    if (myinfo.account_type==="Patient") {
        const { general, medical_histories } = props.data;

        return (
            <div className="w3-col m9 ">
                <ProfileHedder/>
                <PatientProfileGeneralCard general={general}/>
                <PatientProfileMedicalHistoryCard medical_histories={medical_histories}/>
            </div>


        );
    }
    else if(myinfo.account_type==="Doctor") {
        const { general, education, work_experiences } = props.data;

        return (
            <div className="w3-col m9 ">
                <ProfileHedder />
                <DoctorProfileGeneralCard general={general} />
                <DoctorProfileEducationCard education={education}/>
                <DoctorProfileWorkExperienceCard work_experiences={work_experiences}/>
            </div>

        );
    }
}

export default ProfileRightColumn;