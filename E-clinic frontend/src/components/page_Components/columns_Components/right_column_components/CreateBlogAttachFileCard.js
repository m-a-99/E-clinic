import { useEffect, useRef, useState } from "react";
import ViewPdfFullScreen from "../right_column_components/components/ViewPdfFullScreen";
import ViewVideoFullScreen from "../right_column_components/components/ViewVideoFullScreen";
import ViewPhotoScreen from "../right_column_components/components/ViewPhotoScreen";

const CreateBlogAttachFileCard = (props) => {
    
    const { inputAttatchmentFiles, setinputAttatchmentFiles, Post } = props
    const inputAttachmentRef = useRef();
    const [inputAttatchmentFile, setinputAttatchmentFile] = useState([]);
    const [showUrl, setshowUrl] = useState();
    const [show, setshow] = useState(false);
    const [showPhoto, setshowPhoto] = useState(false);
    const [showVideo, setshowVideo] = useState(false);





    useEffect(() => {
        (async () => {
            if (inputAttatchmentFile.length > 0) {

                for (let i = 0; i < inputAttatchmentFile.length; i++) {
                    let hash = inputAttatchmentFile[i].name;
                    setinputAttatchmentFiles(files => {
                        for (let i = 0; i < files.length; i++) {
                            if (files[i].hash === hash)
                                return files
                        }
                        return [...files, { file: inputAttatchmentFile[i], hash: hash }]
                    })

                }

            }
        })()

    }, [inputAttatchmentFile, setinputAttatchmentFiles]);

    function deleteAttachment(objfile) {
        setinputAttatchmentFiles(files => files.filter((file) => file.hash !== objfile.hash))
    }



    return (
        <>
            {show && <ViewPdfFullScreen close={() => { setshow(false); URL.revokeObjectURL(showUrl) }} url={showUrl} />}
            {showPhoto && <ViewPhotoScreen close={() => { setshowPhoto(false); URL.revokeObjectURL(showUrl) }} url={showUrl} />}
            {showVideo && <ViewVideoFullScreen close={() => { setshowVideo(false); URL.revokeObjectURL(showUrl) }} url={showUrl} />}

            <div className="w3-container w3-card w3-white w3-round w3-margin">
                <h2 style={{ color: '#4d636f' }}><i className="fa fa-folder-open	" /> Attach Files </h2>
                <div className="w3-container w3-margin">
                    <ul className="w3-ul w3-card-4 file_card">
                        {(inputAttatchmentFiles.length === 0) &&
                            <li className="w3-bar">
                                <h2>No file added</h2>
                            </li>}
                        {inputAttatchmentFiles.map((obj, index) =>
                            <li className="w3-bar " style={{ height: 81, display: "flex", alignItems: "center" }} key={obj.hash}>
                                <div style={{ display: "flex", alignItems: "center", width: "-webkit-fill-available" }}>
                                    <h2 className="w3-bar-item" style={{ color: '#4d636f' }}><i className="fa fa-file"> </i></h2>
                                    <div className="w3-bar-item" style={{ width: "max-content" }}>
                                        <span className="w3-large">{obj.file.name}</span>
                                    </div>
                                    <div onClick={(e) => {
                                        setshowUrl(URL.createObjectURL(obj.file));
                                        if (obj.file.type.includes("image")) { setshowPhoto(true); }

                                        else if (obj.file.type.includes("video")) { setshowVideo(true); }

                                        else {
                                            setshow(true);
                                        }
                                    }
                                    } style={{ width: "max-content" }} className="w3-button  w3-theme-d2 w3-round">show</div>

                                </div>
                                <div onClick={() => { deleteAttachment(obj) }} className="w3-bar-item w3-button w3-white w3-xlarge">×</div>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="w3-container">

                    <button onClick={Post} className="w3-rest w3-theme-d2 w3-right w3-button w3-round" style={{ marginLeft: 25, alignSelf: "end", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Post
                    </button>
                </div>
                <style>{`.xzx{ padding: 5px 16px !important;} `}</style>

                <div style={{ textAlign: 'center', marginBottom: -20 }}>
                    <input multiple ref={inputAttachmentRef} onChange={(e) => {
                        console.log(e.target.files)
                        setinputAttatchmentFile([...(e.target.files)]);
                        e.target.value = "";
                    }} className="w3-hide" type="file" />
                    <div onClick={() => { inputAttachmentRef.current.click() }} className="w3-button  w3-theme-d2 w3-xlarge w3-circle xzx" >+</div>
                </div>


            </div>
        </>

    );
    
}
 
export default CreateBlogAttachFileCard;