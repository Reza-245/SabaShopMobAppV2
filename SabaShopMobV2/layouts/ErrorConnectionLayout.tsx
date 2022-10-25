import SabaColors from '../utils/SabaColors.json';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import _ErrorLayout from './ErrorLayout';
import Feather from 'react-native-vector-icons/Feather';
import _menuModal from '../components/_menuModal';
const _ErrorConnectionLayout = () => {
  try {
    return (
      <View style={styles.ConnectionErrorView}>
        <Feather name="wifi-off" color={SabaColors.sabaLightRed} size={200} />
        <Text style={styles.ConnectionErrorText}>درحال برقراری اتصال</Text>
      </View>
    );
  } catch (err: any) {
    return (
      <_ErrorLayout pageError="ErrorConnectionLayout" errorDes={err.message} />
    );
  }
};
const MainWindow = Dimensions.get('window');
const styles = StyleSheet.create({
  ConnectionErrorView: {
    position: 'absolute',
    backgroundColor: 'rgba(30,30,30,0.4)',
    height: MainWindow.height,
    width: MainWindow.width,
    top: 0,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ConnectionErrorText: {
    fontFamily: 'shabnamMed',
    marginTop: 20,
    color: SabaColors.sabaRed,
    backgroundColor: SabaColors.sabaLightRed,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
});

export default _ErrorConnectionLayout;
