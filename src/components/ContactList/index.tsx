/*
  Contact List Component
*/

import React, {ChangeEvent} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Import React Bootstrap Component
import ListGroup from 'react-bootstrap/ListGroup';

// Import Lodash
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import includes from 'lodash/includes';

// Import Component
import Loader from '../Loader';
import Tags from '../Tags';
import Avatar from '../Avatar';
import BootstrapButton from '../UI/Button';
import Checkbox from '../UI/Checkbox';

type ContactListProps = {
  isFetching: boolean,
  isSearching: boolean,
  totalContacts: number,
  contacts: object[],
  selectedContacts: string[],
  contactsError: string | null,
  loadMore: () => void,
  handleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void,
}

interface keyable {
  [key: string]: any
}

const ContactList = ({
  isFetching,
  isSearching,
  totalContacts,
  contacts,
  contactsError,
  selectedContacts,
  loadMore,
  handleCheckbox,
}: ContactListProps) => {
  return (
    <>
      {!isFetching && !isSearching && !isEmpty(contacts) && (
        <ListGroup id="scrollable-contact" className="mt-3 contacts" variant="flush">
          <InfiniteScroll
            dataLength={contacts.length}
            next={loadMore}
            hasChildren={true}
            hasMore={totalContacts > contacts.length}
            scrollableTarget="scrollable-contact"
            loader={
              <div className="d-flex justify-content-center min-height-25vh">
                <Loader title="Loading..."/>
              </div>
            }
            endMessage={
              <p className="text-center mt-5 mb-5 w-100">
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {map(contacts, (contact: keyable) => (
              <ListGroup.Item
                key={contact.id}
                as="li"
                className="d-flex justify-content-between align-items-start bg-light ps-0 pe-0"
              >
                <Checkbox
                  type="checkbox"
                  className="align-self-center me-4 checkbox"
                  id={contact.id}
                  checked={includes(selectedContacts, contact.id)}
                  onChange={handleCheckbox}
                />
                <Avatar  id={contact.id} accountId={contact.accountId} />
                <div className="ms-3 mt-2 me-auto">
                  <div className="fw-bold mb-2">{contact.name}</div>
                  <span className="text-color">{contact.phoneNumber}</span>
                </div>
                {!isEmpty(contact.tags) &&
                map(contact.tags, tag => (
                  <Tags
                    key={`${contact.id}-${tag.name}`}
                    bg="light-green-color"
                    pill={false}
                    children={tag.name}
                    className="mt-4 ms-1 me-1 round-badge"
                  />
                ))
                }
                <BootstrapButton
                  type="button"
                  title="+"
                  bg="light-green-color"
                  size="sm"
                  className="mt-4 round-xs-btn"
                />
              </ListGroup.Item>
            ))}
          </InfiniteScroll>
        </ListGroup>
      )}
      {!isFetching && !isSearching && isEmpty(contacts) && (
        <div className="d-flex align-items-center justify-content-center mt-1 contacts">
          <p>No Contacts</p>
        </div>
      )}
      {!isFetching && !isSearching && contactsError && (
        <div className="d-flex align-items-center justify-content-center mt-1 contacts">
          <p>{contactsError}</p>
        </div>
      )}
      {(isFetching || isSearching) && (
        <Loader className="min-height-100vh" />
      )}
    </>
  )
}

export default ContactList;