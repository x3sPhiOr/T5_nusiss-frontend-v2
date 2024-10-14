import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react'; 
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSegments } from 'expo-router';

export default function AppLayout() {
  const { isLoggedIn } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  // ---Check Login Boolean Value---
  // console.log(isLoggedIn+' 0');
  // const isLoggedIn  = true;

  // Use effect to listen for changes in `isLoggedIn`
  // useEffect(() => {
  //   if (typeof isLoggedIn !== 'undefined') {
  //     console.log("test000");
  //     console.log(isLoggedIn);
  //     console.log(segments[0]);
  //     // Once `isLoggedIn` is set (either true or false), mark the auth check as complete
  //     // setIsAuthChecked(true);
  //     if (isLoggedIn && segments[0] === 'login') {
  //       router.replace('(authed)');
  //     }
  //   }
  // }, [isLoggedIn, segments]);  // Re-run when `isLoggedIn` changes

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={ { headerShown: false } } />;
}
