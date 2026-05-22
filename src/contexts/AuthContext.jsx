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
    if (!auth || !googleProvider) {
      alert("La connessione a Firebase non è configurata. Stai usando la modalità Ospite offline.");
      return null;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  }

  function logout() {
    if (!auth) return Promise.resolve();
    return signOut(auth);
  }

  // Load user progress from Firestore or LocalStorage
  async function loadUserProgress(uid) {
    if (!uid || !db) {
      try {
        const guestProgress = localStorage.getItem('italiano_pro_guest_progress');
        const guestErrors = localStorage.getItem('italiano_pro_guest_errors');
        const guestFlashcards = localStorage.getItem('italiano_pro_guest_flashcards');
        
        setUserProgress(guestProgress ? JSON.parse(guestProgress) : {});
        setUserErrors(guestErrors ? JSON.parse(guestErrors) : {});
        setUserFlashcards(guestFlashcards ? JSON.parse(guestFlashcards) : {});
      } catch (error) {
        console.error("Error loading guest progress", error);
      }
      return;
    }

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

  // Save specific module progress to Firestore or LocalStorage
  async function saveProgress(moduleId, newProgress) {
    const updatedProgress = {
      ...userProgress,
      [moduleId]: {
        ...(userProgress[moduleId] || {}),
        ...newProgress
      }
    };
    
    setUserProgress(updatedProgress);
    
    if (!currentUser || !db) {
      localStorage.setItem('italiano_pro_guest_progress', JSON.stringify(updatedProgress));
      return;
    }
    
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { progress: updatedProgress }, { merge: true });
    } catch (error) {
      console.error("Error saving progress", error);
    }
  }

  // Log an error to Firestore or LocalStorage
  async function logError(exercise, moduleName) {
    const updatedErrors = {
      ...userErrors,
      [exercise.id]: {
        ...exercise,
        moduleName,
        timestamp: Date.now()
      }
    };

    setUserErrors(updatedErrors);

    if (!currentUser || !db) {
      localStorage.setItem('italiano_pro_guest_errors', JSON.stringify(updatedErrors));
      return;
    }

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { errors: updatedErrors }, { merge: true });
    } catch (error) {
      console.error("Error saving error", error);
    }
  }

  // Resolve an error (remove it from Firestore or LocalStorage)
  async function resolveError(exerciseId) {
    if (!userErrors[exerciseId]) return;

    const updatedErrors = { ...userErrors };
    delete updatedErrors[exerciseId];

    setUserErrors(updatedErrors);

    // Save and increment the errorsResolved count in userProgress
    const currentResolved = (userProgress.stats?.errorsResolved || 0) + 1;
    const updatedProgress = {
      ...userProgress,
      stats: {
        ...(userProgress.stats || {}),
        errorsResolved: currentResolved
      }
    };
    setUserProgress(updatedProgress);

    if (!currentUser || !db) {
      localStorage.setItem('italiano_pro_guest_errors', JSON.stringify(updatedErrors));
      localStorage.setItem('italiano_pro_guest_progress', JSON.stringify(updatedProgress));
      return;
    }

    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { 
        errors: updatedErrors,
        progress: updatedProgress
      }, { merge: true });
    } catch (error) {
      console.error("Error resolving error", error);
    }
  }

  // Save SRS flashcard data
  async function saveFlashcardProgress(wordId, srsData) {
    const updatedFlashcards = {
      ...userFlashcards,
      [wordId]: {
        ...srsData,
        lastReviewed: Date.now()
      }
    };
    
    setUserFlashcards(updatedFlashcards);
    
    if (!currentUser || !db) {
      localStorage.setItem('italiano_pro_guest_flashcards', JSON.stringify(updatedFlashcards));
      return;
    }
    
    try {
      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(docRef, { flashcards: updatedFlashcards }, { merge: true });
    } catch (error) {
      console.error("Error saving flashcard progress", error);
    }
  }

  useEffect(() => {
    if (!auth) {
      // Offline/No-Firebase fallback
      setCurrentUser(null);
      loadUserProgress(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProgress(user.uid);
      } else {
        await loadUserProgress(null);
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
