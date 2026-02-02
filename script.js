import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔥 firebaseConfig שלך
const firebaseConfig = {
  apiKey: "AIzaSyAMp5-wqinWTl4z0ms6bmnXgm9EvqPcbug",
  authDomain: "mytwoplayergame.firebaseapp.com",
  projectId: "mytwoplayergame",
  storageBucket: "mytwoplayergame.firebasestorage.app",
  messagingSenderId: "1003705475156",
  appId: "1:1003705475156:web:0d56aeef31623413238dc1"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elements
const createBtn = document.getElementById("createBtn");
const list = document.getElementById("codesList");

// יצירת קוד
createBtn.onclick = () => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  push(ref(db, "testCodes"), {
    code,
    time: Date.now()
  });
};

// האזנה בזמן אמת (🔥 זה הסנכרון)
onValue(ref(db, "testCodes"), (snapshot) => {
  list.innerHTML = "";

  snapshot.forEach(child => {
    const li = document.createElement("li");
    li.textContent = child.val().code;
    list.appendChild(li);
  });
});
