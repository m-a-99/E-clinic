const CreateBlogBlogDetailsCard = (props) => {
    const { Title,setTitle,body,setbody}=props
    return (
        <div className="w3-container w3-card w3-white w3-round w3-margin" >
            <h2 style={{ color: '#4d636f' }}><i className="fa fa-user-md 	"> Blog detials </i></h2>
            <div className="w3-container">
                <div className="w3-row ">
                    <p className="w3-half w3-margin" style={{ width: '44.5%' }}>
                        <label >Title</label>
                        <br />
                        <input className="w3-input" type="text" onChange={(e)=>setTitle(e.target.value)} value={Title}/>
                    </p>
                </div>
                
                <div className="w3-row">
                    <p className=" w3-margin">
                        <label>body</label>
                        <br />
                        <textarea rows={3} cols={90} style={{ resize: 'none', width: '-webkit-fill-available', maxWidth: 920 }}  onChange={(e)=>setbody(e.target.value)} value={body} />
                    </p>
                </div>
            </div>
        </div>
    );
}


 
export default CreateBlogBlogDetailsCard; 