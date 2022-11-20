import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../custom hooks/useFetch";

const Login = () => {
    const [signupmode, setsignupmode] = useState(false);

    const [loginEmail, setloginEmail] = useState("");
    const [loginPassword, setloginPassword] = useState("");

    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [signupEmail, setsignupEmail] = useState("");
    const [signupPassword, setsignupPassword] = useState("");
    const [signupPasswordConf, setsignupPasswordConf] = useState("");
    const [signuptype, setsignuptype] = useState("");

    const navto = useNavigate();

    const { data: logindata, IsPending: loginIsPending, err: loginerr, post: loginPost } = useFetch();
    const { data: signupdata, IsPending: signupIsPending, err: signuperr, post: signupPost } = useFetch();

    const {  post: chatloginPost } = useFetch();
    const {  post: chatsignupPost } = useFetch();

    function setCookie(name, value, exp) {
        var expires = "";
        if (exp) {
            var date = new Date(exp);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    // function getCookie(name) {
    //     var nameEQ = name + "=";
    //     var ca = document.cookie.split(';');
    //     for (var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    //         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    //     }
    //     return null;
    // }
    // function eraseCookie(name) {
    //     document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // }

    useEffect(() => {
        if (logindata) {
            setCookie("token", logindata.token, logindata.expiry);
            window.location = "/";
        }

    }, [logindata, navto]);

    useEffect(() => {
        if (signupdata) {
            setsignupmode(false)
        }
    }, [signupdata])

    function login(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("email", loginEmail);
        formdata.append("password", loginPassword);
        loginPost("http://localhost:8000/login/", formdata,"formdata", "POST");
        
        const formdata2=JSON.stringify({user_email: loginEmail, user_password:loginPassword})
        chatloginPost("http://localhost:4000/login", formdata2 ,"json","POST")


    }
    function signup(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("first_name",firstname);
        formdata.append("last_name",lastname);
        formdata.append("email", signupEmail);
        formdata.append("password", signupPassword);
        formdata.append("confirm_password", signupPasswordConf)
        formdata.append("type", signuptype)
        signupPost("http://localhost:8000/register/", formdata, "formdata", "POST");
        

        const formdata2 = JSON.stringify({ user_name: firstname + " " + lastname, user_email: signupEmail, user_password: signupPassword, conf_password: signupPasswordConf, user_type: signuptype})
        chatsignupPost("http://localhost:4000/signup", formdata2, "json", "POST")

        

    }







    return (
        <div className={signupmode ? "container sign-up-mode login" : "container  login"}>
            <div className="forms-container login">
                <div className="signin-signup login">
                    <form id="login" action="/login/" className="sign-in-form login" method="post">
                        {JSON.parse(loginerr)?.email && <h3 style={{ color: "crimson" }}>{JSON.parse(loginerr)?.email}</h3>}
                        {JSON.parse(loginerr)?.non_field_errors && <h3 style={{ color: "crimson" }}>{JSON.parse(loginerr)?.non_field_errors}</h3>}
                        <h2 className="title login">Sign in</h2>
                        <div className="input-field login">
                            <i className="fa fa-envelope" />
                            <input className="email login" name="email" type="email" placeholder="Email" onChange={e => setloginEmail(e.target.value)} value={loginEmail} required />
                        </div>
                        <div className="input-field login">
                            <i className="fa fa-lock" />
                            <input className="password login" name="password" type="password" placeholder="Password" onChange={e => setloginPassword(e.target.value)} value={loginPassword} required />
                        </div>
                        <button onClick={login} className="btn solid login" style={{ fontSize: 15 }}>Login</button>
                        <p className="social-text login">Or Sign in with social platforms</p>
                        <div className="social-media login">
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-facebook-f" />
                            </a>
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-twitter" />
                            </a>
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-google" />
                            </a>
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-linkedin" />
                            </a>
                        </div>
                    </form>
                    <form id="register" action="/register/" className="sign-up-form login" method="post">
                        {JSON.parse(signuperr)?.email && <h5 style={{ color: "crimson" }}>{"email: " + JSON.parse(signuperr)?.email}</h5>}
                        {JSON.parse(signuperr)?.password && <h5 style={{ color: "crimson" }}>{"password: " + JSON.parse(signuperr)?.password}</h5>}
                        {JSON.parse(signuperr)?.confirm_password && <h5 style={{ color: "crimson" }}>{"confirm password " + JSON.parse(signuperr)?.confirm_password}</h5>}

                        <h2 className="title login">Sign up</h2>



                        <div style={{ display: "flex", maxWidth: 380 }}>
                            <div className="input-field login"  style={{maxWidth:190 }}>
                                <i style={{ marginLeft: 18 }}className="fa fa-envelope " />
                                <input style={{ marginLeft: 20 }} className="login" name="email" type="email" placeholder="First name" onChange={e => setfirstname(e.target.value)} value={firstname} required />
                            </div>
                            <div className="input-field login" style={{ maxWidth: 190 }}>
                                <i style={{ marginLeft: 18 }}className="fa fa-envelope " />
                                <input style={{ marginLeft: 20 }} className="login" name="email" type="email" placeholder="Last name" onChange={e => setlastname(e.target.value)} value={lastname} required />
                            </div></div>


                        <div className="input-field login">
                            <i className="fa fa-envelope " />
                            <input className="login" name="email" type="email" placeholder="Email" onChange={e => setsignupEmail(e.target.value)} value={signupEmail} required />
                        </div>
                        <div className="input-field login">
                            <i className="fa fa-lock " />
                            <input className="login" name="password" type="password" placeholder="Password" onChange={e => setsignupPassword(e.target.value)} value={signupPassword} required />
                        </div>
                        <div className="input-field login">
                            <i className="fa fa-lock " />
                            <input className="login" name="confirm_password" type="password" placeholder="Confirm Password" onChange={e => setsignupPasswordConf(e.target.value)} value={signupPasswordConf} required />
                        </div>
                        <div className="wrapper login">
                            <input className="login" type="radio" name="type" id="option-1" onChange={(e) => { setsignuptype(e.target.value) }} defaultValue="Doctor" required />
                            <input className="login" type="radio" name="type" id="option-2" onChange={(e) => { setsignuptype(e.target.value) }} defaultValue="Patient" />
                            <label htmlFor="option-1" className="option option-1 login" style={{ borderRadius: '55px 0 0 55px', borderRightWidth: '0.5px' }}>
                                <div className="dot login" />
                                <span className="">Doctor</span>
                            </label>
                            <label htmlFor="option-2" className="option option-2 login" style={{ borderRadius: '0 55px 55px 0', borderLeftWidth: '0.5px' }}>
                                <div className="dot login" />
                                <span className="">Patient</span>
                            </label>
                        </div>
                        <button onClick={signup} className="btn login" style={{ fontSize: 15 }}>Sign up</button>
                        <p className="social-text login">Or Sign up with social platforms</p>
                        <div className="social-media login">
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-facebook-f " />
                            </a>
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-twitter " />
                            </a>
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-google " />
                            </a>
                            <a href="/login" className="social-icon login">
                                <i className="fa fa-linkedin " />
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="panels-container login">
                <div className="panel left-panel login">
                    <div className="content login">
                        <h3 className="login">New here ?</h3>
                        <p className="login">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                        <button onClick={() => setsignupmode(true)} className="btn transparent login" id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src="/img/login.svg" className="image login" alt="img" />
                </div>
                <div className="panel right-panel login" >
                    <div className="content login">
                        <h3 className="login">One of us ?</h3>
                        <p className="login">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                        </p>
                        <button onClick={() => setsignupmode(false)} className="btn transparent login" id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src=" /img/register.svg" className="image login" alt="img" />
                </div>
            </div>
        </div>

    );
}

export default Login;





