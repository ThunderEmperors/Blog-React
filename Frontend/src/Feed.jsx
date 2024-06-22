import React, {useState, useEffect} from "react";
import axios from 'axios';
import BlogCard from "./BlogCard";
import './Feed.css'

const Feed = () => {

    useEffect(() => {
        fetchblogs()
    }, [])


    const [blogs, setBlogs] = useState([]);
    const [createNewStatus, setCreateNewStatus] = useState(false);
    const [updateStatus, setUpdateStatus] = useState({toUpdate:false, index:-1})
    const [deleteIndex, setDeleteIndex] = useState(-1)

    const [updatedBlog, setUpdatedBlog] = useState({
        title: "",
        author: "",
        description: ""
    })

    const [newBlog, setnewBlog] = useState({
        title: "",
        author: "",
        description: ""
    })




    const handleNewBlog = (e) => {
        setnewBlog({
            ...newBlog, [e.target.name]:e.target.value
        })
    }

    const handleUpdatedBlog = (e) =>{
        setUpdatedBlog({
            ...updatedBlog, [e.target.name]:e.target.value
        })

    }

    const handleAddBlog = () => {
        console.log(newBlog)
        setCreateNewStatus(false)

        axios.post('http://127.0.0.1:8000/blogs/blogs/', newBlog)
        .then(response => {
            setBlogs([...blogs, response.data])
            setnewBlog({
                title: "",
                author: "",
                description: ""
            })
        })
        .catch(error => console.error(error))
    }

    const postUpdatedBlog = () => {
        console.log(updatedBlog)
        setUpdateStatus({
            toUpdate: false,
            index: updateStatus.index
        })

        axios.put(`http://127.0.0.1:8000/blogs/blogs/${blogs[updateStatus.index - 1].id}/`, updatedBlog)
        .then(response => {
            fetchblogs();
            setUpdatedBlog({
                title: "",
                author: "",
                description: ""
            })
        })
        .catch(error => console.error(error))
    }

    const handleDeleteBlog = () => {
        console.log(deleteIndex)

        axios.delete(`http://127.0.0.1:8000/blogs/blogs/${deleteIndex}/`, )
        .then(response => {
            fetchblogs();
        })
        .catch(error => console.error(error))
    }

    const fetchblogs = () => {
        axios.get('http://127.0.0.1:8000/blogs/blogs/')
        .then(response => {
            console.log(response.data)
            setBlogs(response.data)
        })
        .catch(error => console.error(error))
    }

    const createNewBlog = () => {
        if(createNewStatus == true){
            return(
                <div className="CreateNewBlog">
                    <input className="NewBlogItem" type="text" name="title" placeholder="Enter Title" value={newBlog.title} onChange={handleNewBlog}/>
                    <input className="NewBlogItem" type='text' name='author' placeholder="Author" value={newBlog.author} onChange={handleNewBlog}/>
                    <input className="NewBlogItem" type='text' name='description' placeholder="Description" value={newBlog.description} onChange={handleNewBlog}/>
                    <input className="NewBlogItem" type="button" value="Submit New Blog" onClick={handleAddBlog}/>
                </div>
            )
        }
    }

    const updateBlog = () => {
        if(updateStatus.toUpdate == true){
            return(
                <div className="updateBlog">
                <input className="updateBlogItem" type="text" name="title" placeholder="Enter Title" value={updatedBlog.title} onChange={handleUpdatedBlog}/>
                <input className="updateBlogItem" type='text' name='author' placeholder="Author" value={updatedBlog.author} onChange={handleUpdatedBlog}/>
                <input className="updateBlogItem" type='text' name='description' placeholder="Description" value={updatedBlog.description} onChange={handleUpdatedBlog}/>
                <input className="updateBlogItem" type="button" value="Submit Updated Blog" onClick={postUpdatedBlog}/>
            </div>
            )
        }
    }

    const changeCreateStatus = () => {
        setCreateNewStatus(!createNewStatus)
        console.log(createNewStatus)
    }

    const changeUpdateStatus = () => {
        console.log(updateStatus.index)
        setUpdateStatus({
            toUpdate: !updateStatus.toUpdate,
            index: updateStatus.index
        })
        if(updateStatus.toUpdate == false){
            setUpdatedBlog(blogs[updateStatus.index - 1])
        }
        //idk why true is acting as false and false is acting as true here
        if(updateStatus.toUpdate == true){
            setUpdatedBlog({
                title: "",
                author: "",
                description: ""
            })
        }
    }

    return(
    <feed className="feed">
        <div>
            <div className="NewBlog">
            <input type="button" value="Create New Blog" onClick={changeCreateStatus}/>
            {createNewBlog()}
            <br />
            <br />
            </div>
            <div className="updateTab">
                <span>Enter which blog to update </span> 
                <input type="number" onChange={(e) => {setUpdateStatus({toUpdate:updateStatus.toUpdate, index:e.target.value})}}/>
                <input type="button" value="Update the blog" onClick={changeUpdateStatus}/>
                {updateBlog()}
            </div>
            <br />
            <div className="deleteTab">
                <span>Enter which blog to delete </span>
                <input type="number" onChange={(e) => {setDeleteIndex(blogs[e.target.value-1].id)}}/>
                <input type="button" value="Delete the blog" onClick={handleDeleteBlog} />
            </div>
        </div>
        <div className="Utility">
            
            { blogs.map(blog =>( <> <br /> <BlogCard props={blog} /> <br /></>)) }


        </div>
    </feed>
    )
}

export default Feed;