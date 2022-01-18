/*
  Tags Filter Component
*/

import React from 'react';

// Import Bootstrap Component
import Badge from 'react-bootstrap/Badge';

// Import Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

// Import Lodash
import map from 'lodash/map';

type TagsFilterProps = {
  heading: string,
  tagType: string,
  selectedTags: string[],
  tags: any[],
  onChangeTags: any,
  isSelected: any,
}

const TagsFilter = ({ tagType, heading, tags, selectedTags, isSelected, onChangeTags }: TagsFilterProps) => {
  return (
    <div className="tags mb-4">
      <h6>{heading}</h6>
      <div>
        {map(tags, tag => (
          <div key={`${tagType}-${tag}`} className="d-flex justify-content-between">
            <p onClick={() => onChangeTags(tag, 'add')}>
              {tag}
            </p>
            {isSelected(selectedTags, tag) && (
              <>
                <Badge className="mt-2 mb-2" bg="light-green-color" pill>
                  <FontAwesomeIcon icon={faCheck} />
                </Badge>
                <span onClick={() => onChangeTags(tag, 'remove')}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagsFilter;