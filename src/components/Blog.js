import { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    console.log(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>
          {visible ?
            'hide' :
            'show' 
          }
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br />
        {blog.likes}<br />
        {blog.user && blog.user.name}
      </div>
    </div>
  )
}

export default Blog