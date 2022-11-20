import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../../../context/MyContext";

const CommentCard = ({ discussion, DisscussionDeleteFetch}) => {
    const { id, user_details, question, body, file_details, created_at } = discussion;
    const {id:userid, full_name, image } = user_details
    const { myinfo} = useContext(MyContext);

    const w3DropDownClick = useRef()
    const navto = useNavigate()

    const [deleteEnabled, setdeleteEnabled] = useState(false);

    function handleShowW3DropDownClick() {
        w3DropDownClick.current.classList.toggle("w3-show")
    }
    function Delete_handle(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("id", id)

        DisscussionDeleteFetch("/delete/discussion/", formdata);
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
            {user_details && <div className="w3-container w3-card w3-white w3-round w3-margin ">
               <br />
               { (user_details.id===myinfo.myid)&&<>
                  <div className="w3-row">
                    <div className="w3-half w3-right  w3-margin-right w3-margin-left" style={{ textAlign: 'right' ,marginTop:-15}}>
                        <div className="w3-dropdown-click">
                            <div onClick={handleShowW3DropDownClick} className="w3-button fa fa-ellipsis-h dropbtn" style={{ color: '#4d636f' }}>
                            </div>
                            <div id="Demo" ref={w3DropDownClick} className="Demo w3-dropdown-content w3-bar-block w3-border " style={{ minWidth: 'auto' }}>
                                {/* <div onClick={() => navto(`/Questions/editQuestion/${id}`)} className="w3-bar-item w3-button">Edit</div> */}
                                <div onClick={() => setdeleteEnabled(true)} className="w3-bar-item w3-button">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
               </>}
                <br />
                <div style={{ marginTop: -32 }}>

                    <img onClick={() => navto("/UserProfile/"+userid)} src={image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60, marginTop: "-16px" }} />
                    <span className="w3-right w3-opacity">{new Date(created_at).toLocaleString()}</span>
                    <h4>{full_name}</h4><br />
                </div>
                <p>{body}</p>
                {file_details && <a style={{ color: '#4d636f' }} rel="noreferrer" href={file_details.path} target="_blank"><i className=" fa fa-link w3-margin-right " />Attachment</a>}

                <hr className="w3-clear" />
            </div>}
        </div>
    );
}

export default CommentCard;