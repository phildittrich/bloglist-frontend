const CreateBlog = ({handleCreate, blog, handleBlogChange}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input 
            type="text"
            value={blog.title}
            name="Title"
            onChange={({target}) => {handleBlogChange({...blog, title: target.value})}}
          />
        </div>
        <div>
          author:
          <input 
            type="text"
            value={blog.author}
            name="Author"
            onChange={({target}) => {handleBlogChange({...blog, author: target.value})}}
          />
        </div>
        <div>
          url:
          <input 
            type="text"
            value={blog.url}
            name="Url"
            onChange={({target}) => {handleBlogChange({...blog, url: target.value})}}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog