import React, { useState, useEffect } from 'react';
import './admin.css';

const Admin = () => {
  const [sightWords, setSightWords] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [newWordsInput, setNewWordsInput] = useState('');

  useEffect(() => {
    fetchSightWords();
    fetchNouns();
  }, []);

  const fetchSightWords = async () => {
    try {
      const response = await fetch('http://kinderbuilder.org/api/sight-words');
      const data = await response.json();
      setSightWords(data);
    } catch (error) {
      console.error('Error fetching sight words:', error);
    }
  };

  const fetchNouns = async () => {
    try {
      const response = await fetch('http://kinderbuilder.org/api/nouns');
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
        const response = await fetch(`http://kinderbuilder.org/api/${table}/${id}`, {
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
    const wordsArray = newWordsInput.split('\n').filter((word) => word.trim() !== '');

    if (wordsArray.length === 0) {
      alert('Please enter at least one word.');
      return;
    }

    try {
      const response = await fetch(`http://kinderbuilder.org/api/${table}/bulk`, {
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
        setNewWordsInput('');
      } else {
        console.error('Failed to add words.');
      }
    } catch (error) {
      console.error('Error adding words:', error);
    }
  };

  return (
<div className="admin">
      <div className="admin-scrollable-container" id="sight-edit-container">
        <h2>Sight Words</h2>
        <div className="admin-header">
          <textarea
            placeholder="Enter words line by line"
            value={newWordsInput}
            onChange={(e) => setNewWordsInput(e.target.value)}
            id="sight-input"
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
            value={newWordsInput}
            onChange={(e) => setNewWordsInput(e.target.value)}
            id="noun-input"
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
    </div>
  );
};

export default Admin;
