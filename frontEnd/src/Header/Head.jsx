import { useState } from "react";
import './header.css'
import magglass from '../assets/magnifying-glass-solid.png'
import deleteX from '../assets/x-solid.png'

function Head({ onSearchChange}) {
    let [inputString, setInput] = useState("");

    const click = (e) => {
        e.preventDefault();
        onSearchChange(inputString);

    }

    const deletePls = (e) => {
        e.preventDefault();
        console.log("DeleteX has been clicked");
        setInput(" ");
    }
    return(
    <>
        <div className="header">
            <div className="searchbar">
                <button id="button" onClick = {click}>
                    <img id="magGlass"
                         src={magglass}

                    />
                </button>
                <input
                    type="text"
                    id="input"
                    placeholder="Banana"
                    value = {inputString}
                    onChange={
                    (e) =>
                        setInput (e.target.value)
                    }
                />
                <a id="deleteText" onClick = {deletePls}>
                    <img id="deleteX" src={deleteX}/>
                </a>
            </div>
        </div>
    </>
)


}

export default Head