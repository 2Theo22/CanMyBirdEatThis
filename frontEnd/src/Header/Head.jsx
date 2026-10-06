import App from "../App.jsx";


function Head() {




    return(
    <>
        <div className="header">
            <div className="searchbar">
                <button id="button"><img id="magGlass" src="../assets/magnifying-glass-solid.png"/></button>
                <input type="text" id="input" placeholder="Banana"/>
                <a id="deleteText"><img id="deleteX" src="../assets/x-solid.png"/></a>
            </div>
        </div>
    </>
)


}

export default Head