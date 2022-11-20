import { useEffect, useState } from "react";
import usePutFetch from "../../../../custom hooks/usePutFetch";
import "../../../../css/loader.css"

const PatientAccountSettingGeneralCard = (props) => {


    const {personal_phone_number,email,gender,  first_name, last_name,  birthday, about_me, location } = props.general;
    const [PhoneNumberState, setPhoneNumberState] = useState(personal_phone_number);
    const [EmailState, setEmailState] = useState(email);
    const [GenderState, setGenderState] = useState(gender);
    const [FirstNameState, setFirstNameState] = useState(first_name);
    const [LastNameState, setLastNameState] = useState(last_name);
    const [AboutMeState, setAboutMeState] = useState(about_me);
    const [LocationState, setLocationState] = useState(location);
    const [BirthdayState, setBirthdayState] = useState(birthday);


    const [InputPhoneNumber, setInputPhoneNumber] = useState(PhoneNumberState);
    const [InputEmail, setInputEmail] = useState(EmailState);
    const [InputGender, setInputGender] = useState(GenderState);
    const [InputFirstName, setInputFirstName] = useState(FirstNameState);
    const [InputLastName, setInputLastName] = useState(LastNameState);
    const [InputAboutMe, setInputAboutMe] = useState(AboutMeState);
    const [InputLocation, setInputLocation] = useState(LocationState);
    const [InputBirthday, setInputBirthday] = useState(BirthdayState);

    const [saveEnabled, setsaveEnabled] = useState(false);
    const [resetEnabled, setresetEnabled] = useState(false);

    useEffect(() => {
        if (InputPhoneNumber === PhoneNumberState && InputEmail === EmailState && InputGender === GenderState && InputFirstName === FirstNameState && InputLastName === LastNameState && InputAboutMe === AboutMeState && InputLocation === LocationState && InputBirthday === BirthdayState) {
            setresetEnabled(false);
            setsaveEnabled(false);
        }
        else {
            setresetEnabled(true);
            setsaveEnabled(true);
        }
    }, [InputPhoneNumber, InputEmail, InputGender, InputFirstName,
        InputLastName, InputAboutMe, InputLocation, InputBirthday,
        PhoneNumberState, EmailState, GenderState, FirstNameState,
        LastNameState, AboutMeState, LocationState, BirthdayState])

    const reset = (e) => {
        e.preventDefault()
        setInputPhoneNumber(PhoneNumberState);
        setInputEmail(EmailState);
        setInputGender(GenderState);
        setInputFirstName(FirstNameState);
        setInputLastName(LastNameState);
        setInputAboutMe(AboutMeState);
        setInputLocation(LocationState);
        setInputBirthday(BirthdayState)
    }
    const { data, IsPending, put } = usePutFetch();
    useEffect(() => {
        console.log(data)
        if (data) {
            setPhoneNumberState(data.personal_phone_number);
            setEmailState(data.email);
            setGenderState(data.gender);
            setFirstNameState(data.first_name);
            setLastNameState(data.last_name);
            setAboutMeState(data.about_me);
            setLocationState(data.location);
            setBirthdayState(data.birthday);
            console.log(data);

        }
    }, [data]);
    function save(e) {
        e.preventDefault();
        const formdata=new FormData();
        formdata.append("first_name", InputFirstName)
        formdata.append("last_name", InputLastName)
        formdata.append("email", InputEmail)
        formdata.append("birthday", InputBirthday)
        formdata.append("gender", InputGender)
        formdata.append("about_me", InputAboutMe)
        formdata.append("location", InputLocation)
        formdata.append("personal_phone_number", InputPhoneNumber)


        put("/patient/edit/general/info/", formdata)
    }

    return (
        <div style={{ position: "relative" }}>
            {IsPending &&
                < div className="w3-container w3-card  w3-round" style={{ position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }

            <div className="w3-container w3-card w3-white w3-round w3-margin" style={{ padding: "0px 25px 0 25px" }}>

                <h2 style={{ color: '#4d636f' }}><i className="fa fa-user-circle-o" /> General</h2>
                <form className="w3-container">

                    <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                        <p className=" w3-third	 w3-margin" >
                            <label>Phone Number</label>
                            <br />
                            <input className="w3-input " type="text" onChange={(e) => setInputPhoneNumber(e.target.value)} value={InputPhoneNumber} />
                        </p>
                        <p className="w3-third w3-margin" >
                            <label>Email</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setInputEmail(e.target.value)} value={InputEmail} />
                        </p>
                        <p className="w3-third w3-margin" >
                            <label>Gender</label>
                            <br />
                            <select className="w3-select w3-round" name="option" onChange={(e) => setInputGender(e.target.value)} value={InputGender}>
                                <option value={""}>Choose your option</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select>
                        </p>
                    </div>
                    <div className="w3-row" style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className=" w3-half w3-margin">
                            <label>First Name</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setInputFirstName(e.target.value)} value={InputFirstName} />
                        </p>
                        <p className="w3-half w3-margin">
                            <label>Last Name</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setInputLastName(e.target.value)} value={InputLastName} />
                        </p>
                    </div>
                    <div className="w3-row" >
                        <p className=" w3-margin" style={{ display: "flex", flexDirection: "column" }}>
                            <label>About me</label>
                            <br />
                            <textarea id="w3review" name="w3review" rows={3} cols={90} style={{ resize: 'none' }} onChange={(e) => setInputAboutMe(e.target.value)} value={InputAboutMe} />
                        </p>
                    </div>
                    <div className="w3-row" style={{ display: "flex", justifyContent: "space-between" }} >
                        <p className=" w3-half w3-margin" >
                            <label>Birthday</label>
                            <br />
                            <input className="w3-input" type="date" required pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => setInputBirthday(e.target.value)} value={InputBirthday} />
                        </p>
                        <p className="w3-half w3-margin" >
                            <label>Location</label>
                            <br />
                            <input className="w3-input" type="text" placeholder="Eg. London,Uk" onChange={(e) => setInputLocation(e.target.value)} value={InputLocation} />
                        </p>

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

export default PatientAccountSettingGeneralCard;