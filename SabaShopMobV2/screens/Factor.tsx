import {useCallback, useState} from 'react';
import SabaColors from '../utils/SabaColors.json';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import _ErrorLayout from '../layouts/ErrorLayout';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {identity, isEmpty} from 'lodash';
import axios from 'axios';
import endpoints from '../utils/endpoints.json';
import {SkypeIndicator} from 'react-native-indicators';
import asyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import ToastCustom from '../utils/toastCustom';
import {MConverter} from '../utils/moneyConverter';
import {ProductCoverSchema} from '../realm/Models';
import {ActionShop} from '../realm/ActionShop';
import {TProductCover, TProductServer} from '../utils/types';
import ResCalculator from '../utils/responsiv/Responsiv';
import mainHeight from '../utils/responsiv/MainScreen';
const Factor = () => {
  try {
    const navigate = useNavigation<any>();
    const [factors, setFactors] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const toast = useToast();
    type TProductServerMixed = TProductServer & {
      proNumbers: number;
    };

    useFocusEffect(
      useCallback(() => {
        async function getfactor() {
          const factorData = await asyncStorage.getItem('saba2token');
          axios
            .get(endpoints.getFactor + factorData?.split('|')[1])
            .then(({data}) => setFactors(data))
            .finally(() => setLoading(false));
        }
        getfactor();
      }, []),
    );

    return (
      <View style={styles.factorView}>
        <View style={styles.factorNavback}>
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            activeOpacity={0.5}>
            <AntDesign
              color={SabaColors.sabaWhite}
              size={26}
              name="arrowleft"
            />
          </TouchableOpacity>
        </View>

        {/* <FlatList renderItem={}  /> */}
        <View style={styles.factorSelfView}>
          {loading ? (
            <SkypeIndicator size={60} color="#fff" />
          ) : (
            <>
              {isEmpty(factors) ? (
                <View style={styles.factorNoResultView}>
                  <Text style={styles.factorNoResultText}>
                    فاکتوری ثبت نشده
                  </Text>
                </View>
              ) : (
                <ScrollView>
                  {factors?.map(fac => (
                    <View key={fac.id}>
                      <View
                        style={{
                          ...styles.factorItemView,
                          backgroundColor: 'indigo',
                        }}>
                        <Text style={styles.factorItemRightTextView}>
                          نام کالا
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.kalanam}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          نام مشتری
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.nam}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          کدمشتری
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.idcast}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          کد کالا
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.codekala}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          تاریخ
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.dat}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>زمان</Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.tim}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          تعداد
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.numb} عدد
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>قیمت</Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.price}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          تخفیف
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.ptk}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </>
          )}
        </View>
      </View>
    );
  } catch (err: any) {
    return <_ErrorLayout pageError="Shop" errorDes={err.message} />;
  }
};
const styles = StyleSheet.create({
  factorNavback: {
    paddingHorizontal: 10,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: SabaColors.sabaSlate,
  },
  factorView: {
    height: '100%',
    backgroundColor: SabaColors.sabaSlate2,
  },
  factorSelfView: {
    backgroundColor: SabaColors.sabaSlate2,
    height: mainHeight - 16,
  },
  factorItemView: {
    backgroundColor: SabaColors.sabaSlate,
    height: 34,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingHorizontal: 12,
    marginTop: 3,
  },
  factorItemRightTextView: {
    fontFamily: 'shabnamMed',
    fontSize: ResCalculator(610, 12, 15),
    color: SabaColors.sabaGold2,
  },
  factorItemLeftTextView: {
    fontFamily: 'shabnam',
    fontSize: ResCalculator(610, 12, 15),
    color: SabaColors.sabaGold2,
  },
  factorNoResultView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  factorNoResultText: {
    fontSize: ResCalculator(610, 14, 20),
    color: '#fff',
    fontFamily: 'shabnam',
  },
});

export default Factor;
