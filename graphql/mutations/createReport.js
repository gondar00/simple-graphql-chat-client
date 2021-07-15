import gql from 'graphql-tag'

export default gql`
mutation createReport(
    $author: ID!
    ){
       createReport(author: $author) {
        id
      }
    }
`
