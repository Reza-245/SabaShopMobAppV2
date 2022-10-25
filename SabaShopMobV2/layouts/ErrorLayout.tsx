import {StyleSheet, Text, View, Dimensions} from 'react-native';
import _menuModal from '../components/_menuModal';
const _ErrorLayout = ({pageError, errorDes}: any) => {
  return (
    <View style={styles.errorPageContainer}>
      <Text style={styles.errorPageText}>خطا در اپلیکیشن</Text>
      <Text style={styles.errorPageTitle}>
        خطایی در صفحه {pageError} رخ داده لطفا به پشتیبانی اطلاع دهید
      </Text>
      <Text style={styles.errorPageInfo}>{errorDes}</Text>
    </View>
  );
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  errorPageContainer: {
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'indigo',
    position: 'absolute',
    top: 0,
    height: MainScreen.height,
    width: MainScreen.width,
    elevation: 2,
  },
  errorPageText: {
    fontFamily: 'shabnamMed',
    fontSize: 16,
    color: '#fff',
  },
  errorPageTitle: {
    fontFamily: 'shabnam',
    color: '#fff',
    marginVertical: 12,
  },
  errorPageInfo: {
    fontFamily: 'shabnam',
    color: '#fff',
  },
});

export default _ErrorLayout;
