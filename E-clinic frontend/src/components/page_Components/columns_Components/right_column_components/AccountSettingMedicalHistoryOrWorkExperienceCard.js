import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../../../context/MyContext";
import useDeleteFetch from "../../../../custom hooks/useDeleteFetch";
import usePostFetch from "../../../../custom hooks/usePostFetch";
import MedicalhistoryOrWorkExperienceCardWithEdit from "./components/MedicalhistoryOrWorkExperienceCardWithEdit";


const AccountSettingMedicalHistoryOrWorkExperienceCard = (props) => {
    const { myinfo } = useContext(MyContext);
    const [addNewMidicalHistory, setaddnewmidicalhistory] = useState(false);
    const MedicalhistoriesOrWorkExperiances = props.MedicalhistoriesOrWorkExperiances;

    const [MedicalhistoriesOrWorkExperiancesState, setMedicalhistoriesOrWorkExperiancesState] = useState(MedicalhistoriesOrWorkExperiances);

    const [Title, setTitle] = useState("");
    const [TimePeriod, setTimePeriod] = useState("");
    const [body, setbody] = useState("");
    const [AttachmentFile, setAttachmentFile] = useState();

    const AttachmentRef = useRef()
    const { data, IsPending, DeleteFetch } = useDeleteFetch();
    const { data: postData, IsPending: PostIsPending, post } = usePostFetch();




    function add(e) {
        e.preventDefault();
        const formdata=new FormData();
        formdata.append("title",Title)
        formdata.append("time_period",TimePeriod)
        formdata.append("body",body)
        
        if(myinfo.account_type==="Doctor"){
            if (AttachmentFile)
                formdata.append("certificate", AttachmentFile)
            post("/doctor/create/work/experience/", formdata);
        }
        else if(myinfo.account_type==="Patient"){
            post("/patient/create/medical/history/",formdata)
        }
       
    }


    useEffect(() => {
        
        if (data) {
            setMedicalhistoriesOrWorkExperiancesState(MH => MH.filter((e) => e.id !== data.id));
            console.log(data);
        }
    }, [data]);



    useEffect(() => {
        console.log(postData)
        if (postData) {
            setTitle("");
            setTimePeriod("");
            setbody("");
            setaddnewmidicalhistory(false)
            setMedicalhistoriesOrWorkExperiancesState(MHS => [...MHS, { id: postData.id, time_period: postData.time_period, title: postData.title, body: postData.body, certificate: postData.certificate}]);
        }
    }, [postData]);

    return (

        <div style={{ position: "relative" }}>
            {(IsPending || PostIsPending) &&
                < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(223 223 223 / 94%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
            <style>{`.xzx{ padding: 5px 16px !important;} `}</style>

            <div className="w3-container w3-card w3-white w3-round w3-margin" style={{ padding: "0px 25px 0 25px" }}>
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-suitcase fa-fw " />{(myinfo.account_type === "Doctor" && "Work Experiance") || (myinfo.account_type === "Patient" &&"Medical History")}</h2>

                {MedicalhistoriesOrWorkExperiancesState.map((MedicalhistoryOrWorkExperience, index) => < MedicalhistoryOrWorkExperienceCardWithEdit card={MedicalhistoryOrWorkExperience} DeleteFetch={DeleteFetch} key={MedicalhistoryOrWorkExperience.id} />)}

                <div style={{ overflowY: "hidden" }}>
                    {addNewMidicalHistory && <form className="add_work_ex_temp"><div className="w3-container w3-margin w3-animate-bottom work_temp">
                        <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-around" }}>
                            <p className={(myinfo.account_type === "Doctor" ? "w3-third" : "w3-half") + " w3-margin"}>
                                <label>Title</label>
                                <br />
                                <input className="w3-input " onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" value={Title} />
                            </p>
                            <p className={(myinfo.account_type === "Doctor" ? "w3-third" : "w3-half") + " w3-margin"}>
                                <label>Time period</label>
                                <br />
                                <input className="w3-input" onChange={(e) => setTimePeriod(e.target.value)} type="text" placeholder="Eg. Mar 2012 - Dec 2014  or  Jan 2015 - Current" value={TimePeriod} />
                            </p>
                            {(myinfo.account_type==="Doctor")&&<div className="w3-third w3-margin">
                                <label>Attachment</label>
                                <br />
                                <div className="w3-input" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input type="file" onChange={(e) => {
                                        setAttachmentFile(e.target.files[0]);
                                    }
                                    } ref={AttachmentRef} />
                                </div>
                            </div>}
                            <div onClick={() => setaddnewmidicalhistory(false)} className="w3-rest closebtn w3-right" style={{ fontSize: 20, maxWidth: '5%' }}>
                                <i style={{ paddingRight: 5 }} className="fa fa-times" />
                            </div>
                        </div>
                        <div className="w3-row w3-margin ">
                            <label >body</label>

                            <div style={{ display: "flex", justifyContent: "space-between", marginRight: -32 }}>
                                {/*<input class="w3-input" type="text">*/}
                                <textarea onChange={(e) => setbody(e.target.value)} id="w3review" name="w3review" rows={3} cols={77} style={{ resize: 'none' }} value={body} />
                                <button onClick={add} className="w3-rest w3-theme-d2 w3-right w3-button w3-round" style={{ marginLeft: 25, alignSelf: "end", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    add
                                </button>
                            </div>

                        </div>
                    </div>
                    </form>}
                </div>


                <br />

                {!addNewMidicalHistory && !IsPending && <div style={{ textAlign: 'center', marginBottom: -20 }}>
                    <div onClick={() => { setaddnewmidicalhistory(true) }} className="w3-button  w3-theme-d2 w3-xlarge w3-circle xzx" >+</div>
                </div>}
            </div>
        </div>


    );
}

export default AccountSettingMedicalHistoryOrWorkExperienceCard;