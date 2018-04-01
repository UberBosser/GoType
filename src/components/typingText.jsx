import { render, Component } from "inferno";

class TypingText extends Component {
    render() {
        return(
            <p class="text-justify">{this.props.text}</p>
        ) 
    } 
}

export default TypingText;
