import {render, linkEvent, Component} from "inferno";

import "../components/typingInput.scss";


class TypingInput extends Component { 
    onInput(v, e) {
        if (this.props.textArray.length > 0) {
            const value = e.target.value;
            if (value == this.props.textArray[0]) {
                //this.setState({
                //});
            } 
        } 
    }
    componentDidUpdate(np, ns) {
        if (this.props.started) {
            this.typingInput.focus();
        }
    }
    render() {
        return(
            <div>
                <p class="text-justify">
                    <span id="past-text">
                        you already typed me 
                    </span>
                    <span id="present-text">
                        typeme
                    </span>
                    <span id="future-text">
                        you will type this
                    </span>
                </p>
                <hr />
                <input 
                    id="typing-input" 
                    class="form-control"
                    onInput={linkEvent(this, this.onInput)}
                    disabled={!this.props.started}
                    ref={input => this.typingInput = input}
                />
            </div>
        ) 
    }
} 


export default TypingInput;    
