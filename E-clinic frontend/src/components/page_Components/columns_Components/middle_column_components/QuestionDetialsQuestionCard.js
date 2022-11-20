import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../../context/MyContext";

const QuestionDetialsQuestionCard = ({ QuestionDetails, DeleteFetch }) => {

    const { id, patient_details, title, body, to_doctor_details, department_details, files_details, discussions_count, created_at } = QuestionDetails;
    const { id: user_id, full_name, image } = patient_details
    const [imgindex, setimgindex] = useState(0);
    const [media, setmedia] = useState([]);
    const [attachment, setattachment] = useState([]);
    const { myinfo } = useContext(MyContext);
    const navto=useNavigate()

    const [deleteEnabled, setdeleteEnabled] = useState(false);


    const w3DropDownClick = useRef()

    function handleShowW3DropDownClick() {
        w3DropDownClick.current.classList.toggle("w3-show")
    }

    useEffect(() => {
        if (files_details) {
            let media_temp = [], attachment_temp = []

            files_details.forEach(file => {
                if (file.type === "image" || file.type === "video" || file.type === "audio") {
                    media_temp.push(file)
                }
                else {
                    attachment_temp.push(file)
                }
            })
            setmedia(media_temp)
            setattachment(attachment_temp)

        }

    }, [files_details]);
    useEffect(() => {
        console.log(imgindex)
    }, [imgindex]);


    function Delete_handle(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("id", id)
    
        DeleteFetch("/delete/question/", formdata);
        setdeleteEnabled(false);
    }
    return (
        <div style={{ position: "relative" }}>
         
            {deleteEnabled &&
                < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(223 223 223 / 94%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div>
                        <button onClick={() => setdeleteEnabled(false)} style={{ marginRight: 5 }} className="w3-button w3-grey ">cancel</button>
                        <button onClick={Delete_handle} className="w3-button w3-red " >delete</button>
                    </div>

                </div>
            }
            <div className="w3-container w3-card w3-white w3-round w3-margin">
                {(myinfo.myid === user_id) &&
                    <>
                        <div className="w3-row">
                            <div className="w3-half w3-right w3-margin-top w3-margin-right w3-margin-left" style={{ textAlign: 'right' }}>
                                <div className="w3-dropdown-click">
                                    <div onClick={handleShowW3DropDownClick} className="w3-button fa fa-ellipsis-h dropbtn" style={{ color: '#4d636f' }}>
                                    </div>
                                    <div id="Demo" ref={w3DropDownClick} className="Demo w3-dropdown-content w3-bar-block w3-border " style={{ minWidth: 'auto' }}>
                                    <div onClick={() => navto(`/Questions/editQuestion/${id}`)} className="w3-bar-item w3-button">Edit</div>
                                        <div onClick={()=>setdeleteEnabled(true)} className="w3-bar-item w3-button">Delete</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div style={{ marginTop: -32 }}>
                        <img onClick={() => navto("/UserProfile/" + user_id)}src={image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60, marginTop: "-16px" }} />
                            <span className="w3-right w3-opacity">{new Date(created_at).toLocaleString()}</span>
                            <h4>{full_name}</h4><br />
                        </div>
                    </>
                }
                <br />
                {(myinfo.myid !== user_id) && <div>
                    <img onClick={() => navto("/UserProfile/" + user_id)} src={image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60, marginTop: "-16px" }} />
                    <span className="w3-right w3-opacity">{new Date(created_at).toLocaleString()}</span>
                    <h4>{full_name}</h4><br />
                </div>}

                <hr className="w3-clear" />
                {title && <h5>{title}</h5>}
                <p>{body}</p>
                {/* {(files.length>0)&&
            files.map((file,index)=>{
                    if(index%2==0){
                    if (!(files.length === index+1)){
                        return <div className="w3-row-padding" style={{ margin: '0 -16px' }} key={index}>
                        <div className="w3-half">
                            <img src={files[index]} style={{ width: '100%' }} alt="Northern Lights" className="w3-margin-bottom" />
                        </div>
                            <div className="w3-half">
                                <img src={files[index + 1]} style={{ width: '100%' }} alt="Nature" className="w3-margin-bottom" />
                            </div>
                    </div>
                    }
                    else{
                        return <div className="w3-row-padding" style={{ margin: '0 -16px' ,display:"flex",justifyContent:"center"}} key={index}>
                            
                            <div className="w3-half" >
                                <img src={files[index-3]} style={{ width: '100%' }} alt="Nature" className="w3-margin-bottom" />
                            </div>
                        </div>
                    }
                    
                }
                
            })} */}

                {media.length>0 && <div>
                    <div className="slideshow-container boxxx" style={{ width: "60%" }}>
                        {media.map((file, index) =>
                            <div className={"mySlides fade"} style={{ display: ((index === Math.abs(imgindex)) ? "block" : 'none') }} key={index}>
                                <div className="numbertext" >{index + 1} / {media.length}</div>
                                {(file.type === "image") && <img alt="attachment" src={file.path} style={{ width: '100%' }} />}
                                {(file.type === "video") && (index === Math.abs(imgindex)) && <video controls src={file.path} style={{ width: '100%' }} />}
                                {(file.type === "audio") && (index === Math.abs(imgindex)) && <div style={{ aspectRatio: "1", paddingRight: 50, paddingLeft: 50, display: "flex", justifyContent: "center", alignItems: "center" }}><audio controls src={file.path} style={{ width: '100%' }} /></div>}
                            </div>

                        )}

                        <div className="prev" onClick={() => setimgindex(index => (index - 1) % media.length)} >❮</div>
                        <div className="next" onClick={() => setimgindex(index => (index + 1) % (media.length))} >❯</div>
                    </div>
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        {
                            media.map((file, index) => {

                                return <span key={index} className={"dot" + ((index === Math.abs(imgindex)) ? " active" : "")} onClick={() => setimgindex(index)} />
                            })
                        }
                    </div>

                    <div className=" w3-margin">
                        {attachment && attachment.map((file, index) =>
                            <div className="w3-margin-top">
                            <a  key={index} style={{ color: '#4d636f' }} rel="noreferrer" href={file.path} target="_blank"><i className=" fa fa-link  w3-margin-right" />Attachment {index + 1}</a>
                            <br />
                            </div>

                        )}

                    </div>


                </div>}








            </div>
        </div>
    );
}

export default QuestionDetialsQuestionCard;








