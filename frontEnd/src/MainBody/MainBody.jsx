import './mainbody.css'
import defaultImg from '../assets/IMG_8967.jpeg'
import skull from '../assets/skull-crossbones-solid.png'
import thumbsup from '../assets/thumbs-up-solid.png'


function MainBody({ results }) {
    if (!results || results.length === 0) {
        console.log("no results");
    }

    const food = results[0];
    const imageUrl = food?.birdGroups?.[0]?.images?.[0]?.ImageURL;
    const foodIconSetter = food?.Danger;
    let foodIcon;
    console.log('icon:', foodIconSetter, 'image:', imageUrl);

    if (!foodIconSetter){
        foodIcon = "https://png.pngtree.com/png-vector/20250909/ourlarge/pngtree-hand-drawn-doodle-question-marks-vector-png-image_17385353.webp";
    }

    else if(foodIconSetter === "dangerous"){
        foodIcon = skull;
    }

    else if(foodIconSetter === "can eat"){
        foodIcon = thumbsup;
    }


    return(
        <>
        <div className="main">
            <div className="leftSide">
                <div className="NiceBeautifulFrame">
                    <h2 id="line1">
                        {food ? `${food.FoodName}: ${food.Danger}` : "Is this food safe?"}
                    </h2>
                    <img className="Icon" src={foodIcon}/>
                </div>
            </div>
            <div className="rightSide">
                <img
                    id="samplePic"
                    src={imageUrl ?? defaultImg}
                    onError={(e) => { e.target.src = defaultImg; }}/>
            </div></div>

        </>
    )
}

export default MainBody