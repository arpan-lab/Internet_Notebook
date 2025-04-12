import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]); // ✅ Always an array

  // ✅ Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token") || ""
      }
    });

    const data = await response.json();
    console.log("Fetched notes:", data);

    if (Array.isArray(data)) {
      setNotes(data);
    } else {
      console.error("Expected array from API but got:", data);
      setNotes([]); // fallback to empty array
    }
  };

  // ✅ Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token") || ""
      },
      body: JSON.stringify({ title, description, tag })
    });

    const newNote = await response.json();
    console.log("New note added:", newNote);

    if (Array.isArray(notes)) {
      setNotes(notes.concat(newNote));
    } else {
      setNotes([newNote]); // fallback if notes is not an array
    }
  };

  // ✅ Delete a Note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token") || ""
      }
    });

    const newNotes = Array.isArray(notes)
      ? notes.filter((note) => note._id !== id)
      : [];

    setNotes(newNotes);
  };

  // ✅ Edit a Note
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token") || ""
      },
      body: JSON.stringify({ title, description, tag })
    });

    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
