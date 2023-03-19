import React, {useCallback, useEffect} from 'react';
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
  FlatList,
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
import {MConverter} from '../utils/moneyConverter';
import _ErrorLayout from '../layouts/ErrorLayout';
import _productCard2 from '../components/_productCard2';
import {TProductServer} from '../utils/types';
import ResCalculator from '../utils/responsiv/Responsiv';
const GroupProducts = ({route}: any) => {
  try {
    const [supportModal, setSupportModal] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<TProductServer[]>([]);
    const [search, setSearch] = React.useState<string>();

    useEffect(() => {
      setLoading(true);
      let source = axios.CancelToken.source();
      let AxiosConfigCancel = {cancelToken: source.token};
      axios
        .get(
          `${endpoints.getProducts}/${route?.params?.cat1}/0`,
          AxiosConfigCancel,
        )
        .then(({data}) => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => {})
        .finally(() => {});

      return () => source.cancel();
    }, []);
    const navigate = useNavigation<any>();

    const handleSearch = useCallback(
      debounce((searchData: string) => {
        let source = axios.CancelToken.source();
        let AxiosConfigCancel = {cancelToken: source.token};
        if (loading) source.cancel();
        setLoading(true);
        axios
          .get(
            `${endpoints.getProducts}/${
              route?.params?.cat1
            }/0?qG=${searchData?.replace(' ', '')}`,
            AxiosConfigCancel,
          )
          .then(({data}) => {
            setProducts(data);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
          });
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
                placeholderTextColor="rgba(135,135,135,0.7)"
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
              size={27}
              name="arrow-back"
              color={SabaColors.sabaWhite}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTextContainer}>
            {route?.params?.catName1}
          </Text>
        </View>
        {loading ? (
          <View style={styles.indicatorView}>
            <SkypeIndicator
              animationDuration={1200}
              size={70}
              color={SabaColors.sabaWhite}
              count={5}
              minScale={0.1}
            />
          </View>
        ) : isEmpty(products) ? (
          <View style={styles.productsContentNoResultView}>
            <Text style={styles.productsContentNoResultText}>
              محصولی یافت نشد
            </Text>
          </View>
        ) : (
          <View style={styles.productsContentView}>
            <FlatList
              data={products}
              renderItem={({item, index}: any) => (
                <_productCard2
                  key={item.id}
                  index={index}
                  product={item}
                  length={products.length}
                />
              )}
              keyExtractor={(item: any) => item.id}
              numColumns={2}
            />
          </View>
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
    backgroundColor: SabaColors.sabaSlate2,
  },
  categoryContainer: {
    backgroundColor: SabaColors.sabaSlate,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  categoryTextContainer: {
    fontFamily: 'shabnamMed',
    color: SabaColors.sabaGold2,
    paddingVertical: 2,
  },
  productsSearchContainer: {
    backgroundColor: SabaColors.sabaSlate,
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
    backgroundColor: SabaColors.sabaSlate2,
    paddingVertical: 0,
    paddingHorizontal: 4,
    textAlign: 'right',
    fontSize: ResCalculator(610, 11, 13),
    fontFamily: 'shabnam',
    color: '#fff',
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
    height: MainScreen.height - 77,
    justifyContent: 'center',
    width: '100%',
  },

  productsContentNoResultView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  productsContentNoResultText: {
    fontFamily: 'shabnam',
    color: SabaColors.sabaWhite,
    fontSize: 18,
  },
});

export default GroupProducts;
