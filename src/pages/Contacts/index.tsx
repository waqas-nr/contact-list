/*
  Contacts Page
*/
import React, { useEffect, useState } from 'react';

// Import lodash
import debounce from 'lodash/debounce';
import map from 'lodash/map';
import concat from 'lodash/concat';

// Import Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

// Import Components
import SideBar from '../../components/SideBar';
import Search from '../../components/Search';
import ContactList from '../../components/ContactList';
import BootstrapButton from '../../components/UI/Button';
import Checkbox from '../../components/UI/Checkbox';

// Import Utils
import {
  checkAuthToken,
  getAuthToken,
  parsedQuery,
  stringifyQuery,
} from '../../utils/functions';

const defaultArray: string[] = [];
const contactDefaultArray: any[] = [];
let searching: boolean = false;

const Contacts = () => {
  const [totalContacts, setTotalContacts] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [contacts, setContacts] = useState(contactDefaultArray);
  const [selectedContacts, setSelectedContacts] = useState(defaultArray);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const [contactsError, setContactsError] = useState(null);
  const [queryString, setQueryString] = useState('?returnTotalCount=true&count=10');
  const [search, setSearch] = useState('');

  useEffect(() =>{
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContacts = (query?: string) => {
    if (!checkAuthToken()) {
      const { access_token } = getAuthToken() || {};
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
      };

      fetch(`https://api-im.chatdaddy.tech/contacts${query || queryString}`, requestOptions)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await  response.json();

          //check for error response
          if(!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          const { totalCount, contacts: newContact, nextPage } = data || {};
          if (searching) {
            setContacts(newContact);
            searching = false;
            setIsSearching(false);
          } else {
            const updatedContact = concat(contacts, newContact);
            setContacts(updatedContact);
            setIsFetching(false);
          }
          setNextPage(nextPage);
          setTotalContacts(totalCount)
        }).catch(error => {
        setIsFetching(false);
        setIsSearching(false);
        setContactsError(error);
        console.error('There was an Error: ', error);
      });
    }
  }

  const handleSearch = (event: any) => {
    if (event && event.target) {
      const { target: { value } } = event;
      setSearch(value);
      const obj = parsedQuery(queryString);
      delete obj.q;
      if (value) {
        obj.q = value;
      }
      const q = `?${stringifyQuery(obj)}`;
      searching = true;
      setQueryString(q);
      setContacts(contactDefaultArray);
      setIsSearching(true);
      setIsSelectedAll(false);
      setSelectedContacts([]);
      setContactsError(null);
      debounceRequest(q);
    }
  }

  const submitFilter = (query: any) => {
  let q: any = parsedQuery(queryString);
    delete q.tags;
    delete q.notTags;
    delete q.minMessagesSent;
    delete q.maxMessagesSent;
    delete q.minMessagesRecv;
    delete q.maxMessagesRecv;
    q = `?${stringifyQuery(q)}`;
    if (query) {
      q = `${q}&${query}`
    }
    searching = true;
    setContacts(contactDefaultArray);
    setQueryString(q);
    setIsSearching(true);
    setIsSelectedAll(false);
    setSelectedContacts([]);
    setContactsError(null);
    fetchContacts(q);
  }

  const toggleSideBar = (event: any) => {
    const sidebarToggle = document.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
    }
  }

  const loadMore = () => {
    let q: any = parsedQuery(queryString);
    delete q.page;
    q.page = nextPage;
    q = `?${stringifyQuery(q)}`;
    fetchContacts(q);
  }

  const handleSelectAll = () => {
    if (isSelectedAll) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(map(contacts, (contact: any) => contact.id));
    }
    setIsSelectedAll(!isSelectedAll);
  };

  const handleCheckbox = (event: any) => {
    if (event && event.target) {
      const { id, checked } = event.target;
      if (!checked) {
        setSelectedContacts(selectedContacts.filter(item => item !== id));
      } else {
        setSelectedContacts([...selectedContacts, id]);
      }
    }
  };

  const debounceRequest = debounce(fetchContacts, 700);

  return (
    <div className="d-flex" id="wrapper">
      <SideBar
        totalContacts={totalContacts}
        submitFilter={submitFilter}
      />
      <div id="main-content-wrapper" className="bg-light">
        <div className="d-flex d-lg-block justify-content-between align-items-start bg-light">
          <BootstrapButton
            id="sidebarToggle"
            type="button"
            title={
              <FontAwesomeIcon icon={faFilter} />
            }
            className="btn btn-light collapse-btn"
            onClick={toggleSideBar}
          />
          <div className="d-flex justify-content-end justify-content-lg-between align-items-start bg-light">
            <h3 className="bolder-font">All Contacts ({totalContacts})</h3>
            <BootstrapButton
              type="button"
              title="+"
              bg="light-green-color"
              size="sm"
              className="ms-3 ms-lg-0"
            />
          </div>
        </div>
        <Search search={search} handleSearch={handleSearch}/>
        <div className="d-flex justify-content-between align-items-start bg-light mt-4">
          <Checkbox
            id="selectAll"
            type="checkbox"
            className="align-self-center me-4 checkbox"
            label="Select All"
            checked={isSelectedAll}
            onChange={handleSelectAll}
          />
          <BootstrapButton
            type="button"
            title="Export All"
            bg="light-green-color"
            size="sm"
          />
        </div>
        <ContactList
          isFetching={isFetching}
          isSearching={isSearching}
          totalContacts={totalContacts}
          contacts={contacts}
          contactsError={contactsError}
          handleCheckbox={handleCheckbox}
          selectedContacts={selectedContacts}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
}

export default Contacts;
