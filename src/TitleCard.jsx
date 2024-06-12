import React, {useState} from "react";
import './TitleCard.css';

const TitleCard = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const postData = () => {
        console.log(title);
        console.log(desc);
    }


    return(
<card className="Card">
        <div className="MainTitle">
           Title
        </div>
        <div className="Description">
            Description
        </div>
        <div className="Utility">
            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input placeholder="Description" onChange={(e) => setDesc(e.target.value)}/>
            <button onClick={postData}> Submit </button>
        </div>
</card>
    )
}

export default TitleCard;