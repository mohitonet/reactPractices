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

function NumberList(props){
    const numbers = props.numbers;
    const listItems = numbers.map((number) => <li>{number}</li>);
    return(
        <ul>{listItems}</ul>
    )
}

const numbers = [1, 2, 3, 4, 5];

ReactDOM.render(
    <NumberList numbers = {numbers} />, 
    document.getElementById('root')
);