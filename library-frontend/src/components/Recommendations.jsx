import { useQuery } from '@apollo/client/react'
import { BOOKS_BY_GENRE, ME } from '../queries'

const Recommendations = (props) => {
  const meResult = useQuery(ME)

  const favoriteGenre = meResult.data?.me?.favoriteGenre

  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  })

  if (!props.show) {
    return null
  }

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data ? booksResult.data.allBooks : []

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
