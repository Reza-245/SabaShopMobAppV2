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
            .then(({data: dataList}) => {
              let allFactorsSorted = [];
              let factorListedObject = {
                customerName: '',
                customerCode: '',
                factorNumber: '',
                date: '',
                time: '',
                factors: [],
              };
              let allFactorNumbers = [];
              for (const data of dataList)
                allFactorNumbers.push(data.factorNumber);

              let uniqueFactorNumbers = [...new Set(allFactorNumbers)];
              for (let unique of uniqueFactorNumbers) {
                let alluniqueFactors = dataList.filter(
                  d => d.factorNumber === unique,
                );

                factorListedObject.customerName = alluniqueFactors[0].nam;
                factorListedObject.customerCode = alluniqueFactors[0].idcast;
                factorListedObject.factorNumber =
                  alluniqueFactors[0].factorNumber;
                factorListedObject.date = alluniqueFactors[0].dat;
                factorListedObject.time = alluniqueFactors[0].tim;
                factorListedObject.factors = [...alluniqueFactors];

                allFactorsSorted.push({...factorListedObject});
              }
              setFactors(
                allFactorsSorted.sort(
                  (a: any, b: any) => b.factorNumber - a.factorNumber,
                ),
              );
            })
            .finally(() => {
              setLoading(false);
            });
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
                  {factors?.map((fac, index) => (
                    <View key={index}>
                      {/* <View
                        style={{
                          ...styles.factorItemView,
                          backgroundColor: 'indigo',
                        }}>
                        <Text style={styles.factorItemRightTextView}>
                          نام مشتری
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.customerName}
                        </Text>
                      </View> */}
                      <View
                        style={{
                          ...styles.factorItemView,
                          backgroundColor: 'indigo',
                        }}>
                        <Text style={styles.factorItemRightTextView}>
                          شماره فاکتور
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.factorNumber}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          کدمشتری
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.customerCode}
                        </Text>
                      </View>

                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>
                          تاریخ
                        </Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.date}
                        </Text>
                      </View>
                      <View style={styles.factorItemView}>
                        <Text style={styles.factorItemRightTextView}>زمان</Text>
                        <Text style={styles.factorItemLeftTextView}>
                          {fac.time}
                        </Text>
                      </View>
                      {fac.factors.map(factorObj => (
                        <>
                          <View
                            style={{
                              ...styles.factorItemView,
                              backgroundColor: 'green',
                            }}>
                            <Text style={styles.factorItemRightTextView}>
                              نام کالا
                            </Text>
                            <Text style={styles.factorItemLeftTextView}>
                              {factorObj.kalanam.length > 30
                                ? factorObj.kalanam.substring(0, 32) + '...'
                                : factorObj.kalanam}
                            </Text>
                          </View>

                          <View style={styles.factorItemView}>
                            <Text style={styles.factorItemRightTextView}>
                              کد کالا
                            </Text>
                            <Text style={styles.factorItemLeftTextView}>
                              {factorObj.codekala}
                            </Text>
                          </View>

                          <View style={styles.factorItemView}>
                            <Text style={styles.factorItemRightTextView}>
                              تعداد
                            </Text>
                            <Text style={styles.factorItemLeftTextView}>
                              {factorObj.numb} عدد
                            </Text>
                          </View>
                          <View style={styles.factorItemView}>
                            <Text style={styles.factorItemRightTextView}>
                              قیمت
                            </Text>
                            <Text style={styles.factorItemLeftTextView}>
                              {factorObj.price}
                            </Text>
                          </View>
                          <View style={styles.factorItemView}>
                            <Text style={styles.factorItemRightTextView}>
                              تخفیف
                            </Text>
                            <Text style={styles.factorItemLeftTextView}>
                              {factorObj.ptk}
                            </Text>
                          </View>
                        </>
                      ))}
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
