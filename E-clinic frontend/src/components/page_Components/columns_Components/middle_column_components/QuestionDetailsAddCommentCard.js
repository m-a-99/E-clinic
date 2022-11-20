import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import usePostFetch from "../../../../custom hooks/usePostFetch";

const QuestionDetailsAddCommentCard = ({ id, setDiscuttionDetails}) => {
    const [comment, setcomment] = useState("");
    const [AttachmentFile, setAttachmentFile] = useState();
    const { setquestions}=useOutletContext()

    const {data,post,IsPending}=usePostFetch();
    useEffect(() => {
        if(data?.id){
            setDiscuttionDetails(d => [data,...d])
            window.scrollTo(0, 0)
        }
        
    }, [data, setDiscuttionDetails]);
    function add(){
        const formdata=new FormData();
        formdata.append("question",id)
        formdata.append("body", comment)
        if (AttachmentFile){
            formdata.append("file", AttachmentFile)
        }
        setquestions(questions=>{
            return questions.map((question,index)=>{
                if(question.id.toString()===id){
                    let x=question;
                    x.discussions_count+=1;
                    console.log(x)
                    return x;
                }
                else{
                    return question
                }
            })}
        )
        post("/create/discussion/",formdata)

    }
    return (
        <div style={{ position: "relative" }}>
            {IsPending &&
                < div className="w3-container w3-card  w3-round" style={{zIndex:1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
        <form className="add_work_ex_temp w3-theme-l5 w3-card w3-round w3-container w3-margin">
            
            <div className="w3-container w3-animate-bottom work_temp" style={{margin:"16px 0 16px 0"}}>
                <div className="w3-row " style={{display:"flex",justifyContent:"space-between"}}>
                    
                    <p className="w3-half w3-margin">
                        <label>Comment</label>
                        <br />
                        <textarea id="w3review" name="w3review" rows={3} style={{ resize: 'none', backgroundColor: 'transparent', width: '-webkit-fill-available' }} onChange={(e)=>setcomment(e.target.value)} value={comment}  />
                    </p>
                    <div className="w3-third w3-margin" >
                        <label>Attach File</label>
                        <br />
                        <br />
                        <div className="w3-input" style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <input style={{height:34}} type="file" onChange={(e)=>{setAttachmentFile(e.target.files[0])}}/>
                            {/* <a rel="noreferrer" style={{ backgroundColor: "#efefef", border: "1px solid", borderColor: "#767676", borderRadius: 4, height: 28, display: "flex", justifyContent: "center", alignItems: "center" }} className="w3-button" target="_blank"> show</a>                            <button onClick={openMedicalLicense} >show</button> */}
                        </div>
                    </div>
                    
                    <div onClick={add} style={{ height:40 ,alignSelf:"flex-end"}} className="w3-rest w3-theme-d2 w3-right w3-button w3-round ">
                        add
                    </div>
                </div>
            </div>
            
            <hr style={{ color: 'black', borderTop: '1px solid #4d636f' }} />
        </form>
        </div>

    );
}

export default QuestionDetailsAddCommentCard;
