import logo from "../assets/logo.svg"
import '../Sass/ProfileComponent.scss'
const ProfileComponent = () => {
    return (<div>
        <img src={logo} width={300}/>
        <div>Name(as in student ID):
        </div>
        <div>
            <div>Tell us why you are joining NUSConnect:</div>
        </div>
    </div>)
}
export default ProfileComponent;