import {render, Component} from "inferno";

import TypingBars from "../components/typingBars.jsx";
import TypingText from "../components/typingText.jsx";
import TypingInput from "../components/typingInput.jsx";


class TypingBox extends Component {    
    render() {
        return(
            <div class="jumbotron text-center bg-light">
                <TypingBars 
                    users={this.props.users} 
                    time={this.props.cdtime}
                    timeText={this.props.timeText}
                />
                <hr />
                <TypingInput 
                    text={this.props.text}
                    textArray={this.props.textArray}
                    started={this.props.started}
                    finished={this.props.finished}
                    updateUser={this.props.updateUser}
                />
            </div>
        ) 
    }
}


export default TypingBox;
