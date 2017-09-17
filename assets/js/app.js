import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import * as util from './util.js';
import 'babel-polyfill';
import Container from './container';

class App {

  constructor() {
    this.initializeSDK();
    this.userData = {};
    this.render();
  }

  async updateUserData(userData) {
    const regenerateImage = userData.userId && this.userData.userId !== userData.userId;
    this.userData = { ...this.userData, ...userData };
    if(regenerateImage) await this.generateImage();
    this.render();
  }

  async generateImage() {
    const imageSize = { width: 800, height:800 };
    const imageUrls = [
      `/profile-picture/${this.userData.userId}?rand=${Math.random()}`,
      '/img/flag.png'
    ];

    try {
      const image = await util.mergeImages(imageUrls, imageSize);
      this.updateUserData({ image });
    } catch (err) {
      alert('Failed to create profile picture');
    }
  }

  clearUserData() {
    this.userData = {};
    this.render();
  }

  render() {
    ReactDOM.render(<Container userData={this.userData} />, document.getElementById('app'));
  }

  _login() {
    return new Promise((resolve, reject)=> {
      FB.getLoginStatus( (response)=> {
        if(response.status === 'connected') {
          resolve({ userId: response.authResponse.userID, accessToken: response.authResponse.accessToken });
        } else {
          FB.login((response) => {
            if (response.authResponse) {
              resolve({ userId: response.authResponse.userID, accessToken: response.authResponse.accessToken });
            } else {
              reject(new Error('Unable to login with Facebook'));
            }
          });
        }
      });
    });
  }

  showLoading() {

  }

  hideLoading() {

  }

  async login() {
    try {
      this.clearUserData();
      const userData = await this._login();
      this.showLoading();
      await this.updateUserData(userData);
      this.hideLoading();
    } catch (err) {
      this.hideLoading();
      alert(err.message);
    }
  }

  initializeSDK() {
    if(!global.FB) return alert('Facebook Not Loaded');
    FB.init({
      appId: '519129691585992',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.10'
    });
  }

  static init() {
    global.app = new App();
  }
}

App.init();
