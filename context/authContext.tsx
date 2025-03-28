import { auth, firestore } from "@/config/firebase";
import { UserType } from "@/utils/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: UserType;
  setUser: Function;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; msg?: string }>;
  updateUserData: (userId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        });
        updateUserData(user.uid);

        router.replace("/(tabs)");
      } else {
        setUser(null);
        router.replace("/login_screen");
      }
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-credential)"))
        msg = "Invalid credentials!";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email!";
      return { success: false, msg };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(firestore, "users", res.user.uid), {
        name: username,
        email,
        uid: res.user.uid,
      });

      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email already in use!";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email!";
      return { success: false, msg };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        const userData: UserType = {
          uid: data?.uid,
          email: data.email || null,
          username: data.name || null,
          image: data.image || null,
        };

        setUser({ ...userData });
      }
    } catch (error: any) {
      console.error(
        "Error in updateUserData on authContext file",
        error.message
      );
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be wrapped inside AuthProvider");
  }

  return context;
};
