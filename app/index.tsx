import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { SignOutButton } from '../components/sign-out-button';
import { useEffect } from 'react';

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/(main)/home');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <SignedOut>
        <Text
          style={{ color: 'blue', marginTop: 20 }}
          onPress={() => router.push('/(auth)/sign-in')}
        >
          Se connecter
        </Text>
        <Text
          style={{ color: 'blue', marginTop: 10 }}
          onPress={() => router.push('/(auth)/sign-up')}
        >
          S'inscrire
        </Text>
      </SignedOut>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});
