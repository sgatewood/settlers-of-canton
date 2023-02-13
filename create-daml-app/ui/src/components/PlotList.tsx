import React from 'react'
import { List, ListItem, Icon } from 'semantic-ui-react';
import { Catan } from '@daml.js/create-daml-app';
import { userContext } from './App';
import Plot from './Plot';


const PlotList: React.FC = () => {
  const plotResult = userContext.useStreamQueries(Catan.Plot);

  return (
    <List relaxed>
      {plotResult.contracts.map(plot => {
        const {diceValues, resourceNames, weight, index} = plot.payload;
        return (
          <ListItem
            className='test-select-message-item'
            key={plot.contractId}>
            <Plot diceValues={diceValues} resourceNames={resourceNames} weight={parseInt(weight)} index={parseInt(index)}></Plot>
          </ListItem>
        );
      })}
    </List>
  );
};

export default PlotList;