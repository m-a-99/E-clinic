import Accordioncard from "../../columns_Components/left_column_components/Accordioncard";
import Interestscard from "../../columns_Components/left_column_components/Interestscard";
import Profilecard from "../../columns_Components/left_column_components/Profilecard";
import UserProfileCard from "../../columns_Components/left_column_components/UserProfileCard";

const UserProfileLeftColumn = ({data}) => {
    return ( 
        <div className="w3-col m3" style={{ position: 'sticky', top: 60, maxHeight: '100%', paddingTop: 3 }}>
            {!data && <Profilecard />}
            {data&&<UserProfileCard data={data} />}
            <br />
            <Accordioncard />
            <br />
            <Interestscard />
        </div>

    );
}
 
export default UserProfileLeftColumn;