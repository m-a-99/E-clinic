import Accordioncard from "../../columns_Components/left_column_components/Accordioncard";
import Interestscard from "../../columns_Components/left_column_components/Interestscard";
import ProfilePhotoEdit from "../../columns_Components/left_column_components/ProfilePhotoEdit";


const AccountSettingLeftColumn = () => {
    return (
        <div className="w3-col m3" style={{ position: 'sticky', top: 60, maxHeight: '100%' }}>
            <ProfilePhotoEdit />
            <br />
            <Accordioncard />
            <br />
            <Interestscard />
        </div>

    );
}

export default AccountSettingLeftColumn;