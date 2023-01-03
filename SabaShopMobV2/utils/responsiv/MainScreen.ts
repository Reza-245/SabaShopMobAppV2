import {Dimensions, StatusBar} from 'react-native';

const mainHeight = Dimensions.get('window').height - StatusBar.currentHeight!;

export default mainHeight;
