import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
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
      return <li key={`${person.first_name} ${person.last_name}`}>{person.first_name}, {person.last_name}, was born on {person.date_of_birth} and is {person.age} years old.</li>
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <ul>
        {displayUsers()}
      </ul>
    </div>
  )
}

export default Home
