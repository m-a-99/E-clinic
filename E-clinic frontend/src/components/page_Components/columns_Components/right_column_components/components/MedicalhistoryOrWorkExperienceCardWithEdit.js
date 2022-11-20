import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../../../../css/loader.css"
import usePutFetch from "../../../../../custom hooks/usePutFetch";
import cryptoJs from 'crypto-js';
import ViewPdfFullScreen from "./ViewPdfFullScreen";
import { MyContext } from "../../../../../context/MyContext";


const MedicalhistoryOrWorkExperienceCardWithEdit = (props) => {

    const { id,title,time_period, body,certificate } = props.card;
    const { myinfo } = useContext(MyContext);
    const { account_type } = myinfo;
    const DeleteFetch = props.DeleteFetch;

    const [TitleState, setTitleState] = useState(title);
    const [TimePeriodState, setTimePeriodState] = useState(time_period);
    const [bodyState, setbodyState] = useState(body);
    const [AttachmentState, setAttachmentState] = useState(certificate);


    const [inputTitle, setinputTitle] = useState(TitleState);
    const [inputBody, setinputBody] = useState(bodyState);
    const [inputTimePeriod, setinputTimePeriod] = useState(time_period);
    const [inputAttachment, setinputAttachment] = useState(certificate);
    const [inputAttachmentFile, setinputAttachmentFile] = useState(null);

    const [AttachmentStateHash, setAttachmentStateHash] = useState();
    const [InputAttachmentHash, setInputAttachmentHash] = useState();

    const [showAttachment, setshowAttachment] = useState(false);

    const AttachmentRef = useRef()



    const [saveEnabled, setsaveEnabled] = useState(false);
    const [deleteEnabled, setdeleteEnabled] = useState(false);




    const [toggleEditCard, settoggleEditCard] = useState(false);
    const w3DropDownClick = useRef()

    const { data, IsPending, put } = usePutFetch();


    useEffect(() => {
        if (TitleState === inputTitle && TimePeriodState === inputTimePeriod && bodyState === inputBody && AttachmentStateHash === InputAttachmentHash) {
            setsaveEnabled(false);
        }
        else {
            setsaveEnabled(true)
        }
    }, [TitleState, TimePeriodState, bodyState, inputTitle, inputBody, inputTimePeriod, AttachmentStateHash, InputAttachmentHash]);


    useEffect(() => {
        if (data) {
            setTitleState(data.title);
            setTimePeriodState(data.time_period);
            setbodyState(data.body);
            setAttachmentState(data.certificate)
            settoggleEditCard(false)

            console.log(data)
        }

    }, [data]);


    function Delete_handle(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("id", id)
        if (account_type === "Doctor") {
            DeleteFetch("/doctor/delete/work/experience/", formdata);
        }
        else if (account_type === "Patient") {
            DeleteFetch("/patient/delete/medical/history/", formdata)
        }

        setdeleteEnabled(false)
    }
    function save(e) {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("title", inputTitle)
        formdata.append("time_period", inputTimePeriod)
        formdata.append("body", inputBody)
        if (inputAttachmentFile)
            formdata.append("certificate", inputAttachmentFile)
        if (account_type === "Doctor") {
            put("/doctor/edit/work/experience/", formdata)
        }
        else if (account_type === "Patient") {
            put("/patient/edit/medical/history/", formdata)

        }
    }

    function handleShowW3DropDownClick() {
        w3DropDownClick.current.classList.toggle("w3-show")
    }

    useLayoutEffect(() => {
        const abortCont = new AbortController();
        if (AttachmentState) {
            (async () => {
                try {
                    const res = await fetch(AttachmentState, { signal: abortCont.signal });
                    const data = await res.arrayBuffer();
                    const hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                    setAttachmentStateHash(hash);
                    setInputAttachmentHash(hash);
                }
                catch (e) {
                    if (e.name === "AbortError")
                        console.log("aborted")
                }


            })()
        }


        return () => {
            abortCont.abort();
        };

    }, [AttachmentState]);

    useEffect(() => {
        (async () => {
            if (inputAttachmentFile) {
                let data = await inputAttachmentFile.arrayBuffer()
                let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                setInputAttachmentHash(hash);
            }

        })()

    }, [inputAttachmentFile]);


    return (
        <>
            {showAttachment && <ViewPdfFullScreen close={() => { setshowAttachment(false) }} url={inputAttachment} />}
            {!toggleEditCard &&
                <div className="work_experince_temp" style={{ position: "relative" }}>


                    {deleteEnabled &&
                        < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(223 223 223 / 94%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div>
                                <button onClick={() => setdeleteEnabled(false)} style={{ marginRight: 5 }} className="w3-button w3-grey ">cancel</button>
                                <button onClick={Delete_handle} className="w3-button w3-red " >delete</button>
                            </div>

                        </div>
                    }
                    <div className="w3-container">
                        <div className="w3-container">
                            <div className="w3-row" style={{ marginTop: 30 }}>
                                <h5 className="w3-opacity w3-half "><b>{TitleState}</b></h5>
                                <div className="w3-half " style={{ textAlign: 'right' }}>
                                    <div className="w3-dropdown-click">
                                        <div onClick={handleShowW3DropDownClick} className="w3-button fa fa-ellipsis-h dropbtn" style={{ color: '#4d636f' }}>
                                        </div>
                                        <div id="Demo" ref={w3DropDownClick} className="Demo w3-dropdown-content w3-bar-block w3-border " style={{ minWidth: 'auto' }}>
                                            <div onClick={() => settoggleEditCard(true)} className="w3-bar-item w3-button">Edit</div>
                                            <div onClick={() => setdeleteEnabled(true)} className="w3-bar-item w3-button">Delete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 style={{ color: '#4d636f' }}><i className="fa fa-calendar  w3-margin-right" /> {TimePeriodState}</h6>
                            <p style={{ wordBreak: "break-word" }}>{bodyState}</p>
                            {AttachmentState && <a style={{ color: '#4d636f' }} rel="noreferrer" href={AttachmentState} target="_blank"><i className=" fa fa-link w3-margin-right " />Attachment</a>}

                            <hr />
                        </div>
                    </div>
                </div>
            }
            <div style={{ overflow: "hidden", position: "relative" }}>
                {IsPending &&
                    < div className="w3-container w3-card  w3-round" style={{ zIndex: 2, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(223 223 223 / 94%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="loader"></div>

                    </div>
                }
                {toggleEditCard &&

                    <form className="add_work_ex_temp"><div className="w3-container w3-margin  w3-animate-top work_temp">
                        <div className="w3-row" style={{ marginTop: 30, display: "flex", justifyContent: "space-around" }}>
                            <p className={(account_type === "Doctor" ? "w3-third" : "w3-half") + " w3-margin"}>
                                <label>Title</label>
                                <br />
                                <input className="w3-input" onChange={(e) => setinputTitle(e.target.value)} type="text" placeholder="Title" value={inputTitle} />
                            </p>
                            <p className={(account_type === "Doctor" ? "w3-third" : "w3-half") + " w3-margin"}>
                                <label>Time period</label>
                                <br />
                                <input className="w3-input" onChange={(e) => setinputTimePeriod(e.target.value)} type="text" placeholder="Eg. Mar 2012 - Dec 2014  or  Jan 2015 - Current" value={inputTimePeriod} />
                            </p>
                            {(account_type === "Doctor") && <div className="w3-third w3-margin">
                                <label>Attachment</label>
                                <br />
                                <div className="w3-input" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input type="file" onChange={(e) => {
                                        setinputAttachment(URL.createObjectURL(e.target.files[0]));
                                        setinputAttachmentFile(e.target.files[0]);
                                    }
                                    } ref={AttachmentRef} />
                                    <button onClick={(e) => { e.preventDefault(); setshowAttachment(true) }}>show</button>
                                </div>
                            </div>}
                            <div onClick={() => settoggleEditCard(false)} className="w3-rest closebtn w3-right" style={{ fontSize: 20, maxWidth: '5%' }}>
                                <i style={{ paddingRight: 5 }} className="fa fa-times" />
                            </div>
                        </div>
                        <div className="w3-row w3-margin ">
                            <label >body</label>

                            <div style={{ display: "flex", justifyContent: "space-between", marginRight: -32 }}>
                                {/*<input class="w3-input" type="text">*/}
                                <textarea onChange={(e) => setinputBody(e.target.value)} id="w3review" name="w3review" rows={3} cols={77} style={{ resize: 'none' }} value={inputBody} />
                                <button disabled={!saveEnabled} onClick={save} className="w3-rest w3-theme-d2 w3-right w3-button w3-round" style={{ marginLeft: 25, alignSelf: "end", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    save
                                </button>

                            </div>

                        </div>
                    </div>
                    </form>
                }
            </div>
        </>


    );
}

export default MedicalhistoryOrWorkExperienceCardWithEdit;