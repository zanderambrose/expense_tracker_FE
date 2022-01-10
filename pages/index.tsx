import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Person = {
  first_name: string,
  last_name: string,
  age: number,
  date_of_birth: string
}

const Home: NextPage = () => {
  const [people, setPeople] = useState<Array<Person>>([])

  useEffect(() => {
    async function getPeople() {
      const response = await axios.get('http://www.localhost:8000/people/')
      console.log(response.data)
      setPeople(response.data)
    }
    getPeople()
  }, [])

  function displayUsers() {
    return people.map((person) => {
      return <li className='list-disc' key={`${person.first_name} ${person.last_name}`}>{person.first_name}, {person.last_name}, was born on {person.date_of_birth} and is {person.age} years old.</li>
    })
  }

  const handleOnClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <div className='container mx-auto px-4'>
      <h1 className="text-3xl font-bold underline">All people</h1>
      <ul className='mb-8'>
        {displayUsers()}
      </ul>
      <h3 className='underline'>Add a person</h3>
      <form onSubmit={handleOnClick}>
        <label className='block' htmlFor='first_name'>First name:</label>
        <input type="text" name="first_name" id="first_name" className=' block border-2 border-black rounded' />
        <label className='block' htmlFor='last_name'>Last name:</label>
        <input type="text" name="last_name" id="last_name" className=' block border-2 border-black rounded' />
        <label className='block' htmlFor='date_of_birth'>Date of birth:</label>
        <input type='date' name="date_of_birth" id="date_of_birth" className=' block border-2 border-black rounded' />
        <label className='block' htmlFor='age'>Age:</label>
        <input type='number' name="age" id="age" className=' block border-2 border-black rounded' />
        <input className='h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800' type="submit" value="Add person" />
      </form>
    </div>
  )
}

export default Home
