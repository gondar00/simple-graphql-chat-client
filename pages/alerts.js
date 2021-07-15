import AlertsTable from '../components/AlertsTable'
import gql from 'graphql-tag'
import { Query, ApolloConsumer } from 'react-apollo'


const ME = gql`
  query alerts {
    alerts {
      id
      text
      createdAt
      author {
        name
        username
        reports
      }
    }
  }
`
export default class SignupPage extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <ApolloConsumer>
      {client => (
        <Query query={ME}>
          {({ loading, error, data }) => (
            <>
              <div className='flex flex-col justify-center items-center h-screen'>
                  <AlertsTable data={data} />
              </div>
            </>
          )}
        </Query>
      )}
    </ApolloConsumer>
    )
  }
}
