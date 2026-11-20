import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts');

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token strictly in memory (never localStorage/sessionStorage).
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess?.(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        onAuthFailure?.();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure?.();
    }
  });
};

export const googleSignIn = async (): Promise<{
  user: User;
  accessToken: string;
} | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Contacts access token.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Sign-In error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export interface GoogleContactPerson {
  resourceName: string;
  displayName: string;
  email?: string;
  organization?: string;
  photoUrl?: string;
}

export async function fetchGoogleContacts(
  accessToken: string
): Promise<GoogleContactPerson[]> {
  const response = await fetch(
    'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,organizations,photos&pageSize=12&sortOrder=FIRST_NAME_ASCENDING',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Unable to fetch Google Contacts (${response.status}): ${errText}`);
  }

  const data = (await response.json()) as {
    connections?: Array<{
      resourceName: string;
      names?: Array<{ displayName?: string }>;
      emailAddresses?: Array<{ value?: string }>;
      organizations?: Array<{ name?: string; title?: string }>;
      photos?: Array<{ url?: string }>;
    }>;
  };

  return (data.connections ?? []).map((person) => ({
    resourceName: person.resourceName,
    displayName:
      person.names?.[0]?.displayName ||
      person.emailAddresses?.[0]?.value ||
      'Unnamed Contact',
    email: person.emailAddresses?.[0]?.value,
    organization: person.organizations?.[0]?.name || person.organizations?.[0]?.title,
    photoUrl: person.photos?.[0]?.url,
  }));
}

export async function saveHarshPatilToGoogleContacts(
  accessToken: string
): Promise<{ resourceName: string; displayName: string }> {
  const response = await fetch(
    'https://people.googleapis.com/v1/people:createContact',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        names: [
          {
            givenName: 'Harsh',
            middleName: 'Pramod',
            familyName: 'Patil',
          },
        ],
        emailAddresses: [
          {
            value: 'harshpatil5787@gmail.com',
            type: 'work',
          },
        ],
        organizations: [
          {
            name: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
            title: 'Engineering Student · AI, Full-Stack & IIoT',
          },
        ],
        biographies: [
          {
            value:
              'Portfolio contact saved from Harsh Patil Engineering & AI Portfolio. Skills: C++, Python, React, JavaScript, Generative AI, BFSI AI, IIoT.',
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to save contact (${response.status}): ${errText}`);
  }

  const created = (await response.json()) as {
    resourceName: string;
    names?: Array<{ displayName?: string }>;
  };

  return {
    resourceName: created.resourceName,
    displayName: created.names?.[0]?.displayName || 'Harsh Pramod Patil',
  };
}
