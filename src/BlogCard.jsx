import React from "react";
import './BlogCard.css'

const BlogCard = ({props}) => {
    return(
        <div className="Blog">
        <div className="Title">
            {props.title}
        </div>
        <div className="Author">
            by {props.author}
        </div>
        <div className="Desc">
            <br />
            {props.description}
        </div>
        </div>
    )
}

export default BlogCard