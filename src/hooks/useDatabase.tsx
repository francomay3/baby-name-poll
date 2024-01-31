import { useState, useEffect } from "react";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { onValue, set, ref as dbRef } from "firebase/database";
import { debounce } from "lodash";

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

export type User = {
  color: string;
};

export type Vote = {
  value: number;
};

export type Name = {
  votes: { [userId: string]: Vote };
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

  const syncData = debounce(async (newData: Data) => {
    const ref = dbRef(db);
    try {
      setIsSyncing(true);
      await set(ref, newData);
      setIsSyncing(false);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const setDataHandler = async (newData: Data) => {
    if (loading || error) return;
    setData(newData);
    await syncData(newData);
  };

  const setNewValue: SetNewValue = (userId, nameId, value) => {
    if (!data) return;
    const newData = structuredClone(data);
    newData.names[nameId].votes[userId] = { value };
    setDataHandler(newData);
  };

  const setNewUser = (userId: string, color: string) => {
    if (!data) return;
    const newData = structuredClone(data);
    newData.users[userId] = { color };
    setDataHandler(newData);
  };

  const setNewName = (nameId: string) => {
    if (!nameId || !data || data.names[nameId]) return;
    const newData = structuredClone(data);
    newData.names[nameId] = {
      votes: {
        none: { value: -1 },
      },
    };
    setDataHandler(newData);
  };

  return {
    data,
    error,
    isSyncing,
    loading,
    setNewName,
    setNewUser,
    setNewValue,
  };
};

export default useDatabase;
