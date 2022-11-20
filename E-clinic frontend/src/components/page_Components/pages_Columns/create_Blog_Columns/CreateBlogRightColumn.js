import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostFetch from "../../../../custom hooks/usePostFetch";
import CreateBlogAttachFileCard from "../../columns_Components/right_column_components/CreateBlogAttachFileCard";
import CreateBlogBlogDetailsCard from "../../columns_Components/right_column_components/CreateBlogBlogDetailsCard";
import CreateBlogHedder from "../../columns_Components/right_column_components/CreateBlogHedder";

const CreateBlogRightColumn = () => {
    const [Title, setTitle] = useState("");
    const [body, setbody] = useState("");
    const [inputAttatchmentFiles, setinputAttatchmentFiles] = useState([]);


    const { data: postData, IsPending: PostIsPending, post } = usePostFetch();

    const navto = useNavigate()

    useEffect(() => {
        if (postData) {
            console.log(postData)
            navto("/")
        }

    }, [postData, navto])

    function Post() {
        const formdata = new FormData();
        formdata.append("title", Title);
        formdata.append("body", body);
        inputAttatchmentFiles.forEach(file => {
            formdata.append("files", file.file)
        })
        post("/create/blog/", formdata)
    }


    return (

        <div className="w3-col m9 " style={{ paddingTop: 3 }}>
            <div style={{ position: "relative" }}>
                {PostIsPending &&
                    < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="loader"></div>

                    </div>
                }
                <CreateBlogHedder />
                <CreateBlogBlogDetailsCard Title={Title} setTitle={setTitle} body={body} setbody={setbody} />
                <CreateBlogAttachFileCard inputAttatchmentFiles={inputAttatchmentFiles} setinputAttatchmentFiles={setinputAttatchmentFiles} Post={Post} />
            </div>
        </div>
    );

}
 
export default CreateBlogRightColumn;