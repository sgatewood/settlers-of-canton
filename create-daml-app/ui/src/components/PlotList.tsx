import React from 'react'
import { List, ListItem } from 'semantic-ui-react';
import { Catan } from '@daml.js/create-daml-app';
import { userContext } from './App';
import Plot from './Plot';


const PlotList: React.FC = () => {
  const plotResult = userContext.useStreamQueries(Catan.Plot);
  
  const totalVictoryPoints = plotResult.contracts.map(plot => plot.payload.weight).map(weight => parseInt(weight)).reduce((a, b) => a + b, 0)

  return (
    <List relaxed>
        <ListItem
        className='test-select-message-item'
        key="score">
        <strong>Victory points: {totalVictoryPoints}</strong>
        </ListItem>
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