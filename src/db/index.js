import { db } from '../index';

export const createUser = async () => {
  await db.collection("cities").doc("LA").set({
   name: "i love fullstack",
   state: "CA",
   country: "USA"
 })
 console.log("Document successfully written!");
}
