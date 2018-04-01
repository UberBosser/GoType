import {render, Component} from "inferno";

class TypingBar extends Component {
    render() {
        return (
            <div class="row">
                <div class="text-truncate col">{this.props.name}</div>
                <div class="col-lg-9 col-sm-7 col-4 align-self-center">
                    <div class="progress"> 
                        <div class="progress-bar" style="width: 10%;"></div>
                    </div>
                </div>
                <div class="col">30wpm</div>
            </div>
        ) 
    }
}

export default TypingBar;
