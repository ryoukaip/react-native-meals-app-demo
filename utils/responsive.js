// responsive.js
import { Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define a base width (or height if you prefer) for scaling
const baseWidth = 375;  // Base width for iPhone 11, for example
const baseFontSize = 16;  // Base font size for rem scaling

// Scale function for elements based on width
export const scale = (size) => (width / baseWidth) * size;

// REM function for scaling font size
export const rem = (value) => value * baseFontSize;
