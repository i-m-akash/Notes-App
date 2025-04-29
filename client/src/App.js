import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://mini-notes-backend.onrender.com';


function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await axios.get(`${API_BASE}/notes`);
    setNotes(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/notes`, { title, content });
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_BASE}/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📝 Mini Notes App</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required /><br />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required /><br />
        <button type="submit">Add Note</button>
      </form>

      <hr />
      {loading ? <p>Loading...</p> : (
        notes.map(note => (
          <div key={note._id} style={{ marginBottom: '1rem' }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
