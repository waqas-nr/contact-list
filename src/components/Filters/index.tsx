/*
  Filters Component
*/

import React, { useEffect, useState } from 'react';

// Import Lodash
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import remove from 'lodash/remove';
import difference from 'lodash/difference';
import map from 'lodash/map';

// Import Loader
import Loader from '../Loader';

// Import Filter Component
import IncludeTags from './tags';
import ExcludeTags from './tags';
import MessageSent from './messageSent';
import MessageReceived from './messageRecieved';
import Button from '../UI/Button';

// Import Utils
import { checkAuthToken, getAuthToken, stringifyQuery } from '../../utils/functions';

type FiltersProps = {
  submitFilter: (query: string) => void,
}

type handleInputChangeParams = {
  event: any,
  field: string,
}

type onChangeTagsParams = {
  value: string,
  tagType: string,
  method: string,
}

const filters: any = {};

const Filters = ({ submitFilter }: FiltersProps) => {
  const defaultArray: string[] = [];
  const [isFetching, setIsFetching] = useState(false);
  const [tags, setTags] = useState(defaultArray);
  const [includedTags, setIncludedTags] = useState(defaultArray);
  const [excludedTags, setExcludedTags] = useState(defaultArray);
  const [messageSentMin, setMessageSentMin] = useState('');
  const [messageSentMax, setMessageSentMax] = useState('');
  const [messageReceivedMin, setMessageReceivedMin] = useState('');
  const [messageReceivedMax, setMessageReceivedMax] = useState('');

  useEffect(() => {
    if (!checkAuthToken()) {
      setIsFetching(true);
      const { access_token } = getAuthToken() || {};
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
      };

      fetch(`https://api-im.chatdaddy.tech/tags`, requestOptions)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await  response.json();

          //check for error response
          if(!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          const { tags } = data || {};
          const tagNames = map(tags, (tag: any ) => tag.name)
          setIsFetching(false);
          setTags(tagNames);
        }).catch(error => {
        setIsFetching(false);
        console.error('There was an Error: ', error);
      });
    }
  }, [])

  const handleInputChange = ({event, field }: handleInputChangeParams) =>{
    if (event && event.target) {
      const { value } = event.target || {};
      if (field === 'messageSentMin') {
        setMessageSentMin(value);
        value ? filters.minMessagesSent = value : delete filters.minMessagesSent;
      } else if (field === 'messageSentMax') {
        setMessageSentMax(value);
        value ? filters.maxMessagesSent = value : delete filters.maxMessagesSent;
      } else if (field === 'messageReceivedMin') {
        setMessageReceivedMin(value);
        value ? filters.minMessagesRecv = value : delete filters.minMessagesRecv;
      } else if (field === 'messageReceivedMax') {
        setMessageReceivedMax(value);
        value ? filters.maxMessagesRecv = value : delete filters.maxMessagesRecv;
      }
    }
  }

  const onChangeTags = ({value, tagType, method }: onChangeTagsParams) => {
    let arr: string[] = [];
    let keyName: string = '';
    let callback;
    if (tagType === 'includedTags') {
      arr = [...includedTags];
      keyName = 'tags';
      callback = setIncludedTags;
    } else if (tagType === 'excludedTags') {
      arr = [...excludedTags]
      keyName = 'notTags';
      callback = setExcludedTags;
    }
    if (method === 'remove') {
      remove(arr, a => a === value);
      if (callback) {
        callback(arr);
      }
    } else if (method === 'add') {
      if (!isSelected(arr, value)) {
        arr.push(value);
        if (callback) {
          callback(arr);
        }
      }
    }
    !isEmpty(arr) && keyName ? filters[keyName] = JSON.stringify(arr) : delete filters[keyName];
  }

  const isSelected = (array: string[], value: string) => {
    return includes(array, value);
  }

  const extractTags = (arr: string[]) => {
    return difference(tags, arr);
  }

  const submitFilters = () => {
    submitFilter(stringifyQuery(filters));
  }

  return(
    <div className="filters">
      {!isFetching && !isEmpty(tags) && (
        <>
          <IncludeTags
            heading="Include Tags:"
            tagType="included-tags"
            tags={extractTags(excludedTags)}
            isSelected={isSelected}
            selectedTags={includedTags}
            onChangeTags={
              (value: string, method: string) =>
                onChangeTags({value, tagType: 'includedTags', method})
            }
          />
          <ExcludeTags
            heading="Exclude Tags:"
            tagType="excluded-tags"
            tags={extractTags(includedTags)}
            isSelected={isSelected}
            selectedTags={excludedTags}
            onChangeTags={
              (value: string, method: string) =>
                onChangeTags({ value, tagType: 'excludedTags', method })
            }
          />
        </>
      )}
      {isFetching && (
        <Loader className="min-height-50vh" />
      )}
      <MessageSent
        messageSentMin={messageSentMin}
        messageSentMax={messageSentMax}
        handleInputChange={handleInputChange}
      />
      <MessageReceived
        messageSentMin={messageReceivedMin}
        messageSentMax={messageReceivedMax}
        handleInputChange={handleInputChange}
      />
      <Button
        type="button"
        title="Save Filters"
        bg="light-green-color"
        onClick={submitFilters}
      />
    </div>
  )
}

export default Filters;