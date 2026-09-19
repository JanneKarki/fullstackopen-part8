import { useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const client = useApolloClient()

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      client.resetStore()
      setPage('authors')
    },
    onError: (error) => {
      setError(`login failed: ${error.message}`)
    },
  })

  if (!show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
