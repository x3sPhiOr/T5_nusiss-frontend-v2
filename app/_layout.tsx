import { Slot } from 'expo-router';
import { AuthenticationProvider } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

export default function Root() {
  return (
    <>
      <StatusBar style="dark" />
      <NativeBaseProvider>
        <AuthenticationProvider>
          <Slot />
        </AuthenticationProvider>
      </NativeBaseProvider>
    </>
  );
}
