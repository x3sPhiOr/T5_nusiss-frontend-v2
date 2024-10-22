import { useState } from 'react';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { Input } from '@/components/Input';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/context/AuthContext';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { globals } from '@/styles/_global';
import { StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';

export default function Login() {
  const { isLoggedIn, authenticate, isLoadingAuth } = useAuth();
  function onAuthenticate() {
    console.log("test");
    // isLoggedIn === false;
    authenticate();
    console.log(isLoggedIn+' 1');
  }

  // const [authMode, setAuthMode] = useState<"login" | "register">('login');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // ---Check Login Boolean Value---
  // const handlePress = () => {
  //   console.log(isLoggedIn+' check');
  // };

  // function onToggleAuthMode() {
  //   setAuthMode(authMode === 'login' ? 'register' : 'login');
  // }


  return (
    <KeyboardAvoidingView behavior="padding" style={globals.container}>
      <ScrollView contentContainerStyle={globals.container}>
        <VStack flex={1} justifyContent='center' alignItems='center' p={40} gap={40}>

          <HStack gap={10}>
            <Text fontSize={30} bold mb={20}>Buffet Restaraunt Booking App</Text>
            <TabBarIcon name="restaurant" size={35} />
          </HStack >

          <VStack w={"100%"} gap={30}>

            {/* <VStack gap={ 5 }>
              <Text ml={ 10 } fontSize={ 14 } color="gray">Email</Text>
              <Input
                value={ email }
                onChangeText={ setEmail }
                placeholder="Email"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={ false }
                h={ 48 }
                p={ 14 }
              />
            </VStack>

            <VStack gap={ 5 }>
              <Text ml={ 10 } fontSize={ 14 } color="gray">Password</Text>
              <Input
                value={ password }
                onChangeText={ setPassword }
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={ false }
                h={ 48 }
                p={ 14 }
              />
            </VStack> */}
            <Button
              isLoading={isLoadingAuth}
              onPress={onAuthenticate}
              // onPress={handlePress}
            >
              <TabBarIcon name="logo-google" size={19} style={styles.icon} />
              Sign in with Google
            </Button>

            {/* <Button onPress={handlePress}>check login</Button> */}
            {/* <Button isLoading={ isLoadingAuth } onPress={ onAuthenticate }>{ authMode }</Button> */}

            {/* <Divider w={"90%"} />
            <VStack flex={1} justifyContent='center' alignItems='center' >
              <Text fontSize={16} underline>
                {authMode === 'login' ? 'Register new account' : 'Sign in with Google'}
              </Text>
            </VStack> */}
            
          </VStack>

        </VStack>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285F4', // Google blue color
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10, // Add space between the icon and text
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});