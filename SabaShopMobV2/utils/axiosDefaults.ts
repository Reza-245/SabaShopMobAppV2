import axios from 'axios';
// axios.defaults.baseURL = 'http://192.168.1.25:4535/'; // ? لوکال
axios.defaults.baseURL = 'http://5.202.251.165:4545/'; // ? بلور آرین
import {uniqueId} from './uniqueId';
// axios.defaults.baseURL = 'http://192.168.1.150:4545/'; // ? بلور آرین لوکال
// axios.defaults.baseURL = '5.202.251.165:4545/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['ucid'] = uniqueId;
axios.defaults.headers.get['ucid'] = uniqueId;
axios.defaults.headers.put['ucid'] = uniqueId;
axios.defaults.headers.delete['ucid'] = uniqueId;
