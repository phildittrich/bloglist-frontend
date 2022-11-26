import { useState } from 'react'

const Blog = ({blog, update}) => {
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
  }

  const addLike = () => () => {
    const updateObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user ? blog.user.id : null,
      likes: blog.likes + 1
    }
    
    update(blog.id, updateObject)
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
        {blog.likes} <button onClick={addLike()}>like</button><br />
        {blog.user && blog.user.name}
      </div>
    </div>
  )
}

export default Blog