import { useEffect, useLayoutEffect, useRef, useState } from "react";
import usePutFetch from "../../../../custom hooks/usePutFetch";
import ViewPdfFullScreen from "./components/ViewPdfFullScreen";
import cryptoJs from 'crypto-js';

const DoctorAccountSettingEducationCard = (props) => {
    const { university,  degree, time_period,  certificate, medical_licence } = props.education;

    const [UniversityState, setUniversityState] = useState(university||"");
    const [DegreeState, setDegreeState] = useState(degree||"");
    const [TimePeriodState, setTimePeriodState] = useState(time_period||"");
    const [GraduateCertificateState, setGraduateCertificateState] = useState(certificate||"");
    const [MedicalLicenseState, setMedicalLicenseState] = useState(medical_licence||"");
    
    const [inputUniversity, setinputUniversity] = useState(UniversityState);
    const [inputDegree, setinputDegree] = useState(DegreeState);
    const [inputTimePeriod, setinputTimePeriod] = useState(TimePeriodState);
    const [inputGraduateCertificate, setinputGraduateCertificate] = useState(GraduateCertificateState);
    const [inputGraduateCertificateFile, setinputGraduateCertificateFile] = useState(null);
    const [inputMedicalLicense, setinputMedicalLicense] = useState(MedicalLicenseState);
    const [inputMedicalLicenseFile, setinputMedicalLicenseFile] = useState(null);

    const [showGraduateCertificate, setshowGraduateCertificate] = useState(false);
    const [showMedicalLicense, setshowMedicalLicense] = useState(false);

    const [GraduateCertificateHashState, setGraduateCertificateHashState] = useState()
    const [inputGraduateCertificateHash, setinputGraduateCertificateHash] = useState()

    const [MedicalLicenseHashState, setMedicalLicenseHashState] = useState()
    const [inputMedicalLicenseHash, setinputMedicalLicenseHash] = useState()

    const GraduateCertificateRef = useRef()
    const MedicalLicenseRef = useRef()

    const [saveEnabled, setsaveEnabled] = useState(false);
    const [resetEnabled, setresetEnabled] = useState(false);
    useEffect(() => {
        if (UniversityState === inputUniversity && DegreeState === inputDegree && TimePeriodState === inputTimePeriod && GraduateCertificateHashState === inputGraduateCertificateHash && MedicalLicenseHashState === inputMedicalLicenseHash) {
            setresetEnabled(false);
            setsaveEnabled(false);
        }
        else {
            setresetEnabled(true);
            setsaveEnabled(true);
        }
    }, [UniversityState,
        inputUniversity,
        DegreeState,
        inputDegree,
        TimePeriodState,
        inputTimePeriod,
        GraduateCertificateHashState,
        inputGraduateCertificateHash,
        MedicalLicenseHashState,
        inputMedicalLicenseHash
    ])

    const reset = (e) => {
        e.preventDefault()
        setUniversityState(UniversityState)
        setDegreeState(DegreeState)
        setTimePeriodState(TimePeriodState)

        setinputGraduateCertificate(certificate)
        setinputMedicalLicense(medical_licence)

        setinputGraduateCertificateHash(GraduateCertificateHashState);
        setinputMedicalLicenseHash(MedicalLicenseHashState);

        setinputGraduateCertificateFile(null)
        setinputMedicalLicenseFile(null)

        GraduateCertificateRef.current.value = "";
        MedicalLicenseRef.current.value = "";

    }
    const { data, setdata, IsPending, put } = usePutFetch();

    useEffect(() => {
        if (data) {
            setUniversityState(data.university);
            setDegreeState(data.degree);
            setTimePeriodState(data.time_period);
            setGraduateCertificateState(data.certificate);
            setMedicalLicenseState(data.medical_licence);
            setinputGraduateCertificateFile(null)
            setinputMedicalLicenseFile(null)

            GraduateCertificateRef.current.value = "";
            MedicalLicenseRef.current.value = "";

            setdata(null);
           
        }
    }, [data, setdata]);

    useLayoutEffect(() => {
        const abortCont = new AbortController();
        if(GraduateCertificateState){
            (async () => {
                try {
                    let res = await fetch(GraduateCertificateState, { signal: abortCont.signal });
                    let data = await res.arrayBuffer();
                    let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                    setGraduateCertificateHashState(hash);
                    setinputGraduateCertificateHash(hash);
                }
                catch (e) {
                    if (e.name === "AbortError")
                        console.log("Aborted")
                
                }

            })()
        }
        
        
        return ()=>{
            abortCont.abort()
        }
    }, [GraduateCertificateState]);

    useLayoutEffect(() => {
        const abortCont = new AbortController();
        if (MedicalLicenseState){
             (async () => {
            try {
                let res = await fetch(MedicalLicenseState, { signal: abortCont.signal });
                let data = await res.arrayBuffer();
                let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                setMedicalLicenseHashState(hash);
                setinputMedicalLicenseHash(hash);
            }
            catch (e) {
                if (e.name ==="AbortError")
                    console.log("Aborted")
            }

        })()

        }
       
        return () => {
            abortCont.abort()
        }
    }, [MedicalLicenseState]);


    useEffect(() => {
        (async () => {
            if (inputGraduateCertificateFile) {
                let data = await inputGraduateCertificateFile.arrayBuffer()
                let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                setinputGraduateCertificateHash(hash);
            }

        })()

    }, [inputGraduateCertificateFile]);

    useEffect(() => {
        (async () => {
            if (inputMedicalLicenseFile) {
                let data = await inputMedicalLicenseFile.arrayBuffer()
                let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                setinputMedicalLicenseHash(hash);
            }

        })()

    }, [inputMedicalLicenseFile]);


    function save(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('university', inputUniversity)
        formData.append("degree", inputDegree)
        formData.append("time_period", inputTimePeriod)
        if (inputGraduateCertificateFile)
        formData.append("certificate", inputGraduateCertificateFile)
        if (inputMedicalLicenseFile)
        formData.append("medical_licence", inputMedicalLicenseFile)
        put("/doctor/edit/education/info/", formData)
    }







    function openGraduateCertificate(e) {
        e.preventDefault();
        setshowGraduateCertificate(true)
    }
    function openMedicalLicense(e) {
        e.preventDefault();
        setshowMedicalLicense(true)
    }



    return (
        <div style={{ position: "relative" }}>
           
            {IsPending &&
                < div className="w3-container w3-card  w3-round" style={{ position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
            {/* {showGraduateCertificate && <ViewPdfFullScreen close={() => { setshowGraduateCertificate(false) }} url={inputGraduateCertificate} />}
            {showMedicalLicense && <ViewPdfFullScreen close={() => { setshowMedicalLicense(false) }} url={inputMedicalLicense} />} */}

            <div className="w3-container w3-card w3-white w3-round w3-margin">
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-mortar-board" /> Education</h2>
                <form className="w3-container">
                    <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }} >
                        <p className=" w3-third	 w3-margin">
                            <label>University</label>
                            <br />
                            <input className="w3-input " type="text" onChange={(e) => setinputUniversity(e.target.value)} value={inputUniversity} />
                        </p>
                        <p className="w3-third w3-margin" >
                            <label>Degree</label>
                            <br />
                            <input className="w3-input" type="text" onChange={(e) => setinputDegree(e.target.value)} value={inputDegree} />
                        </p>
                        <p className="w3-third w3-margin" >
                            <label>Time period</label>
                            <br />
                            <input className="w3-input" type="text" placeholder="Eg. 1997-2005" onChange={(e) => setinputTimePeriod(e.target.value)} value={inputTimePeriod} />
                        </p>
                    </div>
                    <div className="w3-row" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className=" w3-rest w3-margin" >
                            <label>Graduate Certificate in Medicine</label>
                            <br />
                            <div className="w3-input" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <input type="file" onChange={(e) => {
                                    setinputGraduateCertificate(URL.createObjectURL(e.target.files[0]));
                                    setinputGraduateCertificateFile(e.target.files[0]);
                                }
                                } ref={GraduateCertificateRef} />
                                {inputGraduateCertificate && <a rel="noreferrer" style={{ backgroundColor: "#efefef", border: "1px solid", borderColor: "#767676", borderRadius: 4, height: 28, display: "flex", justifyContent: "center", alignItems: "center" }}  className="w3-button" href={inputGraduateCertificate} target="_blank"> show</a>}
                                {/* <button onClick={openGraduateCertificate} >show</button> */}
                            </div>
                        </div>
                        <div className="w3-rest w3-margin" >
                            <label>Medical license</label>
                            <br />
                            <div className="w3-input" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <input type="file" onChange={(e) => {
                                    setinputMedicalLicense(URL.createObjectURL(e.target.files[0]));
                                    setinputMedicalLicenseFile(e.target.files[0]);
                                }
                                } ref={MedicalLicenseRef} />
                                {inputMedicalLicense && <a rel="noreferrer" style={{ backgroundColor: "#efefef",border: "1px solid",borderColor: "#767676",borderRadius: 4,height: 28,display: "flex",justifyContent: "center",alignItems: "center"}} className="w3-button" href={inputMedicalLicense} target="_blank"> show</a>}                                {/* <button onClick={openMedicalLicense} >show</button> */}
                            </div>
                        </div>
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

export default DoctorAccountSettingEducationCard;