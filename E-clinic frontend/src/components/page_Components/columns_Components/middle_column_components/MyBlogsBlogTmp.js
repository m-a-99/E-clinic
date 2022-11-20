import { useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import usePostFetch from "../../../../custom hooks/usePostFetch";
import BlogCommentsList from "./components/BlogCommentsList";

const MyBlogsBlogTmp = ({ blog, blogDeleteFetch }) => {
    const { id, doctor_details, title, body, files_details, likes_count, comments_count, like_it, created_at } = blog;
    const [showcomments, setshowcomments] = useState(false);
    const [media, setmedia] = useState([]);
    const [attachment, setattachment] = useState([]);
    const [imgindex, setimgindex] = useState(0);

    const [likeState, setlikeState] = useState(like_it);
    const [likes_countState, setlikes_countState] = useState(Number.parseInt(likes_count));
    const [comments_countState, setcomments_countState] = useState(comments_count);
    const hasnext = useRef(true);

    const [comments, setcomments] = useState([]);
    const [page, setpage] = useState(1);
    const [url, seturl] = useState(`/get/blog/comments/?blog_id=${id}&page=1`);

    const { data, IsPending, err } = useGetFetch(url);

    const { data: postdata, IsPending: postIsPending, post } = usePostFetch();
    const [deleteEnabled, setdeleteEnabled] = useState(false);
    const navto = useNavigate()


    useEffect(() => {
        if (postdata?.status) {
            if (postdata.action === "dislike") {

                setlikeState(false);
                setlikes_countState(count => count - 1);


            }
            else if (postdata.action === "like") {
                setlikeState(true);
                setlikes_countState(count => count + 1);

            }
        }
    }, [postdata]);


    useEffect(() => {
        seturl(`/get/blog/comments/?blog_id=${id}&page=${page}`);
    }, [page, id]);


    useEffect(() => {
        if (data) {
            setcomments(comments => [...comments, ...data.results]);
            if (!data.next) {
                hasnext.current = false;

            }
        }
    }, [data])


    function like() {
        if (!postIsPending) {
            const formdata = new FormData();
            formdata.append("blog", id);
            formdata.append("like", (likeState ? "0" : "1"))
            post("/blog/like/", formdata);
        }

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


        const w3DropDownClick = useRef()

    function handleShowW3DropDownClick() {
        w3DropDownClick.current.classList.toggle("w3-show")
    }
    function Delete_handle(e) {
        const formdata=new FormData();
        formdata.append("id",id);
        blogDeleteFetch("/delete/blog/",formdata);
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
            <div style={{ position: "relative" }} className="w3-container w3-card w3-white w3-round w3-margin">
                <div className="w3-row">
                    <div className="w3-half w3-right w3-margin-top w3-margin-right w3-margin-left" style={{ textAlign: 'right' }}>
                        <div className="w3-dropdown-click">
                            <div onClick={handleShowW3DropDownClick} className="w3-button fa fa-ellipsis-h dropbtn" style={{ color: '#4d636f' }}>
                            </div>
                            <div id="Demo" ref={w3DropDownClick} className="Demo w3-dropdown-content w3-bar-block w3-border " style={{ minWidth: 'auto' }}>
                                <div onClick={() => navto(`/EditBlog/${id}`)} className="w3-bar-item w3-button">Edit</div>
                                <div onClick={() => setdeleteEnabled(true)} className="w3-bar-item w3-button">Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div style={{ marginTop: -32 }}>
                <img src={doctor_details.image} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60 ,marginTop:-16}} />

                <span className="w3-right w3-opacity">{new Date(created_at).toLocaleString()}</span>
                <h4>{doctor_details.full_name}</h4><br />
                </div>
                <hr className="w3-clear" />

                <h3 style={{ fontFamily:"Calvier"}} >{title}</h3>
                <pre style={{ whiteSpace: "pre-wrap", fontFamily:"Roboto"}}>{body}</pre>
                {(media.length > 0) && <div>
                    <div className="slideshow-container boxxx" style={{ width: "60%" }}>
                        {media.map((file, index) =>
                            <div className={"mySlides fade"} style={{ display: ((index === Math.abs(imgindex)) ? "block" : 'none') }} key={file.id}>
                                <div className="numbertext" >{index + 1} / {media.length}</div>
                                {(file.type === "image") && <img alt="media attatchment" src={file.path} style={{ width: '100%' }} />}
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
                                <a key={index} style={{ color: '#4d636f' }} rel="noreferrer" href={file.path} target="_blank"><i className=" fa fa-link  w3-margin-right" />Attachment {index + 1}</a>
                                <br />
                            </div>

                        )}

                    </div>
                </div>}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <button onClick={like} style={{ marginRight: 3 }} type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
                            {!likeState && <><i style={{ marginRight: 2 }} className="fa fa-thumbs-up" />
                                Like</>}
                            {likeState && <><i style={{ marginRight: 2 }} className="fa fa-thumbs-o-down" />
                                DisLike</>}
                        </button>
                        <button onClick={() => setshowcomments(v => v ? false : true)} type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i style={{ marginRight: 2 }} className="fa fa-comment" />
                            Comment</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <pre>
                            <span className="w3-opacity">{likes_countState} <i className="fa fa-thumbs-up" /> </span>
                            <span className="w3-opacity">{comments_countState} <i className="fa fa-comment" /></span>
                        </pre>
                    </div>

                </div>
                {showcomments && <BlogCommentsList blogId={id} comments={comments} setcomments={setcomments} setcomments_countState={setcomments_countState} hasnext={hasnext} IsPending={IsPending} err={err} setpage={setpage} />}

            </div>
        </div>

    );

}

export default MyBlogsBlogTmp;