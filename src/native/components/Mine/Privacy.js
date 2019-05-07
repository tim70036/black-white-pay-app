import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView  } from 'react-native';

import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from '../../lib/util';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundBlack,
  },

  textContainer: {
    marginHorizontal: viewportWidthPercent(6),
    marginVertical: viewportHeightPercent(2),
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 30,
  },

  text: {
    fontSize: 12,
    color: 'white',
    lineHeight: 30,
  }
  
});

class Privacy extends Component {
  static propTypes = {
  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.textContainer}>
          <Text style={styles.title}>關於個人資料保護，請參閱以下「黑白Pay」的隱私權聲明：</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
            歡迎光臨「黑白Pay」（以下簡稱本公司）所經營；為了支持個人資料保護，維護個人隱私權，
            本公司謹以下列聲明，向您說明本公司蒐集個人資料之目的、類別、利用範圍及方式、以及您所得行使之權利等事項；
          </Text>
          <Text style={styles.text}>
            如果您對於本公司的隱私權聲明、以下相關告知事項、或與個人資料保護有關之相關事項有任何疑問，
            可以和本公司客服中心聯絡，本公司將儘快回覆說明。
          </Text>
          <View style={{ height: 15 }}></View>
        
          <Text style={styles.title}>適用範圍</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
            本公司隱私權聲明及其所包含之告知事項，僅適用於「黑白Pay」及其相關服務，包括「黑白Pay」軟體與網站。
            「黑白Pay」軟體及網站內可能包含許多連結、或其他合作夥伴所提供的服務，
            關於該等連結網站或合作夥伴網站的隱私權聲明及與個人資料保護有關之告知事項，
            請參閱各該連結網站或合作夥伴網站。
          </Text>
          <View style={{ height: 15 }}></View>

          <Text style={styles.title}>個人資料蒐集之目的與類別</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
            本公司為了行銷、客戶管理與服務、履行法定或合約義務、保護當事人及相關利害關係人之權益、
            以及經營合於營業登記項目或組織章程所定之業務等目的，依照各該服務之性質，可能蒐集您的姓名、
            身份證字號、連絡方式(包括但不限於電話號碼、E-MAIL及地址等)、ＩＰ位址、手機識別碼、
            及其他得以直接或間接識別使用者身分之個人資料。
          </Text>
          <View style={{ height: 15 }}></View>

          <Text style={styles.title}>個人資料的利用</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
            本公司所蒐集的足以識別使用者身分的個人資料，都僅供本公司於其內部、
            依照蒐集之目的進行處理和利用，除非事先說明、或為完成提供服務或履行合約義務之必要、
            或依照相關法令規定或有權主管機關之命令或要求，否則本公司不會將足以識別使用者身分的個人資料提供給第三人
            （包括境內及境外）、或移作蒐集目的以外之使用。
            在合約有效期間內，以及法令所定應保存之期間內，本公司會持續保管、處理及利用相關資料。
          </Text>
          <View style={{ height: 15 }}></View>

          <Text style={styles.title}>資料安全</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
            本公司主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，
            加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，
            相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。
            如因業務需要有必要委託其他單位提供服務時，本公司亦會嚴格要求其遵守保密義務，
            並且採取必要檢查程序以確定其將確實遵守。
          </Text>
          <View style={{ height: 15 }}></View>

          <Text style={styles.title}>與第三人共用個人資料之政策</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
            本公司絕不會提供、交換、出租或出售任何您的個人資料給其他個人、
            團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
            前項但書之情形包括不限於：
          </Text>
          <View style={{ height: 15 }}></View>

          <Text style={styles.title}>修訂之權利</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
              本公司有權隨時修訂本隱私權聲明及相關告知事項，
              並得於修訂後公佈在本APP上之適當位置，不另行個別通知，
              您可以隨時在本APP上詳閱修訂後的隱私權聲明及相關告知事項。{'\n'}
                •	經由您書面同意。{'\n'}
                •	法律明文規定。{'\n'}
                •	為免除您生命、身體、自由或財產上之危險。{'\n'}
                •	與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。{'\n'}
                •	當您在App裡的行為，違反服務條款或可能損害或妨礙App與其他使用者權益或導致任何人遭受損害時，經App管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。{'\n'}
                •	有利於您的權益。
          </Text>
          <View style={{ height: 15 }}></View>


        </ScrollView>
      </View>
    );
  }
}

export default Privacy;
