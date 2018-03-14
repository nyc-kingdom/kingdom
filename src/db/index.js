import { db } from '../index';

export const createUser = async () => {
  await db.collection("cities").doc("LA").set({
   name: "Sanata Monica",
   state: "CA",
   country: "USA"
 })
 console.log("Document successfully written!");
}
