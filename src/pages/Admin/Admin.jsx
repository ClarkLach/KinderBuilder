import React, { useState, useEffect } from 'react';
import './admin.css';

const Admin = () => {
  const [sightWords, setSightWords] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [newSightInput, setNewSightInput] = useState('');
  const [newNounsInput, setNewNounsInput] = useState('');

  useEffect(() => {
    fetchSightWords();
    fetchNouns();
  }, []);

  const fetchSightWords = async () => {
    try {
      const response = await fetch('/api/sight-words');
      const data = await response.json();
      setSightWords(data);
    } catch (error) {
      console.error('Error fetching sight words:', error);
    }
  };

  const fetchNouns = async () => {
    try {
      const response = await fetch('/api/nouns');
      const data = await response.json();
      setNouns(data);
    } catch (error) {
      console.error('Error fetching nouns:', error);
    }
  };

  const handleDeleteWord = async (table, id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this word?');

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/${table}/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          if (table === 'sight-words') {
            fetchSightWords();
          } else if (table === 'nouns') {
            fetchNouns();
          }
        } else {
          console.error('Failed to delete word.');
        }
      } catch (error) {
        console.error('Error deleting word:', error);
      }
    }
  };

  const handleSelectWord = (word) => {
    setSelectedWord(word);
  };

  const handleAddWords = async (table, listName) => {
    let wordsArray;
    if (table == "sight-words") {
      wordsArray = newSightInput.split('\n').filter((word) => word.trim() !== '');
    } else {
      wordsArray = newNounsInput.split('\n').filter((word) => word.trim() !== '');
    }

    if (wordsArray.length === 0) {
      alert('Please enter at least one word.');
      return;
    }

    try {
      const response = await fetch(`/api/${table}/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ words: wordsArray, list_name: listName }),
      });

      if (response.ok) {
        if (table === 'sight-words') {
          fetchSightWords();
        } else if (table === 'nouns') {
          fetchNouns();
        }
        setNewSightInput('');
        setNewNounsInput('');
      } else {
        console.error('Failed to add words.');
      }
    } catch (error) {
      console.error('Error adding words:', error);
    }
  };

  const handleExportCSV = async () => {
    try {
      // Make a request to the backend to trigger CSV export
      const response = await fetch('/api/export-csv');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Convert the response to a blob
      const blob = await response.blob();

      // Create a blob and initiate the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported_data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
<div className="admin">
      <div className="admin-scrollable-container" id="sight-edit-container">
        <h2>Sight Words</h2>
        <div className="admin-header">
          <textarea
            placeholder="Enter words line by line"
            value={newSightInput}
            onChange={(e) => setNewSightInput(e.target.value)}
            id="sight-input"
            key="sight-input"
          />
          <button onClick={() => handleAddWords('sight-words', 'default')}>
            Add New Sight Words
          </button>
        </div>
        <ul className='admin-ul'>
          {sightWords.map((word) => (
            <li key={word.id} className='admin-li'>
              <span
                className={selectedWord === word.word ? 'selected-word' : ''}
                onClick={() => handleSelectWord(word.word)}
              >
                {word.word}
              </span>
              <button onClick={() => handleDeleteWord('sight-words', word.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin-scrollable-container" id="noun-edit-container">
        <h2>Nouns</h2>
        <div className="admin-header">
          <textarea
            placeholder="Enter words line by line"
            value={newNounsInput}
            onChange={(e) => setNewNounsInput(e.target.value)}
            id="noun-input"
            key="noun-input"
          />
          <button onClick={() => handleAddWords('nouns', 'default')}>
            Add New Nouns
          </button>
        </div>
        <ul className="admin-ul">
          {nouns.map((word) => (
            <li key={word.id} className="admin-li">
              <span
                className={selectedWord === word.word ? 'selected-word' : ''}
                onClick={() => handleSelectWord(word.word)}
              >
                {word.word}
              </span>
              <button onClick={() => handleDeleteWord('nouns', word.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => handleExportCSV()}>Download Sentences</button>
    </div>
  );
};

export default Admin;
