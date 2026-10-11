import './mainbody.css'
import defaultImg from '../assets/IMG_8967.jpeg'


function MainBody({ results }) {
    const food = results[0];
    const imageUrl = food?.birdGroups[0]?.images[0]?.ImageURL;


    return(
        <>
        <div className="main">
            <div className="leftSide">
                <div className="NiceBeautifulFrame">
                    <h2 id="line1">
                        {food ? `${food.FoodName}: ${food.Danger}` : "Is this food safe?"}
                    </h2>
                    <img className="Icon"/>
                </div>
            </div>
            <div className="rightSide">
                <img id="samplePic" src={defaultImg}/>
            </div></div>

        </>
    )
}

export default MainBody