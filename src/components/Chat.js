import React from "react";
import {Input, Card, List, Avatar, Popover, Icon} from 'antd';
import './Chat.css';

import io from "socket.io-client";
import FileUpload from "./FileUpload";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: this.props.username,
            message: {
                text: "",
                files: [],
            },

            messages: sessionStorage.getItem('messages') ? JSON.parse(sessionStorage.getItem('messages')) : []
        };
        console.log(this.state.messages[0]);

        this.socket = io('http://vanillacraft.cn:8000');

        this.sendMessage = () => {
            if (!this.state.username) {alert("Enter a user name first!"); window.location.href = "/users"; return}
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message: {
                    text: "",
                    files: [],
                }});
        };


        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            sessionStorage.setItem('messages', JSON.stringify(this.state.messages));
            console.log(this.state.messages);
        };

        const clearMessage = () => {
            sessionStorage.setItem('messages', JSON.stringify([]));
            this.setState({
                messages: JSON.parse(sessionStorage.getItem('messages'))
            })
        }


    }
    render(){
        const Send = Input.Search;
        return (
                <Card id="chat" title="Chat Message" className="messages" type="inner" >
                    <List id="chatbox"
                          size="small"
                          itemLayout="vertical"
                          dataSource={this.state.messages}
                          renderItem={message => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="http://lorempixel.com/100/100/" />}
                                    title={<a href="/users">{message.author}</a>}
                                    description={message.message.text}
                                />
                                {message.message.files.length > 0 &&
                                <List
                                    id = "filebox"
                                    size= "small"
                                    itemLayout="horizontal"
                                    grid={{ gutter: 12, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, }}
                                    dataSource={message.message.files}
                                    locale={{emptyText: ''}}
                                    renderItem={file => (
                                        <List.Item>
                                            <Popover content={<a href= {"http://vanillacraft.cn:8001/public/"+file} download> {<Icon type="download" />} </a> }>
                                                <Card

                                                    hoverable
                                                    style={{
                                                        objectFit: "fill",
                                                        height: "100%"
                                                    }}
                                                    cover={<img alt={file} src={"http://vanillacraft.cn:8001/public/"+file} />}
                                                >
                                                    <Card.Meta
                                                        description={file}
                                                    />
                                                </Card>
                                            </Popover>
                                        </List.Item>
                                    )}
                                />}
                            </List.Item>
                          )}
                    />
                <Input.Group>
                    <Send type="text" placeholder="Message" className="form-control" value={this.state.message.text} onChange={ev => this.setState({message: {text: ev.target.value, files: this.state.message.files}})}
                           onPressEnter={this.sendMessage} enterButton="Send" onSearch={this.sendMessage}/>
                    <h2> File upload </h2>
                    <FileUpload files = {this.state.message.files}/>
                </Input.Group>
                </Card>
        );

    }
}
// <Input maxLength= "10" type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
export default Chat;