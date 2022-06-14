import { TextField } from "@material-ui/core";
import { Component } from "react";
import "./Header.css";

  let time=new Date().toLocaleString();
  class Header extends Component {

    public render(): JSX.Element {
        return (
            <div className="Header" >
                {time}
                <br/>
                <h1>TCoupon </h1>
                    </div>

        );
    }}
        
export default Header;
