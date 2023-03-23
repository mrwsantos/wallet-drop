import {firebase} from "./../src/services/FirebaseConfig";
import { myWalletCurrencies } from "./db";

export function importJokes() {
  var batch: any = firebase.firestore().batch();
  var piadas: any[] = [];

  myWalletCurrencies.map(({currencies }, index) => {
    let doc = {
     currencies
    };

    piadas.push(doc);
    let ref = firebase.firestore().collection("myWalletCurrencies").doc(String(index));
    batch.set(ref, doc);
  });

  batch.commit(() => {
    for (var i = 0; i < myWalletCurrencies.length; i++) {
      console.log("DADOS ENVIADOS");
    }
  });
}
