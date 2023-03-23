import React from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./../../services/FirebaseConfig";

const db = getFirestore(app);

const useGetDataFromDB = (collectionName: string) => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const docRef = collection(db, collectionName);

  const request = React.useCallback(async () => {
    let response;

    try {
      setLoading(true);
      const getData = await getDocs(docRef);
      response = getData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    } catch (e: any) {
      setError(e);
      setLoading(false);
    } finally {
      setData(response);
      setLoading(false);
      return { response };
    }
  }, []);

  return { data, error, loading, request };
};

export default useGetDataFromDB;
