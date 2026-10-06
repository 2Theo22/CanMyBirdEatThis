
import './header.css'
import magglass from '../assets/magnifying-glass-solid.png'
import deleteX from '../assets/x-solid.png'

function Head() {
    let inputString;
    return(
    <>
        <div className="header">
            <div className="searchbar">
                <button id="button"><img id="magGlass" src={magglass}/></button>
                <input type="text" id="input" placeholder="Banana"/>
                <a id="deleteText"><img id="deleteX" src={deleteX}/></a>
            </div>
        </div>
    </>
)


}

export default Head