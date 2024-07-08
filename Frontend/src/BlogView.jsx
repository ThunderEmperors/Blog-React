import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './BlogView.css'

const BlogView = () => {
    const { index } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchblogs()
    }, [])

    const fetchblogs = () => {
        axios.get('http://127.0.0.1:8000/blogs/blogs/')
        .then(response => {
            console.log(response.data)
            setBlogs(response.data)
            setLoading(false)
        })
        .catch(error => console.error(error))
    }

    if(loading){
        return(
            <div className="Loading">Loading...</div>
        )
    }
    else{
    return(
        <blogview className="deatil-view">
            <div className="detail-title">{blogs[index-1].title}</div>
            <br />
            <div className="detail-desc">{blogs[index-1].description}</div>
        </blogview>
        )
    }
}

export default BlogView;
