import React from 'react'
import ReactDOM from 'react-dom/client'
import Feed from './Feed.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import BlogView from './BlogView.jsx'
import Update from './Update.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />
  },
  {
    path: "blog/:index",
    element: <BlogView />
  },
  {
    path: "update",
    element: <Update />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
