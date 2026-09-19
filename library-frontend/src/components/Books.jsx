import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const allBooksResult = useQuery(ALL_BOOKS)

  const booksByGenreResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  if (!props.show) {
    return null
  }

  if (allBooksResult.loading) {
    return <div>loading...</div>
  }

  const allBooks = allBooksResult.data.allBooks

  const genres = [...new Set(allBooks.flatMap((b) => b.genres))]

  const books = genre
    ? booksByGenreResult.data
      ? booksByGenreResult.data.allBooks
      : []
    : allBooks

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}

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

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
