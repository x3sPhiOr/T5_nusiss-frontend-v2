import { useAuth } from '@/context/AuthContext';
import { VStack } from '@/components/VStack';
import { Button } from '@/components/Button';

export default function SettingsScreen() {
  // return <></>;

  // ---Check Login Boolean Value---
  // const { isLoggedIn } = useAuth();
  // const handlePress = () => {
  //   console.log(isLoggedIn+' check');
  // };

  const { logout } = useAuth();

  return (
    <VStack flex={ 1 } m={ 20 }>
      <Button onPress={ logout }>Logout</Button>
      {/* ---Check Login Boolean Value--- */}
      {/* <Button onPress={handlePress}>check login</Button> */}
    </VStack>
  );
}
