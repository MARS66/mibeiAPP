import React, {Component} from 'react'
import './index.scss'
import { Button, Toast } from 'antd-mobile'

import http from '../../http'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CommonAction from '../../redux/actions/common';
import logo from './logo1.png'
class Login extends Component{
  async submitLogin () {
    const mobile = this.refs.phoneNumber.value
    const password = this.refs.passwords.value
    const {errno, data, errmsg} = await  http.postLogin({mobile, password})
    if(errno === 0){
      window.localStorage.setItem('token', data.sessionKey)
      window.localStorage.setItem('nideShopUser', data.mobile)
      this.props.actions.loginSuccess()
    } else {
      Toast.fail(errmsg, .5)
    }
  }
  toRegister () {
    this.props.history.push('/register')
  }
  render () {
    return (
      <div className="loginBox">
        <div className="logo">
          <img src={logo} alt=""/>
        </div>
        <div className="loginMain">
          <div className="inputWrap onePx_bottom">
            <input type="text" ref="phoneNumber" defaultValue={15323807318} placeholder="请输入手机号码" />
          </div>
          <div className="inputWrap onePx_bottom">
            <input type="password" ref="passwords" defaultValue={123456} placeholder="请输入登录密码" />
          </div>
          <div className="loginBtn">
            <Button type="primary" onClick={this.submitLogin.bind(this)}>登录</Button>
            <Button type="primary" className="register_button" onClick={this.toRegister.bind(this)}>还没有账户</Button>
          </div>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(CommonAction, dispatch)})
export default (connect(null, mapDispatchToProps)(Login))
