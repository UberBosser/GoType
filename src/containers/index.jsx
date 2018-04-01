import {render, Component} from "inferno";

import "../css/bootstrap.min.css";
import "../css/global.scss";

import Navbar from "../components/navbar.jsx";
import TypingBox from "../components/typingBox.jsx";


class Page extends Component {
    render() {
        return(
            <div>
                <Navbar/>
                <div class="jumbotron bg-light">
                    <a class="h2" href="/play">Play</a>
                </div>
            </div>
        ) 
    }
}


render(<Page />, document.getElementById("app"));
