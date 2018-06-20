import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

const makeTags = (e) => {
  return e.map((label, i) => {
      return (
          <Label as="a" href={`/tag/${label}`} key={label+ i} size="big">
              <Icon name='hashtag' /> {label}
          </Label>
      )
  })
}

export default makeTags;