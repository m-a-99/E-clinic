import { useEffect } from "react";

const ViewVideoFullScreen = ({close,url}) => {
    useEffect(() => {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        const body = document.body;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;
        return () => {
            const body = document.body;
            const scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        };
    }, []);

    

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "fixed", zIndex: 100, width: "100%", height: "100%", backgroundColor: "#202124f2", top: 0, left: 0, bottom: 0, right: 0 }}>
            <div onClick={close} className="w3-rest closebtn w3-right" style={{ position:"fixed",top:5,alignSelf: "end", fontSize: 30, maxWidth: '5%', color: "white", marginRight: 20 }}>
                <i className="fa fa-times" />
            </div>
            <video controls style={{ height: "90%" }} src={url}></video> 
        </div>
    );
}

export default ViewVideoFullScreen;