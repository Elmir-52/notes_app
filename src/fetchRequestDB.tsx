import { get, remove, set, type DatabaseReference, type Query } from "firebase/database";

export async function getDb<T>(ref: DatabaseReference | Query) {
  try {
    const snapshot = await get(ref);
    
    const dataArr: T[] = [];
    
    snapshot.forEach((childSnapshot) => {
      dataArr.push(childSnapshot.val());
    });
    
    return dataArr;

  } catch (e) {
    alert(`Произошла ошибка :(`);
    console.error('Ошибка:', e);
  }
}

export async function setDb<T>(ref: DatabaseReference, body: T) {
    try { 
        set(ref, body);
    } catch(e) {
        alert(`Произошла ошибка :(`);
        console.error(e);
    }
}

export async function deleteDb(ref: DatabaseReference) {
    try {
        remove(ref);
    } catch(e) {
        alert(`Произошла ошибка :(`);
        console.error(e);
    }
}