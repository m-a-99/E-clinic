import Accordioncard from "../../columns_Components/left_column_components/Accordioncard";
import Interestscard from "../../columns_Components/left_column_components/Interestscard";
import Profilecard from "../../columns_Components/left_column_components/Profilecard";


const HomeLeftColumn = () => {
    return ( 
        <div className="w3-col m3" style={{ position: 'sticky', top: 60, maxHeight: '100%' ,paddingTop:3 }}>
            
            <Profilecard/>
            <br />
            <Accordioncard/>
            <br />
            <Interestscard/>

           
            {/* Alert Box */}
            {/* <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                <span className="w3-button w3-theme-l3 w3-display-topright">
                    <i className="fa fa-remove" />
                </span>
                <p><strong>Hey!</strong></p>
                <p>People are looking at your profile. Find out who.</p>
            </div> */}
            {/* End Left Column */}
        </div>


     );
}
 
export default HomeLeftColumn;