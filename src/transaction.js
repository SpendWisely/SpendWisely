import { db } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  addDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";

const Txn = document.getElementById("addTransaction");
let submitTxn = document.getElementById("submitTxn");

Txn.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitTxn.textContent = "Processing...";

  const dateInput = document.getElementById("date");
  const radio = document.getElementsByName("transaction");
  const amountInput = document.getElementById("amount");
  const category = document.getElementById("category");

  let txnType = null; //false for debit; true for credit;
  radio[0].checked ? (txnType = false) : null;
  radio[1].checked ? (txnType = true) : null;

  const date = Timestamp.fromDate(new Date(dateInput.value));
  const amount = parseFloat(amountInput.value);

  const userCredential = JSON.parse(localStorage.getItem("currentUser"));
  const docRef = doc(db, "Users", userCredential.user.uid);
  const docSnap = await getDoc(docRef);
  const balance = docSnap.data().balance;

  console.log(date, txnType, amount, category.value);

  if (checkDebitIncome(txnType, category.value) && insufficientFunds(txnType, amount, balance)) {
    const collRef = collection(
      db,
      "Users",
      userCredential.user.uid,
      "Transaction"
    );

    await addDoc(collRef, {
      date: date,
      txnType: txnType,
      amount: amount,
      category: category.value,
    });

    //balance updation
    await setDoc(docRef, {
      ...docSnap.data(),
      balance: txnType ? balance + amount : balance - amount,
    });

    window.alert("Transaction Added");
  }

  submitTxn.textContent = "Submit";
  Txn.reset();
});

function checkDebitIncome(txnType, category){
  console.log(txnType, category)
  if(txnType == false && category == "income"){
    window.alert("Cannot debit income");
    return false;
  }
  return true;
}

function insufficientFunds(txnType, amount, balance) {
  if (!txnType && balance < amount) {
    window.alert("Insufficient Funds");
    return false;
  }
  return true;
}
