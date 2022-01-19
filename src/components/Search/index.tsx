/*
  Search Component
*/

import React, {ChangeEvent} from 'react';

// Import UI Component
import Input from '../UI/Input';

// Import PNG
import SearchImage from '../../assets/search.png'

type SearchProps = {
  search: string,
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void,
}

const Search = ({ search, handleSearch }: SearchProps) => {

  return (
    <div id="search" className="d-flex mt-4">
      <img src={SearchImage} alt="Search" />
      <Input id="contacts-filters" type="text" placeholder="Search contacts" value={search} onChange={handleSearch} />
    </div>
  )
}

export default Search;