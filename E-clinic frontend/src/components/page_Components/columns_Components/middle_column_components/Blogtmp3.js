const Blogtmp3 = () => {
    return ( 
        <div className="w3-container w3-card w3-white w3-round w3-margin boxx"><br />
            <img src="/img/avatar6.png" alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: 60 }} />
            <span className="w3-right w3-opacity">32 min</span>
            <h4>Angie Jane</h4><br />
            <hr className="w3-clear" />
            <p>Have you seen this?</p>
            <img src="/img/nature.jpg" alt="nature" style={{ width: '100%' }} className="w3-margin-bottom" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up" />
                Like</button>
            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment" />
                Comment</button>
        </div>

     );
}
 
export default Blogtmp3;