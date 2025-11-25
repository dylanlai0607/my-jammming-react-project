import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchResults from '../components/SearchResults'
import SearchBar from '../components/SearchBar'

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <SearchResults searchTerm={searchTerm} />

    </>
  )
}

export default App
