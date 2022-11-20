import { useEffect, useState } from "react";
import useFetch from "../../../../custom hooks/useFetch";
import usePutFetch from "../../../../custom hooks/usePutFetch";

const DoctorAccountSettingGeneralCard = (props) => {

    const { work_phone_number,  email, Gender, first_name,  last_name,  birthday, about_me, specialization,  years_of_experience } = props.general;
    
    const [WorkPhoneNumberState, setWorkPhoneNumberState] = useState(work_phone_number||"");
    const [EmailState, setEmailState] = useState(email||"");
    const [GenderState, setGenderState] = useState(Gender||"unknown");
    const [FirstNameState, setFirstNameState] = useState(first_name||"");
    const [LastNameState, setLastNameState] = useState(last_name||"");
    const [BirthdayState, setBirthdayState] = useState(birthday||"");
    const [AboutMeState, setAboutMeState] = useState(about_me||"");
    const [SpecializationState, setSpecializationState] = useState(specialization||"");
    const [YearsOfExperienceState, setYearsOfExperienceState] = useState(years_of_experience||"");

    const [InputWorkPhoneNumber, setInputWorkPhoneNumber] = useState(WorkPhoneNumberState);
    const [InputEmail, setInputEmail] = useState(EmailState);
    const [InputGender, setInputGender] = useState(GenderState);
    const [InputFirstName, setInputFirstName] = useState(FirstNameState);
    const [InputLastName, setInputLastName] = useState(LastNameState);
    const [InputAboutMe, setInputAboutMe] = useState(AboutMeState);
    const [InputBirthday, setInputBirthday] = useState(BirthdayState);
    const [InputSpecialization, setInputSpecialization] = useState(SpecializationState);
    const [InputYearsOfExperience, setInputYearsOfExperience] = useState(YearsOfExperienceState);

    const [saveEnabled, setsaveEnabled] = useState(false);
    const [resetEnabled, setresetEnabled] = useState(false);
    useEffect(() => {
        if (InputWorkPhoneNumber === WorkPhoneNumberState && InputEmail === EmailState && InputGender === GenderState && InputFirstName === FirstNameState && InputLastName === LastNameState && InputAboutMe === AboutMeState && InputBirthday === BirthdayState && InputSpecialization === SpecializationState && InputYearsOfExperience === YearsOfExperienceState) {
            setresetEnabled(false);
            setsaveEnabled(false);
        }
        else {
            console.log(InputWorkPhoneNumber , WorkPhoneNumberState , InputEmail , EmailState , InputGender , GenderState , InputFirstName , FirstNameState , InputLastName , LastNameState , InputAboutMe , AboutMeState , InputBirthday , BirthdayState , InputSpecialization , SpecializationState , InputYearsOfExperience , YearsOfExperienceState)
            setresetEnabled(true);
            setsaveEnabled(true);
        }
    }, [WorkPhoneNumberState, EmailState, GenderState, FirstNameState, LastNameState,
        BirthdayState, AboutMeState, SpecializationState, YearsOfExperienceState,
        InputWorkPhoneNumber, InputEmail, InputGender, InputFirstName,
        InputLastName, InputAboutMe, InputBirthday, InputSpecialization,
        InputYearsOfExperience])

    const reset = (e) => {
        e.preventDefault()
        setInputWorkPhoneNumber(WorkPhoneNumberState);
        setInputEmail(EmailState);
        setInputGender(GenderState);
        setInputFirstName(FirstNameState);
        setInputLastName(LastNameState);
        setInputAboutMe(AboutMeState);
        setInputBirthday(BirthdayState);
        setInputSpecialization(SpecializationState);
        setInputYearsOfExperience(YearsOfExperienceState);
    }
    const { data, IsPending, put } = usePutFetch();

    const { post:chatupdatename}= useFetch()

    useEffect(() => {
        if (data) {
            setWorkPhoneNumberState(data.work_phone_number||"");
            setEmailState(data.email||"");
            setGenderState(data.gender||"unknown");
            setFirstNameState(data.first_name||"");
            setLastNameState(data.last_name||"");
            setBirthdayState(data.birthday||"");
            setAboutMeState(data.about_me||"");
            setSpecializationState(data.specialization||"");
            setYearsOfExperienceState(data.years_of_experience||"");
            
            console.log(data);
        }
    }, [data]);
    function save(e) {
        e.preventDefault()
        const formdata=new FormData();
        formdata.append("work_phone_number", InputWorkPhoneNumber)
        formdata.append("email", InputEmail)
        formdata.append("gender" ,InputGender)
        formdata.append("first_name", InputFirstName)
        formdata.append("last_name", InputLastName)
        formdata.append("about_me", InputAboutMe,)
        formdata.append("birthday", InputBirthday)
        formdata.append("specialization", InputSpecialization)
        formdata.append("years_of_experience", InputYearsOfExperience)



        put("/doctor/edit/general/info/", formdata)

        if(InputFirstName!==FirstNameState||InputLastName!==LastNameState)
        chatupdatename("http://localhost:4000/api/updatemyname",JSON.stringify({name:InputFirstName+" "+InputLastName}),"json","PUT");

    }


    return (
        <div style={{ position: "relative" }}>
            {IsPending &&
                < div className="w3-container w3-card  w3-round" style={{ position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
            <div className="w3-container w3-card w3-white w3-round w3-margin" style={{ padding: "0px 25px 0 25px" }}>
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-user-md	" /> General</h2>
                <form className="w3-container">
                    <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
                        <p className=" w3-third	 w3-margin" >
                            <label>Work Phone Number</label>
                            <br />
                            <input className="w3-input " type="text" onChange={(e) => setInputWorkPhoneNumber(e.target.value)} value={InputWorkPhoneNumber} />
                        </p>
                        <p className="w3-third w3-margin" >
                            <label >Email</label>
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
                        <p className=" w3-third w3-margin" >
                            <label>First Name</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setInputFirstName(e.target.value)} value={InputFirstName} />
                        </p>
                        <p className="w3-third w3-margin">
                            <label>Last Name</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setInputLastName(e.target.value)} value={InputLastName} />
                        </p>
                        <p className=" w3-third w3-margin" >
                            <label>Birthday</label>
                            <br />
                            <input className="w3-input" type="date" onChange={(e) => setInputBirthday(e.target.value)} value={InputBirthday} />
                        </p>
                    </div>
                    <div className="w3-row" >
                        <div className=" w3-margin" style={{ display: "flex", flexDirection: "column" }}>
                            <label>About me</label>
                            <br />
                            <textarea id="w3review" name="w3review" rows={3} cols={90} style={{ resize: 'none' }} onChange={(e) => setInputAboutMe(e.target.value)} value={InputAboutMe} />
                        </div>
                    </div>
                    <div className="w3-row" style={{ display: "flex", justifyContent: "space-between" }}>
                        
                             <p className="w3-half w3-margin" >
                            <label>Years of Experience</label>
                            <br />
                            <input className="w3-input" type="number" onChange={(e) => setInputYearsOfExperience(Number.parseInt(e.target.value)||"")} value={InputYearsOfExperience} />
                        </p>
                        <p className="w3-half w3-margin">
                            <label>Specialization</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setInputSpecialization(e.target.value)} value={InputSpecialization} />
                        </p>
                       
                        {/* {
                            <button style={{ alignSelf: "center", marginTop: 25, display: "flex", justifyContent: "center", alignItems: "center" }} className="w3-rest w3-theme-d2 w3-right w3-button w3-round ">
                                save
                            </button>
                        } */}

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

export default DoctorAccountSettingGeneralCard;