import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import Chart from "chart.js/auto";

class Categories {
  travel = 0;
  shopping = 0;
  food = 0;
  bills = 0;
  entertainment = 0;
  healthcare = 0;
}
let catData = new Categories();
let myChart;

const displayBal = document.getElementById("balance");
const txnDetails = document.getElementById("txnDetails");
const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");

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
let filteredTxn = txnArray;

txnSnap.forEach((doc) => {
  const timestamp = doc.data().date.toDate();
  const arrItem = { ...doc.data(), date: timestamp.toDateString() };
  txnArray.push(arrItem);
});

//Sorting Array by date
console.log(txnArray);
txnArray.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

//Displaying user's transactions
txnDetails.innerHTML = txnArray
  .map((txn) => {
    const txnType = txn.txnType === true ? "Credit" : "Debit";
    return `<tr>
                <td>${txn.date}</td>
                <td>${txnType}</td>
                <td>${txn.amount}</td>
                <td>${txn.category}</td>
            </tr>`;
  })
  .join("");

catData = setCategories();
loadChart();

fromDateInput.addEventListener("change", () => {
  let fromDate, toDate;
  fromDate = new Date(fromDateInput.value);
  toDate = new Date(toDateInput.value);
  console.log(toDate)
  if (toDate == 'Invalid Date') {
    toDate = new Date(txnArray[0].date);
  }
  renderTransactions(fromDate, toDate);
  loadChart();
});

toDateInput.addEventListener("change", () => {
  let fromDate, toDate;
  fromDate = new Date(fromDateInput.value);
  toDate = new Date(toDateInput.value);
  if (fromDate == 'Invalid Date') {
    fromDate = new Date(txnArray[txnArray.length - 1].date);
  }
  renderTransactions(fromDate, toDate);
  loadChart();
});

//Rendering Filtererd Transaction into the table
function renderTransactions(fromDate, toDate) {
  filteredTxn = txnArray.filter((txn) => {
    const txnDate = new Date(txn.date);
    return txnDate >= fromDate && txnDate <= toDate;
  });

  txnDetails.innerHTML = filteredTxn
    .map((txn) => {
      const txnType = txn.txnType === true ? "Credit" : "Debit";
      return `<tr>
                <td>${txn.date}</td>
                <td>${txnType}</td>
                <td>${txn.amount}</td>
                <td>${txn.category}</td>
            </tr>`;
    })
    .join("");

  catData = setCategories();
}

//Building the dataset for pie chart

function setCategories() {
  const cat = new Categories();

  filteredTxn.forEach((txn) => {
    if (txn.category === "travel") {
      cat.travel += txn.amount;
    } else if (txn.category === "shopping") {
      cat.shopping += txn.amount;
    } else if (txn.category === "food") {
      cat.food += txn.amount;
    } else if (txn.category === "bills") {
      cat.bills += txn.amount;
    } else if (txn.category === "entertainment") {
      cat.entertainment += txn.amount;
    } else if (txn.category === "healthcare") {
      cat.healthcare += txn.amount;
    }
  });

  return cat;
}

//Watching for changes in the fromDate and toDate input fields and rendering the filtered transactions accordingly

//Pie Chart

async function loadChart() {
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(document.getElementById("txnChart"), {
    type: "pie",
    data: {
      labels: [
        "Travel",
        "Shopping",
        "Food",
        "Bills",
        "Entertainment",
        "Healthcare",
      ],
      datasets: [
        {
          data: [
            catData.travel,
            catData.shopping,
            catData.food,
            catData.bills,
            catData.entertainment,
            catData.healthcare,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(135, 100, 86)",
            "rgb(167, 205, 189)",
            "rgb(87, 205, 86)",
            "rgb(255, 146, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });
}
