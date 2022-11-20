import AdminDoctorProfileEducationCard from "../../columns_Components/right_column_components/AdminDoctorProfileEducationCard";
import AdminDoctorProfileGeneralCard from "../../columns_Components/right_column_components/AdminDoctorProfileGeneralCard";
import AdminDoctorProfilePersonalInfoCard from "../../columns_Components/right_column_components/AdminDoctorProfilePersonalInfoCard";
import DoctorProfileHedder from "../../columns_Components/right_column_components/DoctorProfileHedder";
import DoctorProfileWorkExperienceCard from "../../columns_Components/right_column_components/DoctorProfileWorkExperienceCard";

const DoctorProfileMiddleColumn = ({data}) => {

    return (
        <div className="w3-col m8" style={{marginTop:15}} >
            <DoctorProfileHedder/>
            <AdminDoctorProfileGeneralCard general={data.general} />
            <AdminDoctorProfileEducationCard education={data.education} />
            <AdminDoctorProfilePersonalInfoCard personal_info={data.personal_info} />
            <DoctorProfileWorkExperienceCard work_experiences={data.work_experiences} />
        </div>
    );
}

export default DoctorProfileMiddleColumn;