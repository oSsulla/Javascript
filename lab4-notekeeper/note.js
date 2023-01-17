const createNoteButton = document.getElementById("create-note-button");
const noteList = document.getElementById("note-list");
const createNoteModal = document.getElementById("create-note-modal");
const closeModalButton = document.querySelector(".close-button");
const createNoteForm = document.getElementById("create-note-form");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
  noteList.innerHTML = "";
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let noteDiv = document.createElement("div");
    noteDiv.style.backgroundColor = note.color;
    noteDiv.classList.add("note");
    if (note.pin) {
      noteDiv.classList.add("pinned");
    }
    noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.text}</p>
      <p>Created: ${note.date}</p>
      <button class="edit-button" data-index="${i}">EDIT</button>
      <button class="delete-button" data-index="${i}">DELETE</button>
    `;
    noteList.appendChild(noteDiv);
  }
}

createNoteButton.addEventListener("click", function() {
  createNoteModal.style.display = "block";
});

closeModalButton.addEventListener("click", function() {
  createNoteModal.style.display = "none";
});

createNoteForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let title = document.getElementById("note-title").value;
  let text = document.getElementById("note-text").value;
  let color = document.getElementById("note-color").value;
  let pin = document.getElementById("note-pin").checked;
  let date = new Date().toLocaleString();

  let note = { title, text, color, pin, date };
  if(createNoteForm.dataset.editing){
    let index = createNoteForm.dataset.index;
    notes[index] = note;
    createNoteForm.removeAttribute('data-editing');
    createNoteForm.removeAttribute('data-index');
  }else{
    notes.push(note);
  }
  
  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();

  createNoteModal.style.display = "none";
});

noteList.addEventListener("click", function(e) {
  if (e.target.classList.contains("edit-button")) {
    let index = e.target.dataset.index;
    let note = notes[index];

    createNoteModal.style.display = "block";

    document.getElementById("note-title").value = note.title;
    document.getElementById("note-text").value = note.text;
    document.getElementById("note-color").value = note.color;
    document.getElementById("note-pin").checked = note.pin;

    createNoteForm.dataset.index = index;
    createNoteForm.dataset.editing = true;
  } else if (e.target.classList.contains("delete-button")) {
    let index = e.target.dataset.index;
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }
});

displayNotes();