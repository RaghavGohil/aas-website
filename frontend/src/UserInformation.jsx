import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TestContext } from './TestContext'

export default function UserInformation(){
  const [age, setAge] = useState('')
  const [location, setLocation] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const navigate = useNavigate()
  const {submitUserInformation} = useContext(TestContext)

  // Dropdown options for age and location
  const ageOptions = [
    { label: '10-12 years', value: '10-12' },
    { label: '12-15 years', value: '12-15' },
    { label: '7-10 years', value: '7-10' },
    { label: '5-7 years', value: '5-7' },
    { label: '15-18 years', value: '15-18' },
    { label: 'Less than 5 years', value: 'less-than-5' },
  ]

  const locationOptions = [
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Maharashtra', value: 'Maharashtra' },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Simulate the form submission (e.g., sending data to an API)
    await submitUserInformation({ age, location },()=>{
      setSubmitted(true) // Mark as submitted
      navigate('/test/attempt')
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl text-center font-bold">Submit Your Information</h1>
        </div>
        <div className="space-y-6">
          <p className="text-center text-lg">
            Please fill out the form to submit your age group and location.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="block text-xl font-semibold">Select Age Group:</label>
                <select
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>Select an age group</option>
                  {ageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-xl font-semibold">Select Location:</label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>Select a location</option>
                  {locationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Submit
              </button>
            </div>
          </form>

          {submitted && (
            <div className="mt-6 text-green-600">
              <h4 className="text-xl font-semibold">Form Submitted!</h4>
              <p>Age Group: {age}</p>
              <p>Location: {location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}