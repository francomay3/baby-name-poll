import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, update, onValue, ref as dbRef } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBp4zb6io9lAV4YV0ldgwLeqTujI1FD3sU",
  authDomain: "baby-name-b05b6.firebaseapp.com",
  databaseURL: "https://baby-name-b05b6-default-rtdb.firebaseio.com",
  projectId: "baby-name-b05b6",
  storageBucket: "baby-name-b05b6.appspot.com",
  messagingSenderId: "467117883322",
  appId: "1:467117883322:web:4340bdab8cb755a3bb6783",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export type Scores = {
  [nombre: string]: number;
};

export type User = {
  color: string;
  ratings?: Scores;
};

export type Vote = {
  value: number;
};

export type Name = {
  votes: { [userId: string]: Vote };
  elo?: number;
};

export type Users = { [userId: string]: User };

export type Names = { [nameId: string]: Name };

export type Data = {
  users: Users;
  names: Names;
} | null;

export type SetNewValue = (
  userId: string,
  nameId: string,
  value: number
) => void;

export type SetNewName = (nameId: string) => void;

export type SetNewUser = (userId: string, color: string) => void;

export type SetNewRatings = (
  userId: string,
  newElo: { [nameId: string]: number }
) => void;

const useDatabase = () => {
  const [data, setData] = useState<Data>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    const ref = dbRef(db);

    const unsubscribe = onValue(
      ref,
      (snapshot) => {
        setData(snapshot.val());
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const syncNewUser = (userId: string, newUser: User) => {
    setIsSyncing(true);
    const userRef = dbRef(db, `users/${userId}`);
    update(userRef, newUser)
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .then(() => setIsSyncing(false));
  };

  const setNewUser = (userId: string, color: string) => {
    if (!userId || !data) return;

    const newUser = { color };

    const newData = structuredClone(data);
    newData.users[userId] = newUser;
    setData(newData);
    syncNewUser(userId, newUser);
  };

  const syncNewValue = (userId: string, nameId: string, newValue: number) => {
    setIsSyncing(true);
    const valueRef = dbRef(db, `names/${nameId}/votes/${userId}`);
    update(valueRef, { value: newValue })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .then(() => setIsSyncing(false));
  };

  const setNewRatings: SetNewRatings = (userId, newElo) => {
    setIsSyncing(true);
    const userRef = dbRef(db, `users/${userId}/ratings`);
    update(userRef, newElo)
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .then(() => setIsSyncing(false));
  };

  const setNewValue: SetNewValue = (userId, nameId, value) => {
    if (!userId || !nameId || !data || !value) return;

    const newData = structuredClone(data);

    if (!newData) {
      return;
    }

    const newValue = { value };
    newData.names[nameId].votes[userId] = newValue;
    setData(newData);
    syncNewValue(userId, nameId, value);
  };

  const syncNewName = (nameId: string, newName: Name) => {
    setIsSyncing(true);
    const nameRef = dbRef(db, `names/${nameId}`);
    update(nameRef, newName)
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .then(() => setIsSyncing(false));
  };

  const setNewName = (nameId: string) => {
    if ((!nameId || !data || data.names[nameId], loading || error)) return;

    const newData = structuredClone(data);

    if (!newData) {
      return;
    }

    const newName = {
      votes: {
        none: { value: -1 },
      },
    };
    newData.names[nameId] = newName;

    setData(newData);
    syncNewName(nameId, newName);
  };

  return {
    data,
    error,
    isSyncing,
    loading,
    setNewName,
    setNewUser,
    setNewValue,
    setNewRatings,
  };
};

export default useDatabase;
