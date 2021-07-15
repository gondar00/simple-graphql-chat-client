import gql from 'graphql-tag'

export default gql`
mutation createAlert(
    $author: ID!
    $text: String!
    ){
      createAlert(author: $author, text: $text) {
        author {
          name
        }
      }
    }
`
