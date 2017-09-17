import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import * as util from './util.js';
import 'babel-polyfill';

class App extends Component {

  constructor(...args) {
    super(...args);

    this.state = {};
    this.state.error = false;
    this.state.userImageUrl = null;
    this.state.loggedIn = false;
    this.state.userDetails = {};

    this.generateImage = this.generateImage.bind(this);
    this.onError = this.onError.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  generateImage() {
    this.state.userImageUrl = null;
    this.state.error = false;
    const imageSize = { width: 800, height:800 };
    const imageUrls = [
      `/profile-picture/${this.state.userDetails.userID}?rand=${Math.random()}`,
      '/img/flag.png'
    ];
    util.mergeImages(imageUrls, imageSize)
      .then((image) => {
        this.state.userImageUrl = image;
        this.setState(this.state);
      })
      .catch(this.onError);
  }

  componentWillMount() {
    FB.init({
      appId            : '519129691585992',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });
  }

  onError(err) {
    console.log(err);
    this.state.error = err.message;
    this.setState(this.state);
  }

  onLogin(details) {
    this.state.userDetails = details;
    this.state.loggedIn = true;
    this.generateImage();
    this.setState(this.state);
  }

  render() {
    const userImageUrl = this.state.userImageUrl;
    const error = this.state.error;
    const loggedIn = this.state.loggedIn;
    const defaultImageUrl = '/img/default.jpg';
    let imageBoxContent = null;

    if(error) {
      imageBoxContent = (
        <div>
          <div className="alert alert-danger">{error.length ? error : 'An error occurred.'}</div>
          <Login onLogin={this.onLogin}/>
        </div>
      );
    } else if(!loggedIn){
      imageBoxContent = <Login onLogin={this.onLogin}/>;
    }  else if(loggedIn && !userImageUrl){
      imageBoxContent = (
        <div className="loading">Please Wait</div>
      );
    } else {
      imageBoxContent = (
        <div className="post">
          <a className="btn btn-default" href={userImageUrl} download="profile-nepal.jpg">Download</a>
        </div>
      );
    }

    return (
      <div className="container">
        <ImageBox src={userImageUrl || defaultImageUrl}>{imageBoxContent}</ImageBox>
        <div className="social">
          <div className="fb-like" data-href="http://sundar-nepal.subash.me/" data-layout="standard" data-action="like" data-show-faces="false" data-share="true"></div>
        </div>
        <div className="alert alert-info footer-info">
          <ul>
            <li>Made by, <a href="http://twitter.com/sbspk"><i className="fa fa-twitter"></i> @sbspk</a>, <a href="https://facebook.com/sbspk"><i className="fa fa-facebook"></i> Subash Pathak</a></li>
            <li>Tested only in latest version of Chrome and Firefox. </li>
            <li>Code for this app is available on <a href="https://github.com/Subash/sundar-nepal.subash.me" target="_blank">Github</a> </li>
          </ul>
        </div>
      </div>
    )
  }
}

class ImageBox extends Component {
  render() {
    return (
      <div className="ImageBox">
        <div className="ImageBox__image">
          <img src={this.props.src} width="500" height="auto"/>
        </div>
        <div className="ImageBox__inner">{this.props.children}</div>
      </div>
    )
  }
}

class Login extends Component {

  login() {
    FB.login((response) => {
      if (response.authResponse) {
        this.props.onLogin({
          userID : response.authResponse.userID,
          accessToken: response.authResponse.accessToken
        });
      } else {
        console.log('Not Logged In');
      }
    });
  }

  checkLogin() {
    FB.getLoginStatus( (response)=> {
      if(response.status === 'connected') {
        this.props.onLogin({
          userID : response.authResponse.userID,
          accessToken: response.authResponse.accessToken
        });
      } else {
        this.login();
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.checkLogin.bind(this)} className="btn btn-default">Create from Facebook</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));