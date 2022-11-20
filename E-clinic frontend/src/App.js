import './App.css';
import './css/fonts.css';
import './css/w3-colors-flat.css';
import './css/w3-theme-blue-grey.css';
import './css/w3.css';
import "./css/styles.css"
import "./css/login_style.css"

import { useEffect, useState } from 'react';
import useGetFetch from './custom hooks/useGetFetch';
import NormalApp from './NormalApp';
import AdminApp from './AdminApp';
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import AccountSetting from './pages/AccountSetting';
import { MyContext } from './context/MyContext';


function App() {
    //const { data: myinfo, setdata: setmyinfo, IsPending, err } = useGetFetch("/getmyinfo");
    const { data: myinfo1, IsPending, err } = useGetFetch("/user/get/basic/info/");
    const [myinfo, setmyinfo] = useState();
    useEffect(() => {
        window.onclick = (e) => {
            let demo = document.querySelectorAll(".Demo");
            demo.forEach(d => {
                if (!e.target.matches('.dropbtn')) {
                    if (d.className.indexOf("w3-show") !== -1)
                        d.className = d.className.replace(" w3-show", "");
                }
            })

        }

    }, []);
    useEffect(() => {
        function handlescroll() {
            document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
        }
        window.addEventListener('scroll', handlescroll);
        return () => {
            window.removeEventListener("scroll", handlescroll)
        };
    }, []);


    useEffect(() => {
        console.log(myinfo)
    }, [myinfo]);


    useEffect(() => {
        if (myinfo1) {
            setmyinfo({
                myid: myinfo1.id,
                email: myinfo1?.email,
                first_name: myinfo1?.first_name,
                last_name: myinfo1?.last_name,
                location: myinfo1?.location,
                account_type: myinfo1?.account_type,
                account_photo: myinfo1?.image,
                gender: myinfo1?.gender,
                birthday: myinfo1?.birthday,
                status: myinfo1?.status
            })
        }


    }, [myinfo1])


    return (
        <>
            {!err &&myinfo && ((myinfo.account_type === "Doctor" && myinfo?.status === "Accepted") || (myinfo.account_type === "Patient") || (myinfo.account_type === "Admin")) && <div className='w3-theme-l5'>
                {myinfo?.account_type === "Admin" && <AdminApp myinfo={myinfo} setmyinfo={setmyinfo} IsPending={IsPending} err={err} />}
                {(myinfo?.account_type === "Doctor" || myinfo?.account_type === "Patient") && <NormalApp myinfo={myinfo} setmyinfo={setmyinfo} IsPending={IsPending} err={err} />}
            </div>}
            {err &&
                <Routes>
                    <Route path="*" element={<Navigate to="/Login" />} />
                    <Route path="/Login" element={<Login />} />

                </Routes>}
            {!err&&myinfo&&(myinfo.account_type === "Doctor" && myinfo?.status !== "Accepted") &&
                <MyContext.Provider value={{ myinfo, setmyinfo}}>
                    <div className='w3-theme-l5'>
                    <Routes>
                            <Route path="/" element={<Navigate to="/AccountSetting" />} />
                            <Route path="/AccountSetting" element={<AccountSetting />} />
                            <Route path="/Login" element={<Login />} />
                            <Route path="*" element={<NotFound />} />

                    </Routes>
                    </div>
                </MyContext.Provider>
            }



        </>





    );
}

export default App;
