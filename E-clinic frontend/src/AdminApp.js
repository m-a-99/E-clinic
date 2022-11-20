import { Navigate, Route, Routes } from 'react-router-dom';
import { MyContext } from './context/MyContext';
import AddDepartment from './pages/AddDepartment';
import AdminAcceptedDoctors from './pages/AdminAcceptedDoctors ';
import AdminPendingDoctors from './pages/AdminPendingDoctors';
import AdminRejectedDoctors from './pages/AdminRejectedDoctors';
import DoctorProfile from './pages/DoctorProfile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const AdminApp = (myinfo, setmyinfo, IsPending, err) => {
        return (
            <MyContext.Provider value={{ myinfo, setmyinfo }}>
                <div className='w3-theme-l5'>
                    {IsPending  && <h4 className='w3-center w3-white'>Loadding...</h4>}
                    {err  && <>{err}</>}
                    {myinfo && <Routes>
                        <Route path="/" element={<Navigate to="/PendingDoctors"/>}></Route>
                        <Route path="/PendingDoctors" element={<AdminPendingDoctors />}></Route>
                        <Route path="/AcceptedDoctors" element={<AdminAcceptedDoctors />}></Route>
                        <Route path="/RejectedDoctors" element={<AdminRejectedDoctors />}></Route>
                        <Route path="/DoctorProfile/:id" element={<DoctorProfile />} />
                        <Route path="/AddDepartment" element={<AddDepartment />} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<NotFound />} />

                    </Routes>}
                </div>
            </MyContext.Provider>
        );
    }

export default AdminApp;