import { render, Component } from "inferno";
import css from "../css/global.sass";

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
