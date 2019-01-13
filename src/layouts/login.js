import React, { Component } from 'react'

import { Layout, Card} from 'antd'
import WrappedLoginForm from "../components/Login";

class LoginLayout extends Component {
    render() {
        return (
            <Layout className="login-layout">

                <Card>
                    <WrappedLoginForm/>
                </Card>
            </Layout>
        )
    }
}

export default LoginLayout