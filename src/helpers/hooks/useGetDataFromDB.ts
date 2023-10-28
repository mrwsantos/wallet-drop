import React, { useCallback, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./../../services/FirebaseConfig";

const db = getFirestore(app);

const useGetDataFromDB = (collectionName: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const docRef = collection(db, collectionName);

  const request = useCallback(async () => {
    let response;

    try {
      setLoading(true);
      const getData = await getDocs(docRef);
      response = getData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(response);
      return { response };
    } catch (e: any) {
      setError(e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};

export default useGetDataFromDB;
