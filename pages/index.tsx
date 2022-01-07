import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface People {
  first_name: string,
  last_name: string,
  age: number,
  date_of_birth: string
}

const Home: NextPage = () => {
  const [people, setPeople] = useState({} as People)

  useEffect(() => {
    async function getPeople() {
      const response = await axios.get('http://www.localhost:8000/people/')
      console.log(response)
      setPeople(response.data.results[0])
    }
    getPeople()
  }, [])
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <ul>
        <span>{people.first_name} {people.last_name}</span>
      </ul>
    </>
  )
}

export default Home
