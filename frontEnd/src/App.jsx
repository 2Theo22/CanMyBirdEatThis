import { useState, useEffect } from 'react'
import './App.css'
import Head from './Header/Head.jsx'
import MainBody from './MainBody/MainBody.jsx'

function App() {
    const [userInput, setInput] = useState("");  // from Head.jsx
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!userInput) {
            setResults([]);
            return;
        }

        let ignore = false;

        fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(userInput)}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (!ignore) setResults(data);
            })
            .catch((err) => {
                console.error(err);
                if (!ignore) setResults([]);
            });

        return () => { ignore = true; };
    }, [userInput]);

    return (
        <>
            <Head onSearchChange={setInput} />
            <MainBody results={results} />
        </>
    )
}

export default App