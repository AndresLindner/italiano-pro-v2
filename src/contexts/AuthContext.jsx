import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});
  const [userErrors, setUserErrors] = useState({});
  const [userFlashcards, setUserFlashcards] = useState({});

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  }

  function logout() {
    return signOut(auth);
  }

  // Load user progress from Firestore
  async function loadUserProgress(uid) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProgress(data.progress || {});
        setUserErrors(data.errors || {});
        setUserFlashcards(data.flashcards || {});
      } else {
        // Initialize new user doc
        await setDoc(docRef, { progress: {}, errors: {}, flashcards: {} }, { merge: true });
        setUserProgress({});
        setUserErrors({});
        setUserFlashcards({});
      }
    } catch (error) {
      console.error("Error loading progress", error);
    }
  }

  // Save specific module progress to Firestore
  async function saveProgress(moduleId, newProgress) {
    if (!currentUser) return;
    
    const updatedProgress = {
      ...userProgress,
      [moduleId]: {
        ...(userProgress[moduleId] || {}),
        ...newProgress
      }
    };
    
    setUserProgress(updatedProgress);
    
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { progress: updatedProgress }, { merge: true });
    } catch (error) {
      console.error("Error saving progress", error);
    }
  }

  // Log an error to Firestore
  async function logError(exercise, moduleName) {
    if (!currentUser) return;

    const updatedErrors = {
      ...userErrors,
      [exercise.id]: {
        ...exercise,
        moduleName,
        timestamp: Date.now()
      }
    };

    setUserErrors(updatedErrors);

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { errors: updatedErrors }, { merge: true });
    } catch (error) {
      console.error("Error saving error", error);
    }
  }

  // Resolve an error (remove it from Firestore)
  async function resolveError(exerciseId) {
    if (!currentUser || !userErrors[exerciseId]) return;

    const updatedErrors = { ...userErrors };
    delete updatedErrors[exerciseId];

    setUserErrors(updatedErrors);

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { errors: updatedErrors }, { merge: true });
    } catch (error) {
      console.error("Error resolving error", error);
    }
  }

  // Save SRS flashcard data
  async function saveFlashcardProgress(wordId, srsData) {
    if (!currentUser) return;
    
    const updatedFlashcards = {
      ...userFlashcards,
      [wordId]: {
        ...srsData,
        lastReviewed: Date.now()
      }
    };
    
    setUserFlashcards(updatedFlashcards);
    
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { flashcards: updatedFlashcards }, { merge: true });
    } catch (error) {
      console.error("Error saving flashcard progress", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProgress(user.uid);
      } else {
        setUserProgress({});
        setUserErrors({});
        setUserFlashcards({});
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    logout,
    userProgress,
    saveProgress,
    userErrors,
    logError,
    resolveError,
    userFlashcards,
    saveFlashcardProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
