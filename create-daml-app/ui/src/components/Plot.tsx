import React from 'react'
import { List, ListItem, Icon, Container } from 'semantic-ui-react';
import { resourceToIcon } from './App';

type Props = {
    diceValues: string[]
    resourceNames: string[]
    weight: number
}

const Plot: React.FC<Props> = ({diceValues, resourceNames, weight}) => {

    const diceInfos = diceValues.map((e, i) => {
        const resourceName = resourceNames[i]
        return (
            <ListItem>
                <strong>{e} &rarr; <Icon className="resource-icon" name={resourceToIcon.get(resourceName)} /> {resourceName}</strong>
            </ListItem>
        )
    })

  return (
    <Container className="plot">
        <List>
            <ListItem><strong>Weight: {weight}</strong></ListItem>
            {diceInfos}
        </List>
    </Container>
  );
};

export default Plot;