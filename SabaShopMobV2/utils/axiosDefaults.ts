import axios from 'axios';
import endpoints from './endpoints.json';
axios.defaults.baseURL = endpoints.URL; // ? لوکال
// axios.defaults.baseURL = 'http://5.202.251.165:4545/'; // ? بلور آرین
// axios.defaults.baseURL = 'http://192.168.1.150:4545/'; // ? بلور آرین لوکال
// axios.defaults.baseURL = '5.202.251.165:4545/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['ucid'] = endpoints.ucid;
axios.defaults.headers.get['ucid'] = endpoints.ucid;
axios.defaults.headers.put['ucid'] = endpoints.ucid;
axios.defaults.headers.delete['ucid'] = endpoints.ucid;
