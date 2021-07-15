import Avatar from './ui/Avatar'
import { Mutation } from 'react-apollo'

import CREATE_REPORT_MUTATION from '../graphql/mutations/createReport'

const getReportBtn = (data, createReport, authorId) => {
  console.log(data)
  if (data && data.createReport.id) {
    return (
      <span key={data.createReport.id} className='ml-2 text-red text-xs cursor-pointer'>(reported!)</span>
    )
  }

  return (
    <span onClick={() => createReport({
      variables: {
        author: authorId,
      }
    })} className='ml-2 text-red text-xs cursor-pointer'>(report)</span>
  )
}
export default ({ direction, text, author, authorId }) => (
  <div
    style={{
      transform: direction === 'incoming' && 'scaleX(-1)'
    }}
  >
    <div className='flex justify-end my-4'>
      <div className='flex items-end justify-end md:w-3/5 lg:2/5'>
        <div className='mr-3'>
          <div
            className='text-xs text-grey mb-1 mx-3'
            style={{
              transform: direction === 'incoming' && 'scaleX(-1)'
            }}
          >
            {author}
            <Mutation mutation={CREATE_REPORT_MUTATION}>
              {(createReport, { loading, error, data }) => getReportBtn(data, createReport, authorId)}
            </Mutation>
          </div>
          <div
            className={[
              'p-3 py-2 leading-normal text-sm',
              direction === 'incoming'
                ? 'bg-grey-lighter'
                : 'gradient-primary text-white'
            ].join(' ')}
            style={{
              borderRadius: 10,
              transform: direction === 'incoming' && 'scaleX(-1)'
            }}
          >
            {text}
          </div>
        </div>
        <div className='mr-2'>
          <Avatar
            initials={author}
            style={{
              transform: direction === 'incoming' && 'scaleX(-1)'
            }}
          />
        </div>
      </div>
    </div>
  </div>
)
