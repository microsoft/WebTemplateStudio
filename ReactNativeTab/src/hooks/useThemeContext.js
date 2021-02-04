import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeProvider';

export default function useThemeContext() {
  return useContext(ThemeContext);
}
