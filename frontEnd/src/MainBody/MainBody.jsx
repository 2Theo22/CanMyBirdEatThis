import './mainbody.css'
import defaultImg from '../assets/IMG_8967.jpeg'


function MainBody() {

    return(
        <>
            <div className="main">
                <div className="leftSide">
                    <div className="NiceBeautifulFrame">
                        <h2 id="line1">Is your food safe for your bird?</h2>
                        <img className="Icon"/>
                    </div>

                </div>
                <div className="rightSide">
                    <img id="samplePic" src={defaultImg}/>
                </div>
            </div>

        </>
    )
}

export default MainBody