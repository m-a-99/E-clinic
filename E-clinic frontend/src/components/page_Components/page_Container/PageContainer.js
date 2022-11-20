const PageContainer = ({children}) => {
    return (
        <div className="w3-row">

        <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 70 }}>
            {children}
        </div>
        </div>

    );
}

export default PageContainer;