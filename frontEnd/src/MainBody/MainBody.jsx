import './mainbody.css'
import './slideshow.css'
import defaultImg from '../assets/IMG_8967.jpeg'
import skull from '../assets/skull-crossbones-solid.png'
import thumbsup from '../assets/thumbs-up-solid.png'
import notRecommended from '../assets/triangle-exclamation-solid.png'
import { useState, useEffect } from 'react'

function MainBody({ results }) {
    const food = results?.[0];

    const images = food?.BirdGroups?.flatMap((g) => g.Images) ?? [];
    const [index, setIndex] = useState(0);
    useEffect(() => {
        setIndex(0);
    }, [food?.FoodName]);
    useEffect(() => {
        if (images.length < 2) return;
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length, index]);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);

    const image = images[index];
    const imageUrl = image?.ImageURL;
    const imageCredit = image?.Credit;


    const groupNames = food?.BirdGroups?.map((g) => g.GroupName).join(', ');

    let foodIcon = "";
    let dangerLevel = "";
    let recommendationText = "";
    let dangerorRecommended = "";
    let BirdListOrDangerWarning = "";

    if (food?.Danger === "dangerous") {
        foodIcon = skull;
        dangerLevel = "dangerous!";
        recommendationText = "It's recommended to not let your Bird near this! Exposure can lead to death!";
        dangerorRecommended = "Danger Warning!";
        BirdListOrDangerWarning = "Letting your bird near this can lead to death!";

    } else if (food?.Danger === "can eat") {
        foodIcon = thumbsup;
        dangerLevel = "Not dangerous";
        recommendationText = "It's safe to have it around your bird";
        dangerorRecommended = "Birds that can eat it: ";
        BirdListOrDangerWarning = groupNames;
    } else if (food?.Danger === "should not eat") {
        foodIcon = notRecommended;
        dangerLevel = "Not dangerous in moderation";
        recommendationText = "It's not recommended to let your bird eat this or only in small portions.";
        dangerorRecommended = "Birds that can eat it: ";
        BirdListOrDangerWarning = groupNames;
    } else if (food) {
        // Danger === "NA"
        dangerLevel = "Unknown";
        recommendationText = "No safety information available for this food.";
    }

    return (
        <>
            <div className="main">
                <div className="leftSide">
                    <div className="NiceBeautifulFrame">
                        <h2 id="line1">
                            {food ? `${food.FoodName}: ${food.Danger}` : "Is this food safe?"}
                        </h2>
                        <div className="line2">
                            <h2>{recommendationText}</h2>
                            {foodIcon && <img className="icon" src={foodIcon} alt={food?.Danger} />}
                        </div>
                    </div>
                    <div className="lowerpart">
                        <div className="row">
                            <div className="smallFrame">
                                <p>{dangerorRecommended}</p>
                                <p>{BirdListOrDangerWarning}</p>
                            </div>
                            <div className="smallFrame">
                                <p>Danger level</p>
                                <p>{dangerLevel}</p>
                                {food?.SmallPortionWarning && <p>{food.SmallPortionWarning}</p>}
                                {food?.CertainDeadWarn && <p>{food.CertainDeadWarn}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="smallFrame">
                                <p>Type</p>
                                <p>{food?.Type ?? "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="slideshow">
                        <img
                            id="samplePic"
                            src={imageUrl ?? defaultImg}
                            onError={(e) => { e.target.src = defaultImg; }}
                        />
                        {images.length > 1 && (
                            <>
                                <button className="slideBtn left" onClick={prev}>‹</button>
                                <button className="slideBtn right" onClick={next}>›</button>
                                <div className="slideCount">{index + 1} / {images.length}</div>
                            </>
                        )}
                    </div>
                    <div className="creditFrame">
                        <p>Image Credit:</p>
                        <p>{imageCredit ?? "-"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainBody