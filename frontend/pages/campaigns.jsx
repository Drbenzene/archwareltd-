import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Link from 'next/link'
import { ThreeDots } from 'react-loader-spinner'

const tableHeader = [
  { id: 1, title: 'Name' },
  { id: 2, title: 'Total Budget' },
  { id: 3, title: 'Daily Budget' },
  { id: 4, title: 'Start Date' },
  { id: 5, title: 'End Date' },
  { id: 6, title: ' Campaign Images' },
]

function campaigns() {
  const [campaigns, setCampaigns] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCampaigns = async () => {
    setLoading(true)
    const { data } = await axios.get(
      'https://archwareltd-apii.onrender.com/api/campaign/all',
    )
    setCampaigns(data.campaigns)
    setLoading(false)
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  return (
    <div className={styles.main}>
      <div className="flex flex-col bg-white">
        <div className="justify-end items-center flex">
          <Link href="/">
            <button className=" my-5 mr-5 text-center cursor-pointer p-5 text-white bg-black rounded">
              Create New Campaign
            </button>
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <ThreeDots
              height="150"
              width="150"
              radius="9"
              color="#000"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        )}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {tableHeader.map((header) => (
                      <>
                        <th
                          key={header.id}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header.title}
                        </th>
                      </>
                    ))}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns &&
                    campaigns.map((campaign, i) => (
                      <tr key={campaign.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {campaign.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $ {campaign.totalBudget}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $ {campaign.dailyBudget}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.startDate.slice(
                            0,
                            campaign.startDate.lastIndexOf('T'),
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.endDate.slice(
                            0,
                            campaign.endDate.lastIndexOf('T'),
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {campaign.campaignImages.map((image, i) => (
                            <div key={i}>
                              <img
                                src={image.data_url || image}
                                alt={campaign.name}
                                width="100px"
                                height="100px"
                              />
                            </div>
                          ))}
                        </td>
                        <td className="px-6 bg-black rounded text-white  border py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#">Edit</a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default campaigns
