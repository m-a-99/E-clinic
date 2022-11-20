import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDeleteFetch from "../../../../custom hooks/useDeleteFetch";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import usePutFetch from "../../../../custom hooks/usePutFetch";
import EditQuestionAttachFileCard from "../../columns_Components/middle_column_components/EditQuestionAttachFileCard";
import EditQuestionHedder from "../../columns_Components/middle_column_components/EditQuestionHedder";
import EditQuestionQuestionDetialsCard from "../../columns_Components/middle_column_components/EditQuestionQuestionDetialsCard";

const EditQuestionMiddleColumn = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { id } = useParams();


    const { data: QuestionDetails, IsPending: QuestionDetailsIsPending, err: QuestionDetailserr } = useGetFetch(`/get/question/details/?id=${id}`);

    const [saveDisabled, setsaveDisabled] = useState(false);

    const [TitleState, setTitleState] = useState("");
    const [bodyState, setbodyState] = useState("");
    const [DepartmentState, setDepartmentState] = useState("0");
    const [ToDoctorState, setToDoctorState] = useState("0");
    const [AttatchmentFilesState, setAttatchmentFilesState] = useState([]);

    const [AttatchmentFilesToDelete, setAttatchmentFilesToDelete] = useState([]);

    const [inputTitle, setinputTitle] = useState(TitleState);
    const [inputbody, setinputbody] = useState(bodyState);
    const [inputDepartment, setinputDepartment] = useState(DepartmentState);
    const [inputToDoctor, setinputToDoctor] = useState(ToDoctorState);
    const [inputAttatchmentFiles, setinputAttatchmentFiles] = useState([]);


    const { data: putData, IsPending: putIsPending, put } = usePutFetch();
    const { data: deleteData, IsPending: deleteIsPending,DeleteFetch} =useDeleteFetch()

    const navto = useNavigate()


    useEffect(() => {
        if (QuestionDetails) {

            // const { patient_details, title, body, to_doctor_details, department_details, files_details, discussions_count, created_at } = QuestionDetails;
            // const { id: user_id, full_name, image } = patient_details
            setTitleState(QuestionDetails?.title)
            setinputTitle(QuestionDetails?.title)
            setbodyState(QuestionDetails?.body)
            setinputbody(QuestionDetails?.body)
            setDepartmentState(QuestionDetails?.department_details?.id.toString())
            setinputDepartment(QuestionDetails?.department_details?.id.toString())
            setToDoctorState(QuestionDetails?.to_doctor_details.id?.toString())
            setinputToDoctor(QuestionDetails?.to_doctor_details.id?.toString())
            setAttatchmentFilesState(QuestionDetails.files_details)
        }

    }, [QuestionDetails])




    useEffect(() => {
        if (putData || deleteData) {
            if (!putIsPending && !deleteIsPending){
                            navto(`/Questions/${id}`)

            }
        }

    }, [putData, putIsPending, deleteData, deleteIsPending,navto,id])

    useEffect(() => {
        if (AttatchmentFilesToDelete.length === 0 &&inputAttatchmentFiles===0&&TitleState === inputTitle && bodyState === inputbody && DepartmentState === inputDepartment && ToDoctorState === inputToDoctor) {
            setsaveDisabled(true)
        }
        else{
            setsaveDisabled(false)
        }

    }, [AttatchmentFilesToDelete, inputAttatchmentFiles,TitleState,bodyState,DepartmentState,ToDoctorState,inputTitle,inputbody,inputDepartment,inputToDoctor]);

    function save() {
        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("title", inputTitle);
        formdata.append("body", inputbody);
        formdata.append("to_doctor", Number.parseInt(inputToDoctor));
        formdata.append("department", Number.parseInt(inputDepartment));
        inputAttatchmentFiles.forEach(file => {
            formdata.append("files", file.file)
        })
        put("/edit/question/", formdata)
        if(AttatchmentFilesToDelete.length>0){
            const formdata2 = new FormData();
            formdata2.append("files", "[" + AttatchmentFilesToDelete.toString() + "]")
            DeleteFetch("/delete/question/files/",formdata2)
        }
    }

    

    return (
        <div >
            <div className="w3-col m8 " style={{ paddingTop: 3 }}>
                <div style={{ position: "relative" }}>
                    {(putIsPending || deleteIsPending) &&
                        < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="loader"></div>

                        </div>
                    }
                    <EditQuestionHedder />

                    {QuestionDetailsIsPending && <h4 className='w3-center'>Loadding...</h4>}
                    {(QuestionDetailserr) && <>{QuestionDetailserr}</>}

                    {QuestionDetails && <EditQuestionQuestionDetialsCard Title={inputTitle} setTitle={setinputTitle} body={inputbody} setbody={setinputbody} Department={inputDepartment} setDepartment={setinputDepartment} ToDoctor={inputToDoctor} setToDoctor={setinputToDoctor} />}
                    {QuestionDetails && <EditQuestionAttachFileCard AttatchmentFilesToDelete={AttatchmentFilesToDelete} setAttatchmentFilesToDelete={setAttatchmentFilesToDelete} AttatchmentFilesState={AttatchmentFilesState} setAttatchmentFilesState={setAttatchmentFilesState} inputAttatchmentFiles={inputAttatchmentFiles} setinputAttatchmentFiles={setinputAttatchmentFiles} save={save} saveDisabled={saveDisabled} />}
                </div>
            </div>
        </div>


    );
}

export default EditQuestionMiddleColumn;