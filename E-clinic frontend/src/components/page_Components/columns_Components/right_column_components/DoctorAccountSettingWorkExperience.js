import {useState } from "react";
import MedicalhistoryOrWorkExperienceCardWithEdit from "./components/MedicalhistoryOrWorkExperienceCardWithEdit";

const DoctorAccountSettingWorkExperience = (props) => {
    const WorkExperiences = props.WorkExperiences;
    const [addWorkExperience, setaddWorkExperience] = useState(false);


    return (
        <>
            <style>{`.xzx{ padding: 5px 16px !important;}`}</style>
            <div className="w3-container w3-card w3-white w3-round w3-margin" style={{ padding: "0px 25px 0 25px" }}>
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-suitcase fa-fw " /> Work Experience</h2>
                {WorkExperiences.map((WorkExperience, index) => < MedicalhistoryOrWorkExperienceCardWithEdit card={WorkExperience} key={index} />)}




                <div style={{overflowY:"hidden"}}>
                    {addWorkExperience && <form className="add_work_ex_temp"><div className="w3-container w3-margin w3-animate-bottom work_temp">
                    <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-around" }}>
                        <p className=" w3-half	 w3-margin">
                            <label>Title</label>
                            <br />
                            <input className="w3-input " type="text" placeholder="Title" />
                        </p>
                        <p className="w3-half w3-margin">
                            <label>Time period</label>
                            <br />
                            <input className="w3-input" type="text" placeholder="Eg. Mar 2012 - Dec 2014  or  Jan 2015 - Current" />
                        </p>
                        <div onClick={() => setaddWorkExperience(false)} className="w3-rest closebtn w3-right" style={{ fontSize: 20, maxWidth: '5%' }}>
                            <i style={{ paddingRight: 5 }} className="fa fa-times" />
                        </div>
                    </div>
                    <div className="w3-row w3-margin ">
                        <label >body</label>

                        <div style={{ display: "flex", justifyContent: "space-between", marginRight: -32 }}>
                            {/*<input class="w3-input" type="text">*/}
                            <textarea id="w3review" name="w3review" rows={3} cols={77} style={{ resize: 'none' }} defaultValue={""} />
                            <div className="w3-rest w3-theme-d2 w3-right w3-button w3-round" style={{ marginLeft: 25, alignSelf: "end", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                add
                            </div>
                        </div>

                    </div>
                </div>
                </form>}
                </div>

                {!addWorkExperience && <div style={{ textAlign: 'center', marginBottom: -20 }}>
                    <div onClick={() => { setaddWorkExperience(true) }} className="w3-button  w3-theme-d2 w3-xlarge w3-circle xzx" >+</div>
                </div>}
            </div>
        </>

    );
}

export default DoctorAccountSettingWorkExperience;