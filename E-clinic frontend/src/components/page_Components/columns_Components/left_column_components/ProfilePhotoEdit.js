import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MyContext } from "../../../../context/MyContext";
import cryptoJs from 'crypto-js';
import { useRef } from "react";
import usePutFetch from "../../../../custom hooks/usePutFetch";
import useFetch from "../../../../custom hooks/useFetch";

const ProfilePhotoEdit = () => {
    const { myinfo, setmyinfo } = useContext(MyContext);
    const { account_photo, account_type } = myinfo;
    const account_photoRef = useRef();


    const [inputAccount_photo, setinputAccount_photo] = useState(account_photo);
    const [inputAccount_photoFile, setinputAccount_photoFile] = useState();


    const [Account_photoHashState, setAccount_photoHashState] = useState();
    const [inputAccount_photoHash, setinputAccount_photoHash] = useState();


    const [saveEnabled, setsaveEnabled] = useState(false);
    const [resetEnabled, setresetEnabled] = useState(false);

    useEffect(() => {
        if (Account_photoHashState === inputAccount_photoHash) {
            setresetEnabled(false);
            setsaveEnabled(false);
        }
        else {
            setresetEnabled(true);
            setsaveEnabled(true);
        }
    }, [Account_photoHashState, inputAccount_photoHash])

    const reset = (e) => {
        e.preventDefault()
        setinputAccount_photoFile(account_photo);
        setinputAccount_photoHash(Account_photoHashState);
        setinputAccount_photoFile(null)
        account_photoRef.current.value = "";
    }
    const { data, setdata, IsPending, put } = usePutFetch();
    const {post:chatupdatamyphoto}=useFetch();

    useEffect(() => {
        if (data) {
            setmyinfo(info => {
                delete info.account_photo
                return { ...info, account_photo: data.image }
            });
            setdata(null);
            console.log(data);

        }
    }, [data, setmyinfo, setdata]);

    function save(e) {
        e.preventDefault()
        const formData = new FormData();

        formData.append("image", inputAccount_photoFile)
        if (account_type === "Doctor") {
            put("/doctor/edit/general/info/", formData)
        }
        else if (account_type === "Patient") {
            put("/patient/edit/general/info/", formData)
        }

        const formdata2 = new FormData();
        formdata2.append("photo", inputAccount_photoFile)
        chatupdatamyphoto("http://localhost:4000/api/updatemyphoto",formdata2,"formdata","PUT")




    }


    useLayoutEffect(() => {
        const abortCont = new AbortController();

        (async () => {
            const res = await fetch(account_photo, { signal: abortCont.signal });
            const data = await res.arrayBuffer();
            const hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
            setAccount_photoHashState(hash);
            setinputAccount_photoHash(hash);
        })()

        return () => {
            abortCont.abort();
        };

    }, [account_photo]);


    useEffect(() => {
        (async () => {

            if (inputAccount_photoFile) {
                try {
                    let data = await inputAccount_photoFile.arrayBuffer()
                    let hash = cryptoJs.SHA1(new TextDecoder().decode(data)).toString();
                    setinputAccount_photoHash(hash);
                }
                catch (e) {
                    if (e.name === "AbortError")
                        console.log("Aborted")
                }
            }

        })()

    }, [inputAccount_photoFile]);

    return (
        <div style={{ position: "relative" }}>
            {IsPending &&
                < div className="w3-container w3-card  w3-round" style={{ position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader"></div>

                </div>
            }
            <div className="w3-card w3-round w3-white">
                <div className="w3-container">
                    <h4 className="w3-center">My Profile</h4>
                    <p className="w3-center"><img src={inputAccount_photo} className="w3-circle" style={{ height: 106, width: 106 }} alt="Avatar" /></p>
                    <div style={{ textAlign: 'center', fontSize: 'large' }}>
                        <p>Edit My Photo</p>
                    </div>
                    <hr />
                    <form style={{ textAlign: 'center' }}>
                        <div className="w3-row  w3-center" style={{ display: "flex", justifyContent: "center", margin: 15 }}>
                            <input className=" w3-button  w3-round-large   w3-theme-l1" style={{ maxWidth: 200 }} type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => {
                                setinputAccount_photo(URL.createObjectURL(e.target.files[0]));
                                setinputAccount_photoFile(e.target.files[0]);
                            }
                            } ref={account_photoRef} />
                        </div>
                        <div className="w3-row  w3-center" style={{ display: "flex", justifyContent: "center", margin: 15 }}>
                            <button disabled={!resetEnabled} onClick={reset} className="w3-button  w3-round-large  w3-theme-l1 w3-half" style={{ maxWidth: 150, margin: "0 2px 0 0" }}>reset</button>
                            <button disabled={!saveEnabled} onClick={save} className="w3-button  w3-round-large  w3-theme-l1 w3-half" style={{ maxWidth: 150, margin: "0 0 0 2px" }}>save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default ProfilePhotoEdit;