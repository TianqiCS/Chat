import React, { Component } from 'react';
import Chat from "./components/Chat";
import { Layout } from 'antd';
import Login from "./components/Login";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
const { Header, Footer} = Layout;

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            username :"",
        }
    }

    setName = (e) =>{
        this.setState({username : e.target.value});
    };


    render() {
        return (
            <Router>
                <Layout>
                <Header>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about/">About</Link>
                        </li>
                        <li>
                            <Link to="/users/">Users</Link>
                        </li>
                    </ul>
                </Header>
                <Route path="/" exact render={() => <Index username={this.state.username}/>} />
                <Route path="/users/" render={() => <Login root={this}/>} />
                <Footer>Copyright (c) 2018 Tianqi Wang</Footer>
                </Layout>
            </Router>
        );
    }
}

const Index = (props) => (
    <Layout>
        <Chat username={props.username}/>
    </Layout>
);

export default App;

/*
<Sider>left  sidebar</Sider>
<Content>
    <Chat className="Chat" username={props.username}/>
</Content>
<Sider>right sidebar</Sider>
*/