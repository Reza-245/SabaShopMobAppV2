import axios from 'axios';
let source = axios.CancelToken.source();
export let AxiosConfigCancel = {cancelToken: source.token};
