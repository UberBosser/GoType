import { render, Component } from "inferno";

class Navbar extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div class="container-fluid">
                    <a class="navbar-brand mb-0" href="/">Brand</a>
                    <a class="btn btn-light navbar-right" href="/auth" role="button"><span class="material-icons">face</span> Login</a>
                </div>
            </nav>
        ) 
    }
}

export default Navbar;
