import React,{Component} from "react";
import { Card, Input,Button } from 'antd';
import {Link} from "react-router-dom";
import Particles from 'react-particles-js';
import './Login.css';

export default class Login extends Component{
    render(){
        return (
            <div className="login-page">
                <Particles/>
                <Card className="login-card"
                    cover={<img alt="example" src="http://lorempixel.com/350/200/" />}
                >
                    <div id="username">
                        <Input placeholder="Username" maxLength={10} value={this.props.root.state.username} onChange={this.props.root.setName}/>
                        <Link to="/"><Button icon={"arrow-right"} type={"primary"}>Go!</Button></Link>
                    </div>
                </Card>
            </div>
        );
    }

}