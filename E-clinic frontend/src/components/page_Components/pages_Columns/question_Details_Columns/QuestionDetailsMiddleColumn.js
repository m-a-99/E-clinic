import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useDeleteFetch from "../../../../custom hooks/useDeleteFetch";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import CommentsCard from "../../columns_Components/middle_column_components/CommentsCard";
import QuestionDetailsAddCommentCard from "../../columns_Components/middle_column_components/QuestionDetailsAddCommentCard";
import QuestionDetialsQuestionCard from "../../columns_Components/middle_column_components/QuestionDetialsQuestionCard";
import Searchbar from "../../columns_Components/middle_column_components/Searchbar";

const QuestionDetailsMiddleColumn = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { id } = useParams();

    const [page, setpage] = useState(1);
    const [hasnext, sethasnext] = useState(true);
    const { data: QuestionDetails, IsPending: QuestionDetailsIsPending, err: QuestionDetailserr } = useGetFetch(`/get/question/details/?id=${id}`);
    const [DiscuttionDetails, setDiscuttionDetails] = useState([]);
    const { data: DiscuttionDetailsfetch, IsPending: DiscuttionDetailsIsPending, err: DiscuttionDetailserr } = useGetFetch(`/get/question/discussions/?page=${page}&question_id=${id}`);

    const { setquestions } = useOutletContext()
    const navto = useNavigate();

    const { data: deleteData, IsPending: deleteIsPending, DeleteFetch } = useDeleteFetch();

    useEffect(() => {
        if (deleteData) {
            setquestions(questions => questions.filter((question) => question.id !== deleteData.id))
            navto("/Questions");

        }
    }, [deleteData, navto,setquestions]);

    useEffect(() => {
        if (DiscuttionDetailsfetch) {
            if (!DiscuttionDetailsfetch.next) {
                sethasnext(false)
            }
            setDiscuttionDetails(d => [...d, ...DiscuttionDetailsfetch.results])
        }
    }, [DiscuttionDetailsfetch]);

    const { data: disscuddiondeleteData, IsPending: deleteDiscussionIsPending,DeleteFetch:DisscussionDeleteFetch}=useDeleteFetch()


    useEffect(() => {
        if (disscuddiondeleteData) {
            setDiscuttionDetails(Discuttions => Discuttions.filter((Discuttion) => Discuttion.id !== disscuddiondeleteData.id))

        }
    }, [disscuddiondeleteData]);


    return (
        <div >

         <div className="w3-col m8" style={{ paddingTop: 3 }}>
                <Searchbar />
                <div style={{ position: "relative" }}>
                    {deleteIsPending &&
                        < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="loader"></div>
                        </div>
                    }
                    {QuestionDetails && <QuestionDetialsQuestionCard QuestionDetails={QuestionDetails} DeleteFetch={DeleteFetch}/>}
                    {DiscuttionDetails && QuestionDetails && <CommentsCard DiscuttionDetails={DiscuttionDetails} setpage={setpage} DisscussionDeleteFetch={DisscussionDeleteFetch} deleteDiscussionIsPending={deleteDiscussionIsPending} hasnext={hasnext} DiscuttionDetailsIsPending={DiscuttionDetailsIsPending} DiscuttionDetailserr={DiscuttionDetailserr} />}
                    {QuestionDetailsIsPending && <h4 className='w3-center'>Loadding...</h4>}
                    {(QuestionDetailserr) && <>{QuestionDetailserr}</>}

                    {QuestionDetails && <QuestionDetailsAddCommentCard id={id} setDiscuttionDetails={setDiscuttionDetails} />}

                </div>


            </div>
         
        </div>


    );
}

export default QuestionDetailsMiddleColumn;