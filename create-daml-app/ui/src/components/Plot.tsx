import React from 'react'
import { List, ListItem, Icon, Container } from 'semantic-ui-react';
import { resourceToIcon } from './Util';

type Props = {
    diceValues: string[]
    resourceNames: string[]
    weight: number
    index: number
}

const Plot: React.FC<Props> = ({diceValues, resourceNames, weight, index}) => {

    const diceInfos = diceValues.map((e, i) => {
        const resourceName = resourceNames[i]
        return (
            <ListItem>
                <strong>{e} &rarr; <Icon className="resource-icon" name={resourceToIcon.get(resourceName)} /> {resourceName}</strong>
            </ListItem>
        )
    })

    const weightStars = Array(weight).fill(
        <Icon name="star outline" />
    )

  return (
    <Container className="plot">
        <List>
            <ListItem><u><h3>Settlement {index}</h3></u>{weightStars}</ListItem>
            {diceInfos}
        </List>
    </Container>
  );
};

export default Plot;