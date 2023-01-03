import {useState, useCallback} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import endpoints from '../utils/endpoints.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ImageSlider} from 'react-native-image-slider-banner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BarIndicator, MaterialIndicator} from 'react-native-indicators';
const axios = require('axios').default;
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import _ErrorLayout from '../layouts/ErrorLayout';
import {MConverter} from '../utils/moneyConverter';
import {substringMaker} from '../utils/substringMaker';
import {isEmpty} from 'lodash';
import {TProductServer} from '../utils/types';
import ResCalculator from '../utils/responsiv/Responsiv';

function _productCard2(product: TProductServer) {
  const navigate = useNavigation<any>();
  const [categories, setCategories] = useState<any>();
  return (
    <TouchableOpacity
      key={product.id}
      activeOpacity={0.9}
      onPress={() => navigate.navigate('PRODUCT_SELF', {product: product})}
      style={styles.HomeContentNewItemView}>
      <View style={styles.HomeContentNewItemImageContainerView}>
        {!isEmpty(product.pic_path) ? (
          <Image
            style={styles.HomeContentNewItemImage}
            source={{uri: endpoints.URL + product.pic_path}}
          />
        ) : (
          <Image
            style={{
              ...styles.HomeContentNewItemImage,
              opacity: 0.6,
            }}
            source={require('../assets/img/noneimage.png')}
          />
        )}
      </View>
      <View style={styles.HomeContentNewItemInfoView}>
        <Text style={styles.HomeContentNewItemInfoTitle}>
          {substringMaker(product.nam, 46)}
        </Text>
        <Text style={styles.HomeContentNewItemInfoPrice}>
          {MConverter(product.price)} تومان
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  HomeContentNewItemView: {
    height: 280,
    width: 160,
    backgroundColor: SabaColors.sabaSlate,
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
    marginVertical: 12,
  },
  HomeContentNewItemImageContainerView: {
    height: 160,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  HomeContentNewItemImage: {
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  HomeContentNewItemInfoView: {
    height: '100%',
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  HomeContentNewItemInfoTitle: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 11, 14),
    color: SabaColors.sabaWhite,
    textAlign: 'center',
    height: 80,
  },
  HomeContentNewItemInfoPrice: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 13, 16),
    color: SabaColors.sabaGold2,
    textAlign: 'center',
    height: 28,
  },
});
export default _productCard2;
