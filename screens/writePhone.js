import {React, useState} from 'react';
// @ts-ignore
import type {PropsWithChildren} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import SVGatorComponent from '../initialLogo';
import {Countries} from '../Countries';
export function writePhone({navigation}) {
  const defaultCodeCountry = '34';
  const defaultFlag = '🇪🇸';
  const [phoneNumber, setPhonenumber] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [countryFlag, setCountryFlag] = useState(defaultFlag);
  const onShowHiddenModal = () => {
    setModalVisible(!modalVisible);
  };
  const onChangePhone = number => {
    setPhonenumber(number);
  };
  const filterCountries = value => {
    if (value) {
      const countryData = dataCountries.filter(
        obj =>
          obj.name.indexOf(value) > -1 || obj.phoneCode.indexOf(value) > -1,
      );
      setDataCountries(countryData);
    } else {
      setDataCountries(Countries);
    }
  };
  const onCountryChange = item => {
    setCountryFlag(item.flag);
    onShowHiddenModal();
  };
  let renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{marginTop: 200, justifyContent: 'flex-end'}}>
        <SafeAreaView
          style={{
            width: '100%',
            height: '40%',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            marginTop: '90%',
            backgroundColor: '#f1f1f1',
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.filterinputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder={'Filter'}
                focusable={true}
                style={styles.filterInputStyle}
              />
              <TouchableOpacity
                onPress={onShowHiddenModal}
                style={styles.closeButtonStyle}>
                <Text style={styles.closeTextStyle}>{'DONE'}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              style={{width: '100%'}}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={styles.countryModalStyle}>
                    <View style={styles.modalItemContainer}>
                      <Text style={styles.modalItemName}>{item.flag}</Text>
                      <Text style={styles.modalItemCountry}>{item.name}</Text>
                      <Text style={styles.modalItemDialCode}>
                        {'+' + item.phoneCode}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
      }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoiddingView}>
        <View style={styles.mainText}>
          <Text style={styles.textTitle}> Enter your phone number.</Text>
          <Text style={styles.textInfo}>
            It's going to be used in the future to offer the web platform of
            Basical.
          </Text>
        </View>
        <View style={[styles.containerInput, {}]}>
          <TouchableOpacity onPress={onShowHiddenModal}>
            <View style={styles.openDialogView}>
              <Text style={{color: 'black', fontSize: 30}}>{countryFlag}</Text>
            </View>
          </TouchableOpacity>
          {renderModal()}
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={onChangePhone}
            secureTextEntry={false}
          />
        </View>
      </KeyboardAvoidingView>
      <View style = {{width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: '10%'}}>
        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={() => {
            if (phoneNumber != null) {
              navigation.navigate("WNAME");
            }else{
              console.log("user didn't input phoneNumber");
            }
          }
          }>
            <View
              style={[
                styles.btnContinue,
                {
                  backgroundColor: phoneNumber ? '#474747' : '#E7E7E7',
                },
              ]}>
              <Text
                style={{
                  color: phoneNumber ? 'white' : '#7E7E7E',
                  alignItems: 'center',
                }}>
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainText: {
    backgroundColor: 'transparent',
    height: 110,
    width: 360,
    marginTop: 15,
  },
  containerAvoiddingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#474747',
    alignSelf: 'flex-start',
    textAlign: 'justify',
    marginLeft: -4,
    fontFamily: 'OldSansBlack',
  },
  textInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#696969',
    textAlign: 'justify',
    marginTop: 10,
    lineHeight: 22,
    alignSelf: 'flex-start',
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#E7E7E7',
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E7E7E7',
    borderRadius: 10,
    borderWidth: 2,
    width: 70,
    height: 60,
    backgroundColor: 'transparent',
  },
  phoneInput: {
    marginLeft: 5,
    flex: 1,
    height: 60,
    borderColor: '#E7E7E7',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#696969',
    letterSpacing: 1,
  },
  passInput: {
    marginRight: 10,
    height: 40,
    borderColor: '#E7E7E7',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginTop: 30,
    width: '72%',
    alignSelf: 'flex-end',
  },
  viewBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnContinue: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 140,
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    height: 50,
  },
  filterInputStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#424242',
    flex: 1,
  },
  countryModalStyle: {
    flex: 1,
    borderColor: '#696969',
    borderTopWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalItemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  modalItemName: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  modalItemDialCode: {
    fontSize: 16,
    color: 'black',
  },
  modalItemCountry: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    margin: 5,
    marginRight: 90,
    marginLeft: -30,
  },
  filterinputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: '#474747',
    fontWeight: 'bold',
  },
});
