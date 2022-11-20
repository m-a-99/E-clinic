import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import AccountSetting from './pages/AccountSetting';
import Profile from './pages/Profile';
import Questions from './pages/Questions';
import useGetFetch from './custom hooks/useGetFetch';
import { MyContext } from './context/MyContext';
import AskQuestion from './pages/AskQuestion';
import QuestionDetailsMiddleColumn from './components/page_Components/pages_Columns/question_Details_Columns/QuestionDetailsMiddleColumn';
import QuestionsMiddleColumn from './components/page_Components/pages_Columns/questions_Columns/QuestionsMiddleColumn';
import MyQuestionMiddleColumn from './components/page_Components/pages_Columns/myquesions_Columns.js/MyQuestionMiddleColumn';
import EditQuestionMiddleColumn from './components/page_Components/pages_Columns/edit_Question_Columns/EditQuestionMiddleColumn';
import CreateBlog from './pages/CreateBlog';
import NotFound from './pages/NotFound';
import MyBlogs from './pages/MyBlogs';
import EditBlog from './pages/EditBlog';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import QusetionsDirectedT0Me from './pages/QusetionsDirectedT0Me';

function NormalApp({ myinfo, setmyinfo, IsPending , err }) {
  //const { data: myinfo, setdata: setmyinfo, IsPending, err } = useGetFetch("/getmyinfo");
  const { data: departmentsDoctors } = useGetFetch("/get/departments/doctors/");
  const { data: departments, IsPending: departmentsIsPending, err: departmentserr } = useGetFetch("/get/departments/");
  return (
    <MyContext.Provider value={{ myinfo, setmyinfo, departments, departmentsDoctors }}>

      <div className='w3-theme-l5'>
        {(IsPending || departmentsIsPending) && <h4 className='w3-center w3-white'>Loading...</h4>}
        {(err || departmentserr) && <>{err}</>}
        {myinfo && departments && <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AccountSetting" element={<AccountSetting />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/UserProfile/:id" element={<UserProfile/>} />
          <Route path="/Questions" element={<Questions />} >
          
            {/* <Route path="/Questions/:id" element={<QuestionDetails />} /> */}
            <Route path="/Questions/" element={< QuestionsMiddleColumn />} />
            <Route path="/Questions/:id" element={<QuestionDetailsMiddleColumn />} />
            {(myinfo?.account_type === "Patient") && <Route path="/Questions/EditQuestion/:id" element={<EditQuestionMiddleColumn />} />}
            {(myinfo?.account_type === "Patient") && <Route path="/Questions/myQuestions" element={<MyQuestionMiddleColumn />} />}
          </Route>
          {(myinfo.account_type === "Doctor") && <Route path="/QusetionsDirectedToMe/" element={<QusetionsDirectedT0Me />} >
            <Route path="/QusetionsDirectedToMe/" element={< QuestionsMiddleColumn />} />
          </Route>}
          {(myinfo?.account_type === "Patient") && <Route path="/AskQuestion" element={<AskQuestion />} />}
          {(myinfo?.account_type === "Doctor") && <Route path="/EditBlog/:id" element={<EditBlog/>} />}

          {(myinfo?.account_type === "Doctor") && <Route path="/CreateBlog" element={<CreateBlog />} />}
          {(myinfo?.account_type === "Doctor") && <Route path="/MyBlogs" element={<MyBlogs />} />}
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

        </Routes>}
      </div>
    </MyContext.Provider>
  );
}

export default NormalApp;
