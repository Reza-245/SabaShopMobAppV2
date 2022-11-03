const axios = require('axios').default;
// axios.defaults.baseURL = 'http://192.168.1.137:4000/';
axios.defaults.baseURL = 'http://5.202.251.165:4545/';

// axios.defaults.baseURL = 'http://192.168.1.150:4545/';
// axios.defaults.baseURL = '5.202.251.165:4545/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
