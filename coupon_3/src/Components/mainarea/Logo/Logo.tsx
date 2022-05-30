import { Component } from "react";
import "./Logo.css";
import logoImage from "../../../Assets/COUPON.png"

class Logo extends Component {
    public render(): JSX.Element {
        return (
            <div className="Logo">
				<img src={logoImage} />
            </div>
        );
    }
}

export default Logo;
