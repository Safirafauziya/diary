// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0v67-FPgzy-7Yhid4V78oXnXfq5W3Ejg",
  authDomain: "diary-safira-nabiel.firebaseapp.com",
  databaseURL: "https://diary-safira-nabiel-default-rtdb.firebaseio.com",
  projectId: "diary-safira-nabiel",
  storageBucket: "diary-safira-nabiel.firebasestorage.app",
  messagingSenderId: "1084355456139",
  appId: "1:1084355456139:web:7c8049f7ee0fa3f8efb88e",
  measurementId: "G-1BL3YBEEM1"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Simpan catatan ke Firebase
function saveNote() {
  const noteInput = document.getElementById("noteInput").value.trim();
  const user = document.getElementById("userSelect").value;

  if (noteInput === "") return;

  const notesRef = db.ref("notes");
  const newNoteRef = notesRef.push();
  newNoteRef.set({
    text: noteInput,
    user: user,
    timestamp: Date.now()
  });

  document.getElementById("noteInput").value = "";
}

// Tampilkan catatan dari Firebase
function loadNotes() {
  const notesList = document.getElementById("notesList");
  const notesRef = db.ref("notes");

  notesRef.on("value", (snapshot) => {
    notesList.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const note = childSnapshot.val();
      const li = document.createElement("li");

      // Warna beda tiap user
      if (note.user === "Safira") {
        li.className = "note-item note-safira";
      } else {
        li.className = "note-item note-nabiel";
      }

      // Format: Nama - isi
      li.textContent = `${note.user}: ${note.text}`;
      notesList.appendChild(li);
    });
  });
}

// Jalankan saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadNotes);
