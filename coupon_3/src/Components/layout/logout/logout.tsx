import { useHistory } from "react-router-dom";
import "./logout.css";

function Logout(): JSX.Element {
    const history = useHistory();
 
    return (
        <div className="logout">
            preformaing logout sequance
            { localStorage.removeItem("JWT")}
            { localStorage.removeItem("user")}
            { history.push("/home")}
            { window.location.reload()}
            
            
        </div>
    );
}

export default Logout;
