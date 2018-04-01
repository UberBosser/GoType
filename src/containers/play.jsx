import {render, linkEvent, Component} from "inferno";

import "../css/bootstrap.min.css";
import "../css/global.scss";

import Socket from "../utils/socket.jsx";
import {CTS, STC, EVENT} from "../utils/socketCodes.jsx";

import Navbar from "../components/navbar.jsx";
import Alert from "../components/alert.jsx"
import TypingBox from "../components/typingBox.jsx";


class Page extends Component {
    constructor(props) {
        super();
        this.state = {
            id: "",
            users: [],
            text: "",
            timeText: "Waiting for players",
            cdtime: 30,
            connected: false,
            updateUser: this.updateUser.bind(this)
        };
    }
    componentDidMount() {
        let socket = this.socket = new Socket();
        socket.on(EVENT.CONNECT, this.onConnect.bind(this));
        socket.on(EVENT.DISCONNECT, this.onDisconnect.bind(this));
        // socket.on(STC.ADD_USER, this.addUser.bind(this));
        socket.on(STC.UPDATE_USERS, this.updateUsers.bind(this));
        socket.on(STC.INIT_USER, this.initUser.bind(this));
        // socket.on(STC.START_GAME, linkEvent(this, this.startGame));
        // socket.on(STC.END_GAME, linkEvent(this, this.endGame))
    }
    onConnect() {
        this.setState({connected: true});
        this.socket.emit(CTS.ADD_USER, {name: "Guest"})
    }
    onDisconnect() { 
        this.setState({connected: false});
    }
    // REMOVE this once done!!
    addUser(user) {
        let users = this.state.users;
        users.push(user);
        this.setState({users});
    }
    updateUsers(game) {
        if (game.started) {
            this.setState({timeText: "Time \'till finish: "});
        }
        this.setState({
            users: game.users,
            cdtime: game.cdtime
        });
    }
    initUser(init) {
        this.setState({
            text: init.text,
            id: init.id
        });
    }
    startGame() {
        // Start the game.
    }
    endGame() {
        // End the game. 
    }
    updateUser(data) {
        socket.emit(CTS.UPDATE_USER, data) 
    }
    render() {
        return(
            <div>
                <Navbar />
                <Alert show={this.state.disconnected} />
                <TypingBox {...this.state}/>
            </div>
        ) 
    }
}


render(<Page />, document.getElementById("app"));
