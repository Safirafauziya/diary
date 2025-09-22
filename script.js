
  const firebaseConfig = {
    apiKey: "AIzaSyAv67-FPgzy-7Yhid4V78oXnfq5W3Ejg",
    authDomain: "diary-safira-nabiel.firebaseapp.com",
    databaseURL: "https://diary-safira-nabiel-default-rtdb.firebaseio.com",
    projectId: "diary-safira-nabiel",
    storageBucket: "diary-safira-nabiel.appspot.com",
    messagingSenderId: "1084355456139",
    appId: "1:1084355456139:web:7c8049f7ee0fa3f8efb88e",
    measurementId: "G-1BL3YBEEM1"
  };
// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// Simpan catatan baru
function saveNote() {
  const note = document.getElementById("note").value;
  const author = document.getElementById("author").value;

  if (note.trim() === "") return alert("Catatan tidak boleh kosong!");

  const newNoteRef = db.ref("notes").push();
  newNoteRef.set({
    author: author,
    text: note,
    timestamp: Date.now()
  });

  document.getElementById("note").value = "";
}

// Ambil & tampilkan catatan lama
const notesList = document.getElementById("notesList");
db.ref("notes").orderByChild("timestamp").on("value", (snapshot) => {
  notesList.innerHTML = "";
  snapshot.forEach((child) => {
    const data = child.val();
    const li = document.createElement("li");
    li.classList.add("note-card");
    li.innerHTML = `
      <p>${data.text}</p>
      <span>✍️ ${data.author} - ${new Date(data.timestamp).toLocaleString()}</span>
    `;
    notesList.prepend(li); // taruh catatan terbaru di atas
  });
});