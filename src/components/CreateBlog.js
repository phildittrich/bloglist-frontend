import { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleCreate = async event => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            id="blog-title"
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) => {setNewBlog({ ...newBlog, title: target.value })}}
          />
        </div>
        <div>
          author:
          <input
            id="blog-author"
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) => {setNewBlog({ ...newBlog, author: target.value })}}
          />
        </div>
        <div>
          url:
          <input
            id="blog-url"
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) => {setNewBlog({ ...newBlog, url: target.value })}}
          />
        </div>
        <button id="blog-create" type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog