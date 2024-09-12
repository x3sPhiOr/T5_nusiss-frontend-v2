import { Redirect, Stack } from 'expo-router';

import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn  = true;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={ { headerShown: false } } />;
}
