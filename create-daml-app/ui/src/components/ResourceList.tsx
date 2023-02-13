import React from 'react'
import { List, ListItem, Icon } from 'semantic-ui-react';
import { Catan } from '@daml.js/create-daml-app';
import { userContext } from './App';
import { resourceToIcon } from './Util';

const MessageList: React.FC = () => {
  const inventoryResult = userContext.useStreamQueries(Catan.Inventory);

  return (
    <List relaxed>
      {inventoryResult.contracts.map(inventory => {
        const {resourceName, number} = inventory.payload;
        return (
          <ListItem
            className='test-select-message-item'
            key={resourceName}>
            <Icon className="resource-icon" name={resourceToIcon.get(resourceName)} /><strong>{number} {resourceName}</strong>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MessageList;