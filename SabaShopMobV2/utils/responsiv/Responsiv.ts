import {Dimensions} from 'react-native';
const mainHeight = Dimensions.get('window').height;

function ResCalculator(
  lessThanEqual: number,
  ifTrue: number,
  ifFalse: number,
): number {
  if (mainHeight <= lessThanEqual) return ifTrue;
  else return ifFalse;
}

export default ResCalculator;
