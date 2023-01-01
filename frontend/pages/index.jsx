import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Budget from '../src/components/inputs/Budget'
import InputField from '../src/components/inputs/InputField'
import DateInput from '../src/components/inputs/DateInput'
import FileUpload from '../src/components/inputs/FileUpload'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'

export default function Home() {
  const router = useRouter()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  let imageUrls = []

  const [formdata, setFormData] = useState({
    name: '',
    dailyBudget: '',
    totalBudget: '',
    campaignStartDate: startDate,
    campaignEndDate: endDate,
    imageList: [],
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formdata,
      [name]: value,
      campaignStartDate: startDate,
      campaignEndDate: endDate,
    })
    // imageUrls = [...imageList.data_url]
    console.log(formdata, 'THE FORM DATA')
    console.log(imageUrls, 'THE URLS')
  }

  //Make API CALL ON FORM SUBMIT

  const onSubmit = async () => {
    setFormData({
      ...formdata,
      imageList: images,
    })
    console.log(formdata, 'THE SUBMITTED')
    try {
      const res = await axios.post(
        'http://localhost:5000/api/campaign/create',
        {
          ...formdata,
        },
      )

      //Empty all states
      setFormData({
        name: '',
        dailyBudget: '',
        totalBudget: '',
        campaignStartDate: '',
        campaignEndDate: '',
        imageList: [],
      })

      toast.success('Campaign Created Successfully.')
      setTimeout(() => {
        router.push('/campaigns')
      }, 3000)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <title>Advertising Campaign</title>
        <meta name="description" content="Generated by create React app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="w-full flex flex-col justify-center md:w-3/4">
          <h1 className="text-3xl mb-10 font-bold underline">
            Advertising Campaign
          </h1>

          <InputField onChange={onChangeHandler} title="Name" />
          <div className="my-5">
            <label className="mb-10 font-bold">Select Campaign Date</label>
            <DateInput
              startDate={startDate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              endDate={endDate}
            />
          </div>

          <div className="my-5">
            <Budget
              onChange={onChangeHandler}
              name="totalBudget"
              title="Total Budget"
            />
          </div>

          <Budget
            name="dailyBudget"
            title="Daily Budget"
            onChange={onChangeHandler}
          />
          <div className="mt-5">
            <p className="font-bold mb-4">Upload Campaign Images</p>
            <FileUpload
              setFormData={setFormData}
              formData={formdata}
              images={images}
              setImages={setImages}
            />
          </div>

          <div className="flex justify-center items-center w-full text-center">
            {loading ? (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#000"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              <button
                onClick={onSubmit}
                type="button"
                className="inline-flex w-60 text-center mt-5 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  )
}