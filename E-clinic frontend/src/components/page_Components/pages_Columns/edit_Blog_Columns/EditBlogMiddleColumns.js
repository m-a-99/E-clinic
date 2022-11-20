import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import usePutFetch from "../../../../custom hooks/usePutFetch";
import EditBlogAttachFileCard from "../../columns_Components/middle_column_components/EditBlogAttachFileCard";
import EditBlogBlogDetailsCard from "../../columns_Components/middle_column_components/EditBlogBlogDetailsCard";
import EditQuestionAttachFileCard from "../../columns_Components/middle_column_components/EditQuestionAttachFileCard";
import EditQuestionHedder from "../../columns_Components/middle_column_components/EditQuestionHedder";

const EditBlogMiddleColumns = () => {
    const {state} = useLocation();
    useEffect(() => {
        if (state)
            console.log("hhhhhhhhh", state)

    }, [state]);
        useLayoutEffect(() => {
            window.scrollTo(0, 0);
        }, []);
        const { id } = useParams();

    const { data: BlogDetails, IsPending: BlogDetailsIsPending, err: BlogDetailserr } = useGetFetch(`/get/blog/details/?id=${id}`);

        const [saveDisabled, setsaveDisabled] = useState(false);

        const [TitleState, setTitleState] = useState("");
        const [bodyState, setbodyState] = useState("");
        const [AttatchmentFilesState, setAttatchmentFilesState] = useState([]);

        const [inputTitle, setinputTitle] = useState(TitleState);
        const [inputbody, setinputbody] = useState(bodyState);
        const [inputAttatchmentFiles, setinputAttatchmentFiles] = useState([]);


        const { data: putData, IsPending: putIsPending, put } = usePutFetch();

        const navto = useNavigate()

        useEffect(() => {
            if (BlogDetails) {
                console.log(BlogDetails)

                // const { patient_details, title, body, to_doctor_details, department_details, files_details, discussions_count, created_at } = BlogDetails;
                // const { id: user_id, full_name, image } = patient_details
                setTitleState(BlogDetails?.title)
                setinputTitle(BlogDetails?.title)
                setbodyState(BlogDetails?.body)
                setinputbody(BlogDetails?.body)
                setAttatchmentFilesState(BlogDetails.files_details)
            }

        }, [BlogDetails])




        useEffect(() => {
            if (putData) {
                if (!putIsPending) {
                    navto(`/MyBlogs`)

                }
            }

        }, [putData, putIsPending, navto,state])

        useEffect(() => {
            if ( inputAttatchmentFiles === 0 && TitleState === inputTitle && bodyState === inputbody ) {
                setsaveDisabled(true)
            }
            else {
                setsaveDisabled(false)
            }

        }, [ inputAttatchmentFiles, TitleState, bodyState, inputTitle, inputbody]);

        function save() {
            const formdata = new FormData();
            formdata.append("id", id);
            formdata.append("title", inputTitle);
            formdata.append("body", inputbody);
            inputAttatchmentFiles.forEach(file => {
                formdata.append("files", file.file)
            })
            put("/edit/blog/", formdata)
            
        }



        return (
            <div >
                <div className="w3-col m9 " style={{ paddingTop: 3 }}>
                    <div style={{ position: "relative" }}>
                        {putIsPending &&
                            < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div className="loader"></div>

                            </div>
                        }
                        <style>{`.xx{margin-top:0 !important; height:72px; }`}</style>
                        <div className="w3-container w3-card w3-round w3-theme-d2 w3-margin xx" >
                            <h2>Edit Blog</h2>
                        </div>

                        {BlogDetailsIsPending && <h4 className='w3-center'>Loadding...</h4>}
                        {(BlogDetailserr) && <>{BlogDetailserr}</>}

                        {BlogDetails && <EditBlogBlogDetailsCard Title={inputTitle} setTitle={setinputTitle} body={inputbody} setbody={setinputbody} />}
                        {BlogDetails && <EditBlogAttachFileCard save={save} saveDisabled={saveDisabled} AttatchmentFilesState={AttatchmentFilesState} inputAttatchmentFiles={inputAttatchmentFiles} setinputAttatchmentFiles={setinputAttatchmentFiles} />}
                    </div>
                </div>
            </div>


        );
    }

 
export default EditBlogMiddleColumns;