// --- Firebase basic email/password auth + Firestore user profile storage ---
// HOW TO USE:
// 1) In your HTML, change the script tag to: <script type="module" src="main.js"></script>
// 2) Add the following IDs to your inputs/buttons:
//    Sign Up form:
//      id="signup-username", id="signup-email", id="signup-password", id="signup-cpassword", id="btnSignup"
//    Sign In form:
//      id="signin-email", id="signin-password", id="btnSignin"
// 3) Put your Firebase project config below (from Firebase Console > Project settings > General > Your apps)
// 4) In Firebase Console: enable Authentication (Email/Password) and create a Firestore database (test mode is fine for dev).

// --- 0) Firebase SDK imports (browser ESM) ---
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// --- 1) Your Firebase config (REPLACE with your own) ---
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoNJL-RDG_XrmZ-s_mwZCtY-vjaHkucSw",
  authDomain: "login-signup-443fe.firebaseapp.com",
  projectId: "login-signup-443fe",
storageBucket: "login-signup-443fe.appspot.com",
  messagingSenderId: "1062415380330",
  appId: "1:1062415380330:web:02596c95296aeb713a7f13",
  measurementId: "G-VEEMBQW7W6"
};

// --- 2) Init Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- 3) Helpers ---
const $ = (sel) => document.querySelector(sel);
const byId = (id) => document.getElementById(id);

function showMessage(msg) {
  // replace with your own toast UI if you like
  alert(msg);
}

function validateEmail(email) {
  return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
}

// --- 4) Sign Up ---
async function handleSignup() {
  const username = byId('signup-username')?.value?.trim();
  const email = byId('signup-email')?.value?.trim();
  const password = byId('signup-password')?.value || '';
  const cpassword = byId('signup-cpassword')?.value || '';

  if (!username) return showMessage('Please enter a username.');
  if (!email || !validateEmail(email)) return showMessage('Please enter a valid email.');
  if (!password || password.length < 6) return showMessage('Password must be at least 6 characters.');
  if (password !== cpassword) return showMessage('Passwords do not match.');

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Set displayName on the Auth user
    await updateProfile(cred.user, { displayName: username });

    // Create a user document in Firestore
    const userRef = doc(db, 'users', cred.user.uid);
    await setDoc(userRef, {
      uid: cred.user.uid,
      username,
      email,
      createdAt: serverTimestamp(),
    });

    showMessage('Sign up successful! You can now sign in.');
    // Optional: switch view to the Sign In panel
    window.location.hash = '#signin';
  } catch (err) {
    console.error(err);
    const code = err?.code || '';
    if (code === 'auth/email-already-in-use') showMessage('Email already in use. Try signing in.');
    else if (code === 'auth/invalid-email') showMessage('Invalid email address.');
    else if (code === 'auth/weak-password') showMessage('Weak password (min 6 chars).');
    else showMessage('Sign up failed. ' + (err?.message || ''));
  }
}

// --- 5) Sign In ---
async function handleSignin() {
  const email = byId('signin-email')?.value?.trim();
  const password = byId('signin-password')?.value || '';

  if (!email || !validateEmail(email)) return showMessage('Please enter a valid email.');
  if (!password) return showMessage('Please enter your password.');

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // (Optional) read profile from Firestore
    const snap = await getDoc(doc(db, 'users', cred.user.uid));
    const profile = snap.exists() ? snap.data() : null;

    showMessage(`Welcome ${cred.user.displayName || profile?.username || 'back'}!`);

    // TODO: navigate to your app's page, or update UI state
    // window.location.href = '/dashboard.html';
  } catch (err) {
    console.error(err);
    const code = err?.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') showMessage('Incorrect email or password.');
    else if (code === 'auth/user-not-found') showMessage('No account found with this email.');
    else if (code === 'auth/too-many-requests') showMessage('Too many attempts. Try again later.');
    else showMessage('Sign in failed. ' + (err?.message || ''));
  }
}

// --- 6) Auth state (optional real-time listener) ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Signed in as:', user.uid, user.email);
  } else {
    console.log('Signed out');
  }
});

// --- 7) Wire up UI ---
window.addEventListener('DOMContentLoaded', () => {
  const btnSignup = byId('btnSignup') || document.querySelector('#signup .Signup');
  const btnSignin = byId('btnSignin') || document.querySelector('#signin .Signup');

  if (btnSignup) btnSignup.addEventListener('click', (e) => { e.preventDefault(); handleSignup(); });
  if (btnSignin) btnSignin.addEventListener('click', (e) => { e.preventDefault(); handleSignin(); });
});

// --- 8) (Optional) Sign out example ---
// Call signOut(auth) when you need to log the user out.
// Example: document.getElementById('btnSignout').addEventListener('click', () => signOut(auth));
