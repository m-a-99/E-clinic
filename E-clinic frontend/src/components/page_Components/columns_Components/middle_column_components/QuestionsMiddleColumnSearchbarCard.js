const QuestionsMiddleColumnSearchbarCard = ({search,setsearch}) => {
    return (
        <div className="w3-row-padding ">
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white ">
                    <form id="search_card" className="w3-container w3-padding w3-theme-d2 w3-round" style={{ display: 'flex' }}>
                        <h3 style={{ whiteSpace: 'nowrap' }}>Qustion Archive</h3>
                        <input name="search_feild" style={{ width: '90%', borderRadius: 60, margin: '10px 5px 5px 5px', borderWidth: '0 !important' }} type="text" contentEditable="true" className="w3-border w3-padding" placeholder="search" onChange={(e)=>setsearch(e.target.value)} value={search} />
                        <div  style={{ minWidth: '5%', borderRadius: 50, padding: '10px 14px', height: 42, margin: 'auto' }} className="w3-button w3-theme-l1"><i className="fa fa-search" /></div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default QuestionsMiddleColumnSearchbarCard;