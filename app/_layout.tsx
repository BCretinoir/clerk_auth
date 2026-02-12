import {ClerkProvider} from '@clerk/clerk-expo';
import { Slot } from 'expo-router';
import { tokenCache  } from '@clerk/clerk-expo/token-cache';
import { initDatabase } from '../database/database';
import { useEffect } from 'react';
import 'react-native-get-random-values';

 const RootLayout = () => {
  
  useEffect(() => {
    initDatabase();
  }, []);
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider>)
}

export default RootLayout;