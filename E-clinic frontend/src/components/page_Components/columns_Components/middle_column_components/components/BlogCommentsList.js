import { useEffect, useState,useRef } from "react";
import useDeleteFetch from "../../../../../custom hooks/useDeleteFetch";
import usePostFetch from "../../../../../custom hooks/usePostFetch";
import BlogCommentCard from "./BlogCommentCard";

const BlogCommentsList = ({ blogId, comments, setcomments, setcomments_countState, hasnext, IsPending, err, setpage }) => {

    const { data, IsPending: postIsPending, err: posterr, post } = usePostFetch();
    const { data: commentdeleteData, IsPending: deletecommentIsPending, DeleteFetch: commentDeleteFetch } = useDeleteFetch()

    useEffect(()=>{
        if (commentdeleteData){
            setcomments((comments) => comments.filter(comment => comment.id != commentdeleteData.id))
        }
    }, [commentdeleteData])

    const commentdiv = useRef(null)

 
    const [inputcomment, setinputcomment] = useState("");

    const [addcommentdisabled, setaddcommentdisabled] = useState(true);

    useEffect(() => {
        if (inputcomment.length > 0) {
            setaddcommentdisabled(false)
        }
        else {
            setaddcommentdisabled(true)

        }

    }, [inputcomment]);
  useEffect(() => {
        if (data) {
            setcomments(c => [data, ...c]);
            setinputcomment("")
            setcomments_countState(count=>count+1);
            commentdiv.current.scrollIntoView()
            window.scrollTo(0, window.pageYOffset - 100)
        }
    }, [data]);
    function addcomment(e) {
        e.preventDefault();
        if (inputcomment.length > 0) {
            const formdata = new FormData();
            formdata.append("blog", blogId);
            formdata.append("body", inputcomment);
            post("/create/comment/", formdata);
        }

    }

    return (
        
            <div style={{ position: "relative" }}>
                
            <div style={{ overflowY: "hidden"}} className="w3-animate-bottom">

                
                <hr className="w3-clear" style={{ marginBottom: 10 }} />
                <div ref={commentdiv} style={{position:"relative"}}>
                    {postIsPending &&
                        < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="loader"></div>

                        </div>
                    }
                    {deletecommentIsPending &&
                        < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="loader"></div>
                        </div>
                    }
                    {comments.map(comment => <div key={comment.id}><BlogCommentCard comment={comment} commentDeleteFetch={commentDeleteFetch} /></div>)}

                </div>



                {hasnext.current && !IsPending && <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                    <div onClick={() => { if (hasnext.current) setpage(page => page + 1); }} style={{ borderRadius: 50, height: 23, padding: "0px 12px" }} className="w3-button w3-theme w3-center">show more +</div>

                </div>}
                {IsPending && <h4 className='w3-center'>Loadding...</h4>}
                {err && <>{err}</>}

                <form style={{ display: "flex", margin: '0px 5px 10px 5px' }}>

                    <input style={{ width: '100%', borderRadius: 60, marginRight: 5 }} type="text" contentEditable="true" className="w3-border w3-padding" placeholder="new comment" onChange={(e) => setinputcomment(e.target.value)} value={inputcomment} />
                    <button disabled={addcommentdisabled || postIsPending} onClick={addcomment} style={{ borderRadius: 50, padding: '10px 14px', height: 42, margin: 'auto' }} className="w3-button w3-theme"><i className="fa fa-paper-plane-o" /></button>

                </form>

            </div>
        </div>
    );
}

export default BlogCommentsList;