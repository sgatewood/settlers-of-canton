// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { Party } from '@daml/types';
import { User } from '@daml.js/create-daml-app';
import { publicContext, userContext } from './App';
import ResourceList from './ResourceList';
import PlotList from './PlotList';
import DiceRoller from './DiceRoller';
import PlotCreator from './PlotCreator';
import SettlementUpgrader from './SettlementUpgrader';

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = userContext.useParty();
  const myUserResult = userContext.useStreamFetchByKeys(User.User, () => [username], [username]);
  const aliases = publicContext.useStreamQueries(User.Alias, () => [], []);
  const myUser = myUserResult.contracts[0]?.payload;
  const allUsers = userContext.useStreamQueries(User.User).contracts;
// USERS_END

  // Sorted list of users that are following the current user
  const followers = useMemo(() =>
    allUsers
    .map(user => user.payload)
    .filter(user => user.username !== username)
    .sort((x, y) => x.username.localeCompare(y.username)),
    [allUsers, username]);

  // Map to translate party identifiers to aliases.
  const partyToAlias = useMemo(() =>
    new Map<Party, string>(aliases.contracts.map(({payload}) => [payload.username, payload.alias])),
    [aliases]
  );
  const myUserName = aliases.loading ? 'loading ...' : partyToAlias.get(username) ?? username;

  // FOLLOW_BEGIN
  const ledger = userContext.useLedger();

  const follow = async (userToFollow: Party): Promise<boolean> => {
    try {
      await ledger.exerciseByKey(User.User.Follow, username, {userToFollow});
      return true;
    } catch (error) {
      alert(`Unknown error:\n${JSON.stringify(error)}`);
      return false;
    }
  }
  // FOLLOW_END

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
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
