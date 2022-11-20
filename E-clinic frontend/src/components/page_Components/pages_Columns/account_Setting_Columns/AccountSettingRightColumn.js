import { useContext } from "react";
import { MyContext } from "../../../../context/MyContext";
import AccountSettingHedder from "../../columns_Components/right_column_components/AccountSettingHedder";
import AccountSettingMedicalHistoryOrWorkExperienceCard from "../../columns_Components/right_column_components/AccountSettingMedicalHistoryOrWorkExperienceCard";
import DoctorAccountSettingAdminMessageCard from "../../columns_Components/right_column_components/DoctorAccountSettingAdminMessageCard";
import DoctorAccountSettingEducationCard from "../../columns_Components/right_column_components/DoctorAccountSettingEducationCard";
import DoctorAccountSettingGeneralCard from "../../columns_Components/right_column_components/DoctorAccountSettingGeneralCard";
import DoctorAccountSettingPersonalInfoCard from "../../columns_Components/right_column_components/DoctorAccountSettingPersonalInfoCard";
import PatientAccountSettingGeneralCard from "../../columns_Components/right_column_components/PatientAccountSettingGeneralCard";
//import DoctorAccountSettingWorkExperience from "../../columns_Components/right_column_components/DoctorAccountSettingWorkExperience";
//import PatientAccountSettingMedicalHistory from "../../columns_Components/right_column_components/PatientAccountSettingMedicalHistory";


const AccountSettingRightColumn = (props) => {
    const { myinfo } = useContext(MyContext);
    if (myinfo.account_type === "Patient"){
        const { general, medical_histories}=props.data

        return (
            <>
                <div className="w3-col m9 ">
                    <AccountSettingHedder />
                    <PatientAccountSettingGeneralCard general={general}/>
                    {/* <PatientAccountSettingMedicalHistory Medicalhistories={Medicalhistories}/> */}
                    <AccountSettingMedicalHistoryOrWorkExperienceCard MedicalhistoriesOrWorkExperiances={medical_histories} />

                </div>
            </>
        );
    }
    else if (myinfo.account_type === "Doctor") {
        const { general, personal_info, education, work_experiences, status,status_message } = props.data
        return (
            <>
                <div className="w3-col m9 ">
                    <AccountSettingHedder />
                    <DoctorAccountSettingAdminMessageCard status={status} status_message={status_message}/>
                    <DoctorAccountSettingGeneralCard general={general}/>
                    <DoctorAccountSettingPersonalInfoCard personal_info={personal_info}/>
                    <DoctorAccountSettingEducationCard education={education}/>
                    {/*<DoctorAccountSettingWorkExperience WorkExperiences={WorkExperiences}/>*/}
                    <AccountSettingMedicalHistoryOrWorkExperienceCard MedicalhistoriesOrWorkExperiances={work_experiences} />

                </div>
            </>
        );
    }
  
}

export default AccountSettingRightColumn;