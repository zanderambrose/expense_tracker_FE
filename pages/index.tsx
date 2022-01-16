import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetFetcher } from '../util/fetcher'
import { Person } from '../types'

const Home: NextPage = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<string>('')
  const [age, setAge] = useState<number>(0)
  const { people, isLoading, isError } = useGetFetcher()

  function displayUsers() {
    if (people && people.length > 0) {
      return people.map((person: Person) => {
        const { first_name, last_name, date_of_birth, age, id } = person
        return (
          <div key={`${first_name} ${last_name}`}>
            <li>{first_name}, {last_name}, was born on {date_of_birth} and is {age} years old.</li>
            <button onClick={() => handleDelete(id)} className='text-black bg-red-500 hover:bg-red-700 rounded py-2 px-5 border'>Delete person</button>
          </div>
        )
      })
    } if (isError) {
      return <div>No people right now.</div>
    } else if (isLoading) {
      return <div>Loading...</div>
    }
  }

  const handleOnClick = async (e: any) => {
    e.preventDefault()
    const response = await axios.post('http://www.localhost:8000/people/', {
      firstName,
      lastName,
      dateOfBirth,
      age
    })
    console.log(response)
    setFirstName('')
    setLastName('')
    setDateOfBirth('')
    setAge(0)
  }

  const handleDelete = async (personId: number) => {
    const response = await axios.delete(`http://www.localhost:8000/people/${personId}`)
    console.log(response)
  }

  return (
    <div className='container mx-auto px-4'>
      <h1 className="text-3xl font-bold underline">All people</h1>
      <ul className='mb-8 list-disc list-inside'>
        {displayUsers()}
      </ul>
      <h3 className='underline'>Add a person</h3>
      <form onSubmit={handleOnClick}>
        <div className='flex flex-col mb-4'>
          <label className='mb-2 uppercase font-bold text-lg text-grey-darkest' htmlFor='first_name'>First name:</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="first_name" id="first_name" className='border py-2 px-3 text-grey-darkest' />
        </div>
        <div className='flex flex-col mb-4'>
          <label className='mb-2 uppercase font-bold text-lg text-grey-darkest' htmlFor='last_name'>Last name:</label>
          <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" name="last_name" id="last_name" className='border py-2 px-3 text-grey-darkest' />
        </div>
        <div className='flex flex-col mb-4'>
          <label className='mb-2 uppercase font-bold text-lg text-grey-darkest' htmlFor='date_of_birth'>Date of birth:</label>
          <input onChange={(e) => setDateOfBirth(e.target.value)} value={dateOfBirth} type='date' name="date_of_birth" id="date_of_birth" className='border py-2 px-3 text-grey-darkest' />
        </div>
        <div className='flex flex-col mb-4'>
          <label className='mb-2 uppercase font-bold text-lg text-grey-darkest' htmlFor='age'>Age:</label>
          <input onChange={(e) => setAge(parseInt(e.target.value))} value={age} type='number' name="age" id="age" className='border py-2 px-3 text-grey-darkest' />
        </div>
        <input className='h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800' type="submit" value="Add person" />
      </form>
    </div>
  )
}

export default Home
