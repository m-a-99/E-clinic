import { useEffect, useLayoutEffect, useRef, useState } from "react";
import usePutFetch from "../../../../custom hooks/usePutFetch";
import cryptoJs from 'crypto-js';


const DoctorAccountSettingPersonalInfoCard = (props) => {
    const {  personal_phone_number,  personal_ID,  face_photo,  marital_status,  location } = props.personal_info;

    const [imghashstate, setimghashstate] = useState()
    const [inputimghash, setinputimghash] = useState()
    const personalPhotoRef = useRef()


    const [PersonalPhoneNumberState, setPersonalPhoneNumberState] = useState(personal_phone_number||"");
    const [PersonalIDState, setPersonalIDState] = useState(personal_ID||"");
    const [PersonalPhotoState, setPersonalPhotoState] = useState(face_photo||"");
    // const [PersonalPhotoFileState, setPersonalPhotoFileState] = useState(null||"");
    const [MaritalStatusState, setMaritalStatusState] = useState(marital_status||"");
    const [LocationState, setLocationState] = useState(location||"");

    const [inputPersonalPhoneNumber, setinputPersonalPhoneNumber] = useState(PersonalPhoneNumberState);
    const [inputPersonalID, setinputPersonalID] = useState(PersonalIDState);
    const [inputPersonalPhoto, setinputPersonalPhoto] = useState(PersonalPhotoState);
    const [inputPersonalPhotoFile, setinputPersonalPhotoFile] = useState(null);
    const [inputMaritalStatus, setinputMaritalStatus] = useState(MaritalStatusState);
    const [inputLocation, setinputLocation] = useState(LocationState);

    const [saveEnabled, setsaveEnabled] = useState(false);
    const [resetEnabled, setresetEnabled] = useState(false);
    useEffect(() => {
        if (PersonalPhoneNumberState === inputPersonalPhoneNumber && PersonalIDState === inputPersonalID && MaritalStatusState === inputMaritalStatus && LocationState === inputLocation && imghashstate === inputimghash) {
            setresetEnabled(false);
            setsaveEnabled(false);
        }
        else {
            setresetEnabled(true);
            setsaveEnabled(true);
        }
    }, [PersonalPhoneNumberState,
        PersonalIDState,
        MaritalStatusState,
        LocationState,
        inputPersonalPhoneNumber,
        inputPersonalID,
        inputMaritalStatus,
        inputLocation,
        imghashstate,
        inputimghash
    ])

    const reset = (e) => {
        e.preventDefault()
        setinputPersonalPhoneNumber(PersonalPhoneNumberState);
        setinputPersonalID(PersonalIDState);
        setinputPersonalPhoto(PersonalPhotoState);
        setinputMaritalStatus(MaritalStatusState);
        setinputLocation(LocationState);
        setinputimghash(imghashstate);
        setinputPersonalPhotoFile(null)
        personalPhotoRef.current.value = "";
    }
    const { data, setdata, IsPending, put } = usePutFetch();

    useEffect(() => {
        if (data) {
            setPersonalPhoneNumberState(data.personal_phone_number);
            setPersonalIDState(data.personal_ID);
            setPersonalPhotoState(data.face_photo);
            setMaritalStatusState(data.marital_status);
            setLocationState(data.location);
            setinputPersonalPhotoFile(null)
            personalPhotoRef.current.value = "";
            setdata(null);
            console.log(data);

        }
    }, [data,setdata]);
    useLayoutEffect(() => {
        const abortCont = new AbortController();
        if (PersonalPhotoState) {
            (async () => {
                try{
                      let res = await fetch(PersonalPhotoState);
                let data = await res.arrayBuffer();
                let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                setimghashstate(hash);
                setinputimghash(hash);
                }
                catch(e){
                    if (e.name === "AbortError")
                        console.log("Aborted")
                
                }
              
            })()

        }

        return () => {
            abortCont.abort();
        };
    }, [PersonalPhotoState]);


    useEffect(() => {
        (async () => {
            if (inputPersonalPhotoFile) {
                let data = await inputPersonalPhotoFile.arrayBuffer()
                let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                setinputimghash(hash);
            }

        })()

    }, [inputPersonalPhotoFile]);
    function save(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('personal_phone_number', inputPersonalPhoneNumber)
        formData.append("personal_ID", inputPersonalID)
        if (inputPersonalPhotoFile)
            formData.append("face_photo", inputPersonalPhotoFile)
        formData.append("location", inputLocation)
        formData.append("marital_status", inputMaritalStatus)

        put("/doctor/edit/personal/info/", formData)
    }

    return (

        // <form action="http://localhost:4000/AccountSettingDoctorPersonalInfoCardUpdate" method="POST" enctype="multipart/form-data">


        //     <input type="file" name="fff" />
        //     <input type="submit" />
        // </form>

        <div style={{ position: "relative" }}>
            {IsPending &&
                < div className="w3-container w3-card  w3-round" style={{ position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
            <div className="w3-container w3-card w3-white w3-round w3-margin">
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-address-card-o" /> Personal Info</h2>
                <form className="w3-container">
                    <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                        <p className=" w3-half w3-margin">
                            <label>Personal phone Number</label>
                            <br />
                            <input className="w3-input " type="text" onChange={(e) => setinputPersonalPhoneNumber(e.target.value)} value={inputPersonalPhoneNumber} />
                        </p>
                        <p className="w3-half w3-margin" >
                            <label >Personal ID</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setinputPersonalID(e.target.value)} value={inputPersonalID} />
                        </p>

                    </div>
                    <div className="w3-row" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className=" w3-half w3-margin" >
                            <div style={{ marginBottom: -26, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <label>Personal Photo</label>
                                <img src={inputPersonalPhoto} className="w3-circle" style={{ height: 35, width: 35 }} alt="Avatar" />
                            </div>
                            <br />
                            <input className="w3-input" type="file" accept="image/*" onChange={(e) => {
                                if (e.target.files[0]) {
                                    setinputPersonalPhoto(URL.createObjectURL(e.target.files[0]));
                                    setinputPersonalPhotoFile(e.target.files[0]);
                                }

                            }
                            } ref={personalPhotoRef} />
                        </div>
                        <p className="w3-half w3-margin" style={{ alignSelf: "end" }}>
                            <label >Marital status</label>
                            <br />
                            <select className="w3-select" name="option" onChange={(e) => setinputMaritalStatus(e.target.value)} value={inputMaritalStatus}>
                                <option value={"unknown"}>Unknown</option>
                                <option value={"Single"}>Single</option>
                                <option value={"Married"}>Married</option>
                                <option value={"Widowed"}>Widowed</option>
                                <option value={"Divorced"}>Divorced</option>

                            </select>
                        </p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className="w3-col w3-margin" style={{ alignSelf: "flex-start" }}>
                            <label>Location</label>
                            <br />
                            <input className="w3-input" type="text" placeholder="Eg. London,Uk" onChange={(e) => setinputLocation(e.target.value)} value={inputLocation} />
                        </p>
                        {/* <div style={{ alignSelf: "center", marginTop: 25, display: "flex", justifyContent: "center", alignItems: "center" }} className="w3-rest w3-theme-d2 w3-right w3-button w3-round ">
                        save
                    </div> */}
                        <button disabled={!resetEnabled} onClick={reset} style={{ alignSelf: "center", marginTop: 25, marginRight: 5, display: "flex", justifyContent: "center", alignItems: "center" }} className="w3-rest w3-theme-d2 w3-right w3-button w3-round ">
                            reset
                        </button>
                        <button disabled={!saveEnabled} onClick={save} style={{ alignSelf: "center", marginTop: 25, display: "flex", justifyContent: "center", alignItems: "center" }} className="w3-rest w3-theme-d2 w3-right w3-button w3-round ">
                            save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DoctorAccountSettingPersonalInfoCard;