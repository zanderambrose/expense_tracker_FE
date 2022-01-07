import type { NextPage } from 'next'
import { useEffect } from 'react'
import axios from 'axios'


const Home: NextPage = () => {
  useEffect(() => {
    async function getPeople() {
      const response = await axios.get('http://www.localhost:8000/people/')
      console.log(response)
    }
    getPeople()
  }, [])
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
    </>
  )
}

export default Home
