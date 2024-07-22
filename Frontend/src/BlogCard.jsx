import React from "react";
import './BlogCard.css'
import { Link } from "react-router-dom";

const BlogCard = ({props, index, id}) => {
    return(
        <Link to={`/blog/${index+1}`} className="links">
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
            <div className="buttons">
                <br />
                <Link to={`/update`} state={id}>Herere</Link>
            </div>
        </div>
        </Link>
    )
}

export default BlogCard