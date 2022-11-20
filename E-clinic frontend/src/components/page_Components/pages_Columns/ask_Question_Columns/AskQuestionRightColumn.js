import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostFetch from "../../../../custom hooks/usePostFetch";
import AskQuestionAttachFileCard from "../../columns_Components/right_column_components/AskQuestionAttachFileCard";
import AskQuestionHedder from "../../columns_Components/right_column_components/AskQuestionHedder";
import AskQuestionQuestionDetialsCard from "../../columns_Components/right_column_components/AskQuestionQuestionDetialsCard";

const AskQuestionRightColumn = () => {
    const [Title, setTitle] = useState("");
    const [body, setbody] = useState("");
    const [Department, setDepartment] = useState("0");
    const [ToDoctor, setToDoctor] = useState("0");
    const [inputAttatchmentFiles, setinputAttatchmentFiles] = useState([]);


    const { data: postData, IsPending: PostIsPending, post } = usePostFetch();

    const navto =useNavigate()

    useEffect(() => {
        if (postData){
            console.log(postData)
            navto("/Questions")
        }
        
    }, [postData, navto])

    function Ask() {
        const formdata = new FormData();
        formdata.append("title", Title);
        formdata.append("body", body);
        formdata.append("to_doctor", ToDoctor);
        formdata.append("department", Department);
        inputAttatchmentFiles.forEach(file => {
            formdata.append("files", file.file)
        })
        post("/create/question/", formdata)
    }


    return (
        
        <div className="w3-col m9 " style={{ paddingTop: 3 }}>
            <div style={{ position: "relative" }}>
                {PostIsPending &&
                    < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="loader"></div>

                    </div>
                }
            <AskQuestionHedder />
            <AskQuestionQuestionDetialsCard Title={Title} setTitle={setTitle} body={body} setbody={setbody} Department={Department} setDepartment={setDepartment} ToDoctor={ToDoctor} setToDoctor={setToDoctor} />
            <AskQuestionAttachFileCard inputAttatchmentFiles={inputAttatchmentFiles} setinputAttatchmentFiles={setinputAttatchmentFiles} Ask={Ask} />
        </div>
        </div>
    );
}

export default AskQuestionRightColumn;