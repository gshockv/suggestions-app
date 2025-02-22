import './App.css'
import { useEffect, useState } from "react";

import { DB_ID, COLLECTION_ID, ID, databases } from "./lib/appwrite";

const App = () => {

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionText, setSuggestionText] = useState('');
  
  useEffect(() => {
    loadSuggestions();
  }, []);

  const addSuggestion = async (e) => {
    e.preventDefault();

    if (suggestionText) {
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        text: suggestionText
      });

      setSuggestionText('');
      loadSuggestions();
    }
  };

  const updateSuggestion = async (id, completed) => {
    await databases.updateDocument(DB_ID, COLLECTION_ID, id, {
      completed: completed
    });
    loadSuggestions();
  };

  const loadSuggestions = async () => {
    const result = await databases.listDocuments(DB_ID, COLLECTION_ID);

    console.log(result);
    setSuggestions(result.documents.reverse());
  };

  const deleteSuggestion = async (id) => {
    console.log("Delete document " + id);
    await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
    loadSuggestions();
  };

  const handleInput = (e) => {
    setSuggestionText(e.target.value);
  };

  return (
    <main className='max-w-3xl w-full mx-auto'>

      <h1 className='font-medium text-slate'>Suggestions List</h1>

      <form className='flex flex-col gap-4 my-6' onSubmit={ addSuggestion }>
        <textarea
          className='bg-slate-800 shadow-xl w-full h-20 p-4 rounded disabled:bg-slate-900 
            disabled:placeholder:text-slate-500 disabled:cursor-not-allowed'
          value={suggestionText}
          onInput={handleInput}
          placeholder='Enter your suggestion here...'></textarea>
        
        <button
          onSubmit={addSuggestion}
          className='bg-purple-900 px-6 py-2 rounded shadow ml-auto transition hover:bg-white hover:text-purple-900'>
            Save Suggestion
          </button>
      </form>

      <ul className='space-y-4'>
        {suggestions.map((suggest) => (
          <li key={suggest.$id} className='flex items-center border border-white/20 p-4 rounded shadow gap-2'>
            <span> {suggest.completed ? '✅' : null }</span>
            {suggest.text}
            <input 
              type='checkbox' 
              checked={suggest.completed}
              className='ml-auto'
              onChange={() => updateSuggestion(suggest.$id, !suggest.completed)} />

            <button 
              className='text-red-500 hover:text-red-800 hover:cursor-pointer'
              onClick={() => deleteSuggestion(suggest.$id)}>
              <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M4 7l16 0" />
                                        <path d="M10 11l0 6" />
                                        <path d="M14 11l0 6" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
