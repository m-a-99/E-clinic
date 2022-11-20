import { useEffect, useState } from "react";
import useDeleteFetch from "../../../../custom hooks/useDeleteFetch";
import usePostFetch from "../../../../custom hooks/usePostFetch";
import MedicalhistoryOrWorkExperienceCardWithEdit from "./components/MedicalhistoryOrWorkExperienceCardWithEdit";


const PatientAccountSettingMedicalHistory = (props) => {
    const [addNewMidicalHistory, setaddnewmidicalhistory] = useState(false);
    const Medicalhistories = props.Medicalhistories;
    const [MedicalhistoriesState, setMedicalhistoriesState] = useState(Medicalhistories);

    const [Title, setTitle] = useState("");
    const [TimePeriod, setTimePeriod] = useState("");
    const [body, setbody] = useState("");


    const { data, IsPending, DeleteFetch } = useDeleteFetch();
    const { data: postData, IsPending: PostIsPending, post } = usePostFetch();


    useEffect(() => {
       console.log(postData)
    }, [postData]);

    function add(e) {
        e.preventDefault();
        post("/MedicalhistoryOrWorkExperienceCardWithEditAdd", { Title, TimePeriod, body });
    }


    useEffect(() => {
        if (data) {
            setMedicalhistoriesState(MH => MH.filter((e) => e.id !== data.id));
            console.log(data);
        }
    }, [data]);

    useEffect(() => {
        console.log(MedicalhistoriesState)
    }, [MedicalhistoriesState])

    useEffect(() => {
        if (postData) {
            setTitle("");
            setTimePeriod("");
            setbody("");
            setaddnewmidicalhistory(false)
            setMedicalhistoriesState(MHS=>[...MHS,postData]);
        }
    }, [postData]);

    return (

        <div style={{ position: "relative" }}>
            {(IsPending||PostIsPending) &&
                < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(223 223 223 / 94%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
            <style>{`.xzx{ padding: 5px 16px !important;} `}</style>

            <div className="w3-container w3-card w3-white w3-round w3-margin" style={{ padding: "0px 25px 0 25px" }}>
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-suitcase fa-fw " /> Medical history</h2>

                {MedicalhistoriesState.map((Medicalhistory, index) => < MedicalhistoryOrWorkExperienceCardWithEdit card={Medicalhistory} DeleteFetch={DeleteFetch} key={index} />)}

                <div style={{ overflowY: "hidden" }}>
                    {addNewMidicalHistory && <form className="add_work_ex_temp"><div className="w3-container w3-margin w3-animate-bottom work_temp">
                        <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-around" }}>
                            <p className=" w3-half	 w3-margin">
                                <label>Title</label>
                                <br />
                                <input className="w3-input " onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" value={Title} />
                            </p>
                            <p className="w3-half w3-margin">
                                <label>Time period</label>
                                <br />
                                <input className="w3-input" onChange={(e) => setTimePeriod(e.target.value)} type="text" placeholder="Eg. Mar 2012 - Dec 2014  or  Jan 2015 - Current" value={TimePeriod} />
                            </p>
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

export default PatientAccountSettingMedicalHistory;