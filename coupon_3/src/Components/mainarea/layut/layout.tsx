import "./layout.css";
import { Component } from "react";
import Routing from "../../Routing/Routing";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Logo from "../Logo/Logo";
import { BrowserRouter } from "react-router-dom";
import "./layout.css";


class Layout extends Component {

    state = {
        rerender :false
    }
   

    public render(): JSX.Element {
        return (
            <BrowserRouter>
                <div className="layout">
                        <header>
                            <Header/>
                        </header>
                        <aside>
                         <Logo/>
                     </aside>
                        <main> 
                            <Routing/>
                        </main>
                        <aside>
                            <Menu/>
                        </aside>
                        <footer>
                            <Footer/>
                        </footer>
                </div>
                </BrowserRouter>
           
        );
    }
}

export default Layout;
