import { render, Component } from "inferno";
import "../components/typingInput.scss";


class TypingInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        
        // this.onChange = this.onChange.bind(this);
        // this.onInput = this.onInput.bind(this);
    }

    onInput() {
        console.log("input!");
    }

    render() {
        return(
            <input id="typing-input" 
                class="form-control"> 
            </input>
        ) 
    }
} 


export default TypingInput;    
