import {render, Component} from "inferno";

import TypingBar from "../components/typingBar.jsx";


class TypingBars extends Component {    
    render() {
        return(
            <div>
                <h3>{this.props.timeText + (this.props.users.length > 1 ? this.props.time : "")}</h3>
                {this.props.users.map(user => 
                    <TypingBar {...user} />
                )}
            </div>  
        ) 
    }
}


export default TypingBars;
