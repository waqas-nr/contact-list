/*
  Tags Filter Component
*/

import React from 'react';

// Import Lodash
import map from 'lodash/map';

// Import SVG
import trash from '../../assets/trash.png'
import check from '../../assets/check.png'

type TagsFilterProps = {
  heading: string,
  tagType: string,
  selectedTags: string[],
  tags: string[],
  onChangeTags: (tag: string, method: string) => void,
  isSelected: (arr: string[], tag: string) => boolean,
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
                <img src={check} alt='checked' className="checked"/>
                <span onClick={() => onChangeTags(tag, 'remove')}>
                  <img src={trash} alt="Trash" />
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