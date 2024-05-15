import { onMounted, onUnmounted, ref } from 'vue';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  type Unsubscribe
} from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import type { FirebaseError } from "firebase/app";
import { useRoute, useRouter } from 'vue-router';
import reporter from '@/utils/reporter';

/**
 * 
 * hooks to handle login logic
 * can be extended to takin in config arguments 
 * @params
 */
export const useSignInEmailPassword = () => {
  const route = useRoute();
  const router = useRouter();
  const auth = useFirebaseAuth()!;

  async function onLogin(values: {
    email: string, password: string
  }) {
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      // redirect to the previous route user was tryig to access if it exist or just go to the homepage
      router.push(route.query.redirect as string || '/');
    } catch (error) {
      reporter(error);
    }
  }

  return {
    onLogin
  };
};
/**
 * 
 * hooks to handle signup logic
 * todo we add add config params @params
 * like redirect after signup, 
 */
export const useSignUpEmailPassword = () => {
  const router = useRouter();
  const auth = useFirebaseAuth()!;

  async function onSignUp(values: {
    email: string,
    password: string
  }) {
    try {
      const { email, password } = values;
      const result = await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
      return result;
    } catch (error) {
      reporter(error);
    }
  }

  return {
    onSignUp
  };
};


export const useSignOut = () => {
  const isLoggedIn = ref(false);
  const unsubscribe = ref<Unsubscribe>();
  const auth = useFirebaseAuth()!;
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    unsubscribe.value = onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = !!user;
    });
  });

  onUnmounted(() => {
    if (unsubscribe.value) {
      unsubscribe.value();
    }
  });

  async function onSignout() {
    try {
      await signOut(auth);

      router.push({
        path: '/login',
        query: {
          redirect: route.fullPath,
        },
      });
    } catch (error) {
      reporter(error);
    }
  }
  return {
    isLoggedIn,
    onSignout
  };
};


/**
 * Provides custom logic to authenticate using specified strategy.
 * @param strategy The authentication strategy ('google' or 'github').
 * @returns An object containing loading state and authentication function.
 */
export const useProviderAuth = (strategy: 'google' | 'github' = 'github') => {
  const loading = ref(false);
  const route = useRoute();
  const router = useRouter();
  const auth = useFirebaseAuth()!;
  const providers = {
    google: GoogleAuthProvider,
    github: GithubAuthProvider
  };
  const provider = new providers[strategy];

  async function onAuthApp() {
    loading.value = true;
    try {
      await signInWithPopup(auth, provider);
      router.push(route.query.redirect as string || '/');
      loading.value = false;
    } catch (error) {
      loading.value = false;
      reporter(error);
    }
  }

  return {
    loading,
    onAuthApp
  };
};

export const useUpdateProfile = () => {
  const loading = ref(false);

  const auth = useFirebaseAuth()!;
  async function onUpdateProfile(displayName: string) {
    if (!auth.currentUser) return;
    loading.value = true;
    try {
      await updateProfile(auth.currentUser, { displayName });
      loading.value = false;
    } catch (error) {
      loading.value = false;
      reporter(error);
    }

  }
  return {
    loading,
    onUpdateProfile
  };
};

export const useForgotPassword = () => {
  const router = useRouter();
  const loading = ref(false);

  const auth = useFirebaseAuth()!;

  async function onRequestPassword(email: string) {
    loading.value = true;
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `http://localhost:5173/login/?email=${email}`,
        handleCodeInApp: true
      });
      loading.value = false;
      router.replace({
        name: 'login',
        query: {
          email,
        }
      });
    } catch (error) {
      loading.value = false;
      reporter(error);
    }

  }

  return {
    loading,
    onRequestPassword,
  };
};


