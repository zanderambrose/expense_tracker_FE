import type { NextPage } from 'next'
import { useEffect } from 'react'


const Home: NextPage = () => {
  useEffect(() => {
    async function getPeople() {
      fetch('http://www.localhost:8000/people/').then((res) => res.json).then((data) => console.log(data))
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
