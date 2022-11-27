const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => handleUsernameChange(target.value)}
      />
    </div>
    <div>
      password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => handlePasswordChange(target.value)}
      />
    </div>
    <button id="login-button" type="submit">
      login
    </button>
  </form>
)

export default LoginForm