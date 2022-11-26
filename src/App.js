import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const createBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({ text: 'wrong username or password', success: false })
      setTimeout(() => {
        setErrorMessage({})
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
  }

  const addBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject)
      createBlogRef.current.toggleVisibility()
      setBlogs(blogs.concat(savedBlog))
      setErrorMessage({ text: `a new blog ${savedBlog.title} by ${savedBlog.author} has been added`, success: true })
      setTimeout(() => {
        setErrorMessage({})
      }, 5000)
    } catch (exception) {
      setErrorMessage({ text: 'an error occured', success: false })
      setTimeout(() => {
        setErrorMessage({})
      }, 5000)
    }
  }

  const updateBlog = async (id, updateObject) => {
    try {
      const savedBlog = await blogService.update(id, updateObject)
      setBlogs(blogs.map(b => b.id !== id ? b : savedBlog))
      setErrorMessage({ text: `a like has been added to ${savedBlog.title} by ${savedBlog.author}`, success: true })
      setTimeout(() => {
        setErrorMessage({})
      }, 5000)
    } catch (exception) {
      setErrorMessage({ text: 'an error occured', success: false })
      setTimeout(() => {
        setErrorMessage({})
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={setUsername}
        handlePasswordChange={setPassword}
        username={username}
        password={password}
      />
    )
  }

  if(user === null) {
    return (
      <div>
        <Notification message={errorMessage} />

        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />

      <h2>blogs</h2>

      <p>
        {user.name} is logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new note" ref={createBlogRef}>
        <CreateBlog createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} update={updateBlog}/>
      )}
    </div>
  )
}

export default App
