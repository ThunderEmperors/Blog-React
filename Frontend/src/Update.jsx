import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const Update = (props) => {
    const id = useLocation();

    useEffect(() => {
        fetchblog()
    }, [])

    const [loading, setLoading] = useState(true)

    const [ogBlog, setOgBlog] = useState({
        title: "",
        author: "",
        description: ""
    })

    const [updatedBlog, setUpdatedBlog] = useState({
        title: "",
        author: "",
        description: ""
    })

    const fetchblog = () => {


        axios.get(`http://127.0.0.1:8000/blogs/blogs/${id.state}/`)
        .then(response => {
            setOgBlog(response.data)
            setUpdatedBlog(response.data)
            setLoading(false)
        })
        .catch(error => console.error(error))
    }

    const handleUpdatedBlog = (e) =>{
        setUpdatedBlog({
            ...updatedBlog, [e.target.name]:e.target.value
        })
    }

    const postUpdatedBlog = () => {
        console.log(updatedBlog)

        axios.put(`http://127.0.0.1:8000/blogs/blogs/${id.state}/`, updatedBlog)
        .then(response => {
            fetchblog();
            setUpdatedBlog({
                title: "",
                author: "",
                description: ""
            })
        })
        .catch(error => console.error(error))
    }



    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    else{
        return(
            <>
            <div className="updateBlog">
                <input className="updateBlogItem" type="text" name="title" placeholder="Enter Title" value={updatedBlog.title} onChange={handleUpdatedBlog}/>
                <input className="updateBlogItem" type='text' name='author' placeholder="Author" value={updatedBlog.author} onChange={handleUpdatedBlog}/>
                <input className="updateBlogItem" type='text' name='description' placeholder="Description" value={updatedBlog.description} onChange={handleUpdatedBlog}/>
                <Link to={`/`}> 
                    <input className="updateBlogItem" type="button" value="Submit Updated Blog" onClick={postUpdatedBlog}/>
                </Link>
            </div>
            </>
        )
    }

}

export default Update;