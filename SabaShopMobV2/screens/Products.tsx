/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  VirtualizedList,
} from 'react-native';
import MenuModal from '../components/_menuModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import _menuModal from '../components/_menuModal';
import Modal from 'react-native-modal';
import endpoints from '../utils/endpoints.json';
import {SkypeIndicator} from 'react-native-indicators';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {debounce, isEmpty} from 'lodash';
import {favoriteAction} from '../realm/RealmFPList';

const controller = new AbortController();
const Products = () => {
  const [supportModal, setSupportModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any[]>();
  const [favorites, setFavorites] = React.useState<any>();
  const [search, setSearch] = React.useState<string>();

  async function handleFavorite(id: any) {
    if (favorites.includes(id)) favoriteAction('delete', setFavorites, id);
    else favoriteAction('create', setFavorites, id);
  }
  const navigate = useNavigation();
  useFocusEffect(
    useCallback(() => {
      (() =>
        axios
          .get(endpoints.getProducts, {signal: controller.signal})
          .then(({data, status}) => {
            setProducts(data);
            favoriteAction('sync', setFavorites);
            setLoading(false);
          })
          .finally(() => {}))();

      return () => controller.abort();
    }, []),
  );
  // useEffect(() => {
  //   return () => console.log('88888888888888888888888888888888888');
  // }, []);
  const handleSearch = debounce(async (searchData: string) => {
    setSearching(true);
    await axios
      .get(`${endpoints.getProducts}?q=${searchData?.replace(' ', '')}`, {
        signal: controller.signal,
      })
      .then(({data, status}) => {
        setProducts(data);
        setSearching(false);
      })
      .catch(err => {});
  }, 300);

  return (
    <View style={styles.productsView}>
      <_menuModal
        supportModal={supportModal}
        setSupportModal={setSupportModal}
      />
      <View style={styles.productsSearchContainer}>
        <TouchableOpacity
          onPress={() => setSupportModal(true)}
          activeOpacity={0.5}
          style={styles.productsIconMenuView}>
          <Ionicons size={32} name="ios-menu" color={SabaColors.sabaWhite} />
        </TouchableOpacity>
        <View style={styles.productsSearchView}>
          <View style={styles.productsSearchInView}>
            <TextInput
              placeholder="جسـتجو کنید ..."
              placeholderTextColor={SabaColors.sabaGray}
              style={styles.productsInputSearchView}
              onChangeText={value => {
                setSearch(value);
                handleSearch(value);
              }}
              value={search}
            />
          </View>
          {isEmpty(search) ? (
            <View style={styles.productsSearchIconView}>
              <Feather size={27} name="search" color={SabaColors.sabaWhite} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSearch('');
                handleSearch('');
              }}
              activeOpacity={0.5}
              style={styles.productsSearchIconView}>
              <AntDesign size={27} name="close" color={SabaColors.sabaWhite} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigate.goBack()}
          activeOpacity={0.5}
          style={styles.productsIconBackView}>
          <MaterialIcons
            size={32}
            name="arrow-back"
            color={SabaColors.sabaWhite}
          />
        </TouchableOpacity>
      </View>

      {loading || searching ? (
        <View style={styles.indicatorView}>
          <SkypeIndicator
            animationDuration={1200}
            size={70}
            color={SabaColors.sabaGreen}
            count={5}
            minScale={0.1}
          />
        </View>
      ) : isEmpty(products) ? (
        <View style={styles.productsContentNoResultView}>
          <Image
            style={styles.productsContentNoResultImageView}
            source={require('../assets/img/products/notfoundfile.png')}
          />
        </View>
      ) : (
        <VirtualizedList
          style={styles.productsContentView}
          data={products}
          getItemCount={(data: any) => data.length}
          getItem={(listArr, index) => {
            const item = listArr[index];
            return {
              ...item,
              key: `Item${index}`,
            };
          }}
          keyExtractor={(item: any) => item.id}
          renderItem={({item}: any) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigate.navigate('PRODUCT_SELF', {product: item})}
              style={styles.productsContentItemView}>
              <View style={styles.productsContentItemNavView}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => handleFavorite(item.id)}
                  style={styles.productsContentItemNavStatusView}>
                  <AntDesign
                    name={favorites?.includes(item.id) ? 'heart' : 'hearto'}
                    color={
                      favorites?.includes(item.id)
                        ? SabaColors.sabaRed
                        : SabaColors.sabaGray
                    }
                    size={17}
                  />
                </TouchableOpacity>
                <View style={styles.productsContentItemNavIconView}>
                  <Text style={styles.productsContentItemNavIconText}>
                    موجود
                  </Text>
                </View>
              </View>
              <View style={styles.productsContentItemArticleView}>
                <View style={styles.productsContentItemInfoView}>
                  <Text style={styles.productsContentItemInfoTitle}>
                    {item.nam}
                  </Text>
                  <Text style={styles.productsContentItemInfoPrice}>
                    قیمت نقدی{' '}
                    {String(item.price).replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1,',
                    )}{' '}
                  </Text>
                  <Text style={styles.productsContentItemInfoPrice}>
                    قیمت چکی{' '}
                    {String(item.pric).replace(
                      /(\d)(?=(\d{3})+(?!\d))/g,
                      '$1,',
                    )}{' '}
                  </Text>
                </View>
                <View style={styles.productsContentItemImageView}>
                  <Image
                    style={styles.productsContentItemImage}
                    source={{uri: endpoints.URL + item.pic_path}}
                  />
                </View>
              </View>
              <View style={styles.productsContentItemArticleExistView}>
                <Text style={styles.productsContentItemInfoExist}>
                  موجودی: {item.numb} عدد
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  productsView: {
    height: MainScreen.height - 35,
    width: MainScreen.width,
    backgroundColor: SabaColors.sabaWhite,
  },
  productsSearchContainer: {
    backgroundColor: SabaColors.sabaGreen,
    height: 46,
    flexDirection: 'row-reverse',
  },
  productsIconMenuView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsSearchInView: {
    flex: 7,
  },
  productsSearchView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 8,
    flexDirection: 'row-reverse',
  },
  productsInputSearchView: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingVertical: 0,
    paddingHorizontal: 4,
    textAlign: 'right',
    fontSize: 10,
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaWhite,
  },
  indicatorView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  indicator: {
    paddingHorizontal: 10,
  },
  productsSearchIconView: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsIconBackView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsContentView: {
    paddingHorizontal: 10,
  },

  productsContentNoResultView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsContentNoResultImageView: {
    resizeMode: 'contain',
    flex: 1,
    width: '100%',
  },

  productsContentNoResultText: {
    fontFamily: 'shabnam',
  },
  productsContentItemView: {
    borderRadius: 8,
    height: 160,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 8,
    elevation: 2,
    marginBottom: 9,
  },
  productsContentItemNavView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  productsContentItemNavStatusView: {},
  productsContentItemNavIconView: {
    height: 20,
    width: 38,
    backgroundColor: SabaColors.sabaLightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsContentItemNavIconText: {
    fontSize: 9,
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaGreen,
  },
  productsContentItemArticleView: {
    height: 106,
    flexDirection: 'row-reverse',
  },
  productsContentItemInfoView: {
    flex: 2,
  },
  productsContentItemImageView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  productsContentItemImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  productsContentItemInfoTitle: {
    marginTop: 8,
    fontFamily: 'shabnamMed',
    fontSize: 12,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    marginVertical: 2,
    color: SabaColors.sabaBlack,
    textAlign: 'right',
  },
  productsContentItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 11,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    marginTop: 1,
    color: SabaColors.sabaDarkGary,
    textAlign: 'right',
  },
  productsContentItemArticleExistView: {},
  productsContentItemInfoExist: {
    fontFamily: 'shabnamMed',
    fontSize: 13,
    textShadowColor: SabaColors.sabaGreen,
    textShadowRadius: 9,
    color: SabaColors.sabaGreen,
  },
});

export default Products;
