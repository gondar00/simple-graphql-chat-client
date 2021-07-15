import React from 'react'
import moment from 'moment'
import { withApollo } from 'react-apollo';

const getContent = (item) => {
  return (
    <tr key={item.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {item.author.name || 'NA'}
            </div>
            <div className="text-sm text-gray-500">
            {item.author.username}
                          </div>
          </div>  
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {item.text}
            </div>
          </div>  
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {item.author.reports > 3 ? 'Inactive': 'Active'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{moment(item.createdAt).format("MMM Do YY")}</div>
        {/* <div className="text-sm text-gray-500">Optimization</div> */}
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Enter</a>
      </td> */}
    </tr>
  )
}
const Signup = ({ client, data }) => {
  console.log(data)
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Words
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At  
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.alerts.length === 0 && <div>No Alerts</div>}
                {data.alerts.length > 0 && data.alerts.map(alert => getContent(alert))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withApollo(Signup)
