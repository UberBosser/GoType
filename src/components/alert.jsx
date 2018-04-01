import {render, Component} from "inferno";


class Alert extends Component {
    render() {
        {!this.props.show && <div class="alert alert-danger" role="alert">You are <strong>disconnected</strong> from the server</div>} 
    }
}


export default Alert;
