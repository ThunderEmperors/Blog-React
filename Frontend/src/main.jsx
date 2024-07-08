import React from 'react'
import ReactDOM from 'react-dom/client'
import Feed from './Feed.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import BlogView from './BlogView.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />
  },
  {
    path: "blog/:index",
    element: <BlogView />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
