import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


registerServiceWorker();


function FormattedDateTime(props) {
    return <h2> its a formatted one {props.date.toLocaleTimeString()}</h2>
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <FormattedDateTime date={this.state.date} />
            </div>
        );
    }
}

function Apps() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

function EventsDemo() {
    return (
        <h1>this is a test</h1>
    );
}


//// Events related classes
class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isToggleOn: true };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
        );
    }
}

function UserGreetings(props) {
    return (
        <h1> Welcome back!! </h1>
    );
}

function GuestGreetings(props) {
    return (
        <h1> Please sign up!! </h1>
    );
}

function Greetings(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreetings />;
    }
    else {
        return <GuestGreetings />;
    }
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        }
        else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greetings isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
      </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
      </button>
    );
}
/*
ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
);
*/

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>);
    return (
        <ul>{listItems}</ul>
    )
}

const numbers = [1, 2, 3, 4, 5];

/*
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
*/

function Blog(props) {
    const sideBar = (
        <ul>
            {props.posts.map((posts) =>
                <li key={posts.id}>
                    {posts.title}
                </li>
            )}
        </ul>
    );

    const content = props.posts.map((posts) =>
        <div key={posts.id}>
            <h3>{posts.title}</h3>
            <p>{posts.content}</p>
        </div>
    );

    return(
        <div>
            {sideBar}
            <hr/>
            {content}
        </div>
    );
}

const posts = [
    { id: 1, title: 'Hello world', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install react from NPM' }
];

class NameForm extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
          };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('An essay was subitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay: 
                    <textarea value = {this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

class FlavorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('you choice has been submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Pick your flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" onSubmit={this.handleSubmit} />
            </form>
        );
    }

}


ReactDOM.render(
    <FlavorForm />,
    
    document.getElementById('root')
);