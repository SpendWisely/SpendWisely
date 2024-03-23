import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const displayBal = document.getElementById("balance");
const txnDetails = document.getElementById("txnDetails");

const userCredential = JSON.parse(localStorage.getItem("currentUser"));
const docRef = doc(db, "Users", userCredential.user.uid); //In 'Users' collection, Document Ref of the user
const txnCollRef = collection(
  db,
  "Users",
  userCredential.user.uid,
  "Transaction"
); //Collection Ref of 'Transaction'
const docSnap = await getDoc(docRef); //Fetching user document
const txnSnap = await getDocs(txnCollRef); //Fetching user's transations

//Display user balance
const balance = docSnap.data().balance;
displayBal.innerHTML = balance;

//Storing user transactions in Array
const txnArray = [];

txnSnap.forEach((doc) => {
  const timestamp = doc.data().date.toDate();
  const arrItem = { ...doc.data(), date: timestamp.toDateString() };
  txnArray.push(arrItem);
});

//Sorting Array by date
txnArray.sort((a, b) => {
  return new Date(a.date) - new Date(b.date);
});

//Displaying user's transactions
txnDetails.innerHTML = txnArray.map((txn) => {
    const txnType = txn.txnType === true ? "Credit" : "Debit";
    return `<tr>
                <td>${txn.date}</td>
                <td>${txnType}</td>
                <td>${txn.amount}</td>
                <td>${txn.category}</td>
            </tr>`
}).join('')
