import React, {useCallback} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import _menuModal from '../components/_menuModal';
import endpoints from '../utils/endpoints.json';
import {SkypeIndicator} from 'react-native-indicators';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {debounce, isEmpty} from 'lodash';
import {favoriteChacker} from '../utils/favoriteChecker';
import {favDeleter} from '../utils/favoriteDeleter';
import {ActionFPList} from '../realm/ActionFPList';
import {MConverter} from '../utils/moneyConverter';
import _ErrorLayout from '../layouts/ErrorLayout';

const Products = ({route}: any) => {
  try {
    const [supportModal, setSupportModal] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [searching, setSearching] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<any[]>();
    const [favorites, setFavorites] = React.useState<any>();
    const [search, setSearch] = React.useState<string>();
    const navigate = useNavigation<any>();
    useFocusEffect(
      useCallback(() => {
        let source = axios.CancelToken.source();
        let AxiosConfigCancel = {cancelToken: source.token};
        (async () =>
          await axios
            .get(
              `${endpoints.getProducts}/${
                route?.params?.cat1 ? route?.params?.cat1 : 0
              }/0`,
              AxiosConfigCancel,
            )
            .then(({data}) => {
              setProducts(data);
              ActionFPList('sync', 0, setFavorites);
              setLoading(false);
            })
            .catch(() => {})
            .finally(() => {}))();

        return () => source.cancel();
      }, []),
    );

    const handleSearch = useCallback(
      debounce(async (searchData: string) => {
        setSearching(true);
        await axios
          .get(`${endpoints.getProducts}?q=${searchData?.replace(' ', '')}`)
          .then(({data}) => {
            setProducts(data);
            setSearching(false);
          })
          .catch(() => {});
      }, 300),
      [],
    );

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
                <Feather size={22} name="search" color={SabaColors.sabaWhite} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSearch('');
                  handleSearch('');
                }}
                activeOpacity={0.5}
                style={styles.productsSearchIconView}>
                <AntDesign
                  size={27}
                  name="close"
                  color={SabaColors.sabaWhite}
                />
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
                onPress={() =>
                  navigate.navigate('PRODUCT_SELF', {product: item})
                }
                style={styles.productsContentItemView}>
                <View style={styles.productsContentItemNavView}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => favDeleter(favorites, setFavorites, item.id)}
                    style={styles.productsContentItemNavStatusView}>
                    <AntDesign
                      name={favoriteChacker(favorites, item.id)}
                      color={SabaColors.sabaRed}
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
                      قیمت نقدی {MConverter(item.price)} تومان
                    </Text>
                    <Text style={styles.productsContentItemInfoPrice}>
                      قیمت چکی {MConverter(item.price1)} تومان
                    </Text>
                  </View>
                  <View style={styles.productsContentItemImageView}>
                    {!isEmpty(item.pic_path) ? (
                      <Image
                        style={styles.productsContentItemImage}
                        source={{uri: endpoints.URL + item.pic_path}}
                      />
                    ) : (
                      <Image
                        style={{
                          ...styles.productsContentItemImage,
                          opacity: 0.6,
                        }}
                        source={require('../assets/img/noneimage.png')}
                      />
                    )}
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
  } catch (err: any) {
    return <_ErrorLayout pageError="Products" errorDes={err.message} />;
  }
};
const MainScreen = Dimensions.get('window');
const styles = StyleSheet.create({
  productsView: {
    height: MainScreen.height,
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
    paddingVertical: 7,
    flexDirection: 'row-reverse',
  },
  productsInputSearchView: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingVertical: 0,
    paddingHorizontal: 4,
    textAlign: 'right',
    fontSize: 13,
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaWhite,
    height: '100%',
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
    fontSize: 15,
    textShadowColor: SabaColors.sabaDarkGary,
    textShadowRadius: 9,
    marginVertical: 2,
    color: SabaColors.sabaBlack,
    textAlign: 'right',
  },
  productsContentItemInfoPrice: {
    fontFamily: 'shabnam',
    fontSize: 13,
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
    textShadowRadius: 3,
    color: SabaColors.sabaGreen,
  },
});

export default Products;
