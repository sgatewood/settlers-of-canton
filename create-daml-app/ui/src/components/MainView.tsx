// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { Container, Grid, Header, Segment, Divider } from 'semantic-ui-react';
import { Party } from '@daml/types';
import { User } from '@daml.js/create-daml-app';
import { publicContext, userContext } from './App';
import ResourceList from './ResourceList';
import PlotList from './PlotList';
import DiceRoller from './DiceRoller';
import PlotCreator from './SettlementCreator';
import SettlementUpgrader from './SettlementUpgrader';
import ResourceTrader from './ResourceTrader';

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = userContext.useParty();
  const aliases = publicContext.useStreamQueries(User.Alias, () => [], []);
// USERS_END

  // Map to translate party identifiers to aliases.
  const partyToAlias = useMemo(() =>
    new Map<Party, string>(aliases.contracts.map(({payload}) => [payload.username, payload.alias])),
    [aliases]
  );
  const myUserName = aliases.loading ? 'loading ...' : partyToAlias.get(username) ?? username;

  return (
    <Container>
      <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                {myUserName ? 'SETTLERS OF CANTON' : 'Loading...'}
            </Header>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as='h2'>
                <Header.Content>
                  Plots
                </Header.Content>
              </Header>
              <Divider />
              <PlotList />
            </Segment>
            <Segment>
              <Header as='h2'>
                <Header.Content>
                  Resources
                </Header.Content>
              </Header>
              <Divider />
              <ResourceList />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h2'>
                <Header.Content>
                  Controls
                </Header.Content>
              </Header>
              <Divider />
              <DiceRoller />
              <Divider />
              <PlotCreator />
              <Divider />
              <SettlementUpgrader />
              <Divider />
              <ResourceTrader />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
