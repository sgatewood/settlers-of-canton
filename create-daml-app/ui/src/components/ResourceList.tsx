import React from 'react'
import { List, ListItem, Icon } from 'semantic-ui-react';
import { Catan } from '@daml.js/create-daml-app';
import { userContext } from './App';

const resourceToIcon = new Map()

resourceToIcon.set("lumber", "tree")
resourceToIcon.set("brick", "block layout")
resourceToIcon.set("wool", "cloudversify")
resourceToIcon.set("grain", "food")
resourceToIcon.set("ore", "fire")

const MessageList: React.FC = () => {
  const inventoryResult = userContext.useStreamQueries(Catan.Inventory);

  return (
    <List relaxed>
      {inventoryResult.contracts.map(inventory => {
        const {bank, player, resourceName, number} = inventory.payload;
        return (
          <ListItem
            className='test-select-message-item'
            key={inventory.contractId}>
            <Icon className="resource-icon" name={resourceToIcon.get(resourceName)} /><strong>{number} {resourceName}</strong>
          </ListItem>
        );
      })}
    </List>
  );
};

export default MessageList;