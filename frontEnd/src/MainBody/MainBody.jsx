import './mainbody.css'
import defaultImg from '../assets/IMG_8967.jpeg'
import skull from '../assets/skull-crossbones-solid.png'
import thumbsup from '../assets/thumbs-up-solid.png'
import notRecommended from '../assets/triangle-exclamation-solid.png'


function MainBody({ results }) {
    if (!results || results.length === 0) {
        console.log("no results");
    }

    const food = results[0];
    const imageUrl = food?.birdGroups?.[0]?.images?.[0]?.ImageURL;
    const foodIconSetter = food?.Danger;
    let foodIcon;
    let recommendationText;
    console.log('icon:', foodIconSetter, 'image:', imageUrl);

    if (!foodIconSetter){
        foodIcon = "";
    }

    else if(foodIconSetter === "dangerous"){
        foodIcon = skull;
        recommendationText = "It's recommended to not let your Bird near this! Exposure can lead to death!"
    }

    else if(foodIconSetter === "can eat"){
        foodIcon = thumbsup;
        recommendationText = "It's safe to have it around your bird"
    }

    else if(foodIconSetter === "should not eat"){
        foodIcon = notRecommended;
        recommendationText = "It's not recommened to let your bird eat this or only in small portions."
    }


    return(
        <>
        <div className="main">
            <div className="leftSide">
                <div className="NiceBeautifulFrame">
                    <h2 id="line1">
                        {food ? `${food.FoodName}: ${food.Danger}` : "Is this food safe?"}
                    </h2>
                    <div className="line2">
                        <h2>{recommendationText}</h2>
                        <img className="icon" src={foodIcon}/>
                    </div>
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