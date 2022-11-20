import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../../../context/MyContext";

const BlogCommentCard = ({ comment, commentDeleteFetch}) => {
    const { id, user_details, body, created_at } = comment;
    const {myinfo} = useContext(MyContext);
    const w3DropDownClick = useRef();
    const [deleteEnabled, setdeleteEnabled] = useState(false);
    const navto=useNavigate()

    function handleShowW3DropDownClick() {
        w3DropDownClick.current.classList.toggle("w3-show")
    }
    function Delete_handle(){
        const formdata=new FormData();
        formdata.append("id",id)
        commentDeleteFetch("/delete/comment/",formdata)
        setdeleteEnabled(false)
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
            {user_details&&<div className="w3-container w3-card w3-white w3-round w3-margin">
                <br />
                {(user_details.id===myinfo.myid)&&<div className="w3-row">
                    <div className="w3-half w3-right  w3-margin-right w3-margin-left" style={{ textAlign: 'right', marginTop: -15 }}>
                        <div className="w3-dropdown-click">
                            <div onClick={handleShowW3DropDownClick} className="w3-button fa fa-ellipsis-h dropbtn" style={{ color: '#4d636f' }}>
                            </div>
                            <div id="Demo" ref={w3DropDownClick} className="Demo w3-dropdown-content w3-bar-block w3-border " style={{ minWidth: 'auto' }}>
                                {/* <div onClick={() => navto(`/Questions/editQuestion/${id}`)} className="w3-bar-item w3-button">Edit</div> */}
                                <div onClick={() => setdeleteEnabled(true)} className="w3-bar-item w3-button">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>}
                <br />
                <div style={{ marginTop: -32 }}>
                    <img onClick={() => navto("/UserProfile/" + user_details.id)} src={user_details.image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 40 ,marginTop:-10 }} />
                    <span className="w3-right w3-opacity">{new Date(created_at).toLocaleString()}</span>
                    <h6>{user_details.full_name}</h6>
                    <hr className="w3-clear" style={{ marginBottom: 0 }} />
                    <p style={{ wordBreak: "break-all" }}>{body}</p>
                </div>


            </div>}
        </div>

    );
}

export default BlogCommentCard;