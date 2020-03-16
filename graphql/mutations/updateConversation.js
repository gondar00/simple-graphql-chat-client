import gql from 'graphql-tag'

export default gql`
  mutation updateConversation(
    $id: String
    $participantIds: [ID!]!
  ) {
    updateConversation(
      id: $id
      participantIds: $participantIds
    ) {
      id
      name
      participants {
        id
        username
      }
      texts {
        id
        text
        createdAt
        author {
          id
          username
        }
      }
    }
  }
`
