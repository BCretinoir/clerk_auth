
import { SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import {SignOutButton} from '../../components/sign-out-button';

export default function Page() {
  const { user } = useUser()

  const { session } = useSession()
  console.log(session?.currentTask)

  return (
    <View style={styles.container}>
      <Text >Welcome!</Text>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Se connecter</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>S'inscrire</Text>
        </Link>
      </SignedOut>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
})