const  UserProfileCard= ({data}) => {
    const { first_name, last_name, birthday, image,location}=data.general;
    return (
        <>
        < div className = "w3-card w3-round w3-white" >
            <div className="w3-container">
                <h4 className="w3-center">User Profile</h4>
                    <p className="w3-center"><img src={image} className="w3-circle" style={{ height: 106, width: 106 }} alt="Avatar" /></p>
                <hr />
                    <p><i className="fa fa-user-circle	fa-fw w3-margin-right w3-text-theme" />{first_name + " " + last_name}</p>
                    <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" />{location}</p>
                    <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" />{birthday}</p>
            </div>
        </div >
        </>
        
     );
}
 
export default UserProfileCard;