import { Head } from '@redwoodjs/web'
import { useState } from 'react'
import SearchBar from '../../components/Marketplace/SearchBar/SearchBar'
import FilterButton from '../../components/Marketplace/FilterButton/FilterButton'


const Marketplace = () => {

	const [searchValue, setSearchValue] = useState();

  return (
    <>
      <Head>
        <title>Treasure Chess | Marketplace</title>
      </Head>
			<h1 className="font-bold">Treasure Chess Marketplace</h1>
			<SearchBar value={searchValue} changeHandler={setSearchValue}/>
      {/* TODO: remaining home page content */}
    </>
  )
}

export default Marketplace
