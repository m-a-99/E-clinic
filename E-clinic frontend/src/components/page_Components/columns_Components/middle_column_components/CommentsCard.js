import CommentCard from "./components/CommentCard";

const CommentsCard = ({ DiscuttionDetails, setpage, hasnext, DiscuttionDetailsIsPending, DiscuttionDetailserr, DisscussionDeleteFetch, deleteDiscussionIsPending}) => {

    return (
        <div style={{ position: "relative" }}>
                {deleteDiscussionIsPending &&
                    < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="loader"></div>
                    </div>
                }
        <div className="w3-container w3-card  w3-round w3-margin answer_card ">
            
            {
                DiscuttionDetails.map((discussion,index)=>{
                    return <div key={discussion.id}>
                        <CommentCard discussion={discussion} DisscussionDeleteFetch={DisscussionDeleteFetch} />

                    </div>
                })
            }
            {!DiscuttionDetailsIsPending&&hasnext &&<div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <div onClick={()=>{if(hasnext)setpage(page=>page+1)}} style={{ borderRadius: 50, height: 23, padding: "0px 12px" }} className="w3-button w3-theme w3-center">show more +</div>

            </div>}
            {DiscuttionDetailsIsPending && <h5 className='w3-center'>Loadding...</h5>}
            {DiscuttionDetailserr && <>{DiscuttionDetailserr}</>}
        </div> 
        </div>


    );
}

export default CommentsCard;