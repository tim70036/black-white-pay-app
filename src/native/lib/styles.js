import { StyleSheet } from 'react-native';
import {
  viewportWidthPercent,
  viewportHeightPercent,
} from './util';
import Colors from '../constants/colors';

const elementColors = {
  buttonLinearGradient: ['#FDDCA9', '#BB9E6E', '#83693C'],
};

const formStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: viewportWidthPercent(8),
  },
  title: {
    marginVertical: viewportHeightPercent(2),
  },
  titleText: {
    fontSize: 30,
    color: Colors.labelWhite,
  },
  inputItem: {
    marginTop: viewportHeightPercent(3),
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 23,
    color: Colors.labelWhite,
  },
  icon: {
    width: 20,
    height: 23,
    resizeMode: 'contain',
  },

  pickerIcon: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
  },
  inputText: {
    color: Colors.labelWhite,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorderGray,
    paddingVertical: viewportHeightPercent(1),
  },
  valText: {
    color: Colors.labelRed,
    fontSize: 12,
    paddingTop: 3,
    marginLeft: 3,
  },
  linearGradient: {
    marginTop: viewportHeightPercent(5),
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 58,
    borderRadius: 36.5,

    shadowColor: '#D3BD99',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.44,
    shadowRadius: 37,
    elevation: 14,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36.5,
  },
  buttonText: {
    color: Colors.labelWhite,
    fontSize: 20,
  },
});

export { elementColors, formStyle };
