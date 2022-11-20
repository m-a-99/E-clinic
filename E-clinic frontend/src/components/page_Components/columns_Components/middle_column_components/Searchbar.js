import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../../context/MyContext";

const Searchbar = ({ search, setsearch }) => {
    const { myinfo } = useContext(MyContext)
    const navto=useNavigate()
    return (
        <div className="w3-row-padding">
            <div className="w3-col m12">
                <div className="w3-card w3-round w3-white">
                    <div className="w3-container w3-padding" style={{ display: 'flex' }}>
                        {(myinfo.account_type === "Doctor") && < div onClick={() => navto("/CreateBlog")} style={{ borderRadius: 50, padding: '10px 14px', height: 42, margin: 'auto' }} className="w3-button w3-theme post_button"><i className="fa fa-paper-plane-o" /><span className='new_post_span'> Create New Blog</span></div>}
                        {(myinfo.account_type === "Patient") && < div onClick={() => navto("/AskQuestion")} style={{ borderRadius: 50, padding: '10px 14px', height: 42, margin: 'auto' }} className="w3-button w3-theme post_button"><i className="fa fa-paper-plane-o" /><span className='new_post_span'> Ask Question</span></div>}
                        <input style={{ width: '90%', borderRadius: 60, margin: '10px 5px 5px 5px' }} type="text" contentEditable="true" className="w3-border w3-padding" placeholder="search" onChange={(e) => setsearch(e.target.value)} value={search} />
                        <div style={{ minWidth: '6%', borderRadius: 50, padding: '10px 14px', height: 42, margin: 'auto' }} className="w3-button w3-theme"><i className="fa fa-search" /></div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Searchbar;