import { render, Component } from "inferno";

import "../css/bootstrap.min.css";
import "../css/global.scss";

import Navbar from "../components/navbar.jsx";


class Page extends Component {
    render() {
        return(
            <div>
                <Navbar /> 
                <div class="jumbotron">
                    <h2 class="display-4">404: Page not found!</h2>
                </div>
            </div>
        ) 
    }
}

render(<Page />, document.getElementById("app"));
