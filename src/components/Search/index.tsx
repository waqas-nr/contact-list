/*
  Search Component
*/

import React from 'react';

// Import Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Import UI Component
import Input from '../UI/Input';

type SearchProps = {
  search: string,
  handleSearch: any,
}

const Search = ({ search, handleSearch }: SearchProps) => {

  return (
    <div id="search" className="d-flex mt-4">
      <FontAwesomeIcon icon={faSearch} />
      <Input id="contacts-filters" type="text" placeholder="Search contacts" value={search} onChange={handleSearch} />
    </div>
  )
}

export default Search;