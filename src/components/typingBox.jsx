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
                <TypingText text={this.props.text}/>
                <hr />
                <TypingInput />
            </div>
        ) 
    }
}


export default TypingBox;
