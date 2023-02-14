import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { userContext } from './App';
import { getInventoryKeyFor } from './Util';
import { Catan } from '@daml.js/create-daml-app';
import { QueryResult } from '@daml/ledger';

interface Award {
  resourceName: string
  number: number
}

interface Plot {
  diceValues: number[]
  resourceNames: string[]
  weight: number
}

function getRandomDiceValue(): number {
  return Math.floor(Math.random() * 6) + 1
}

function getRollValue(): number {
  return getRandomDiceValue() + getRandomDiceValue()
}

function getAwardsFor(rollValue: number, plots: Plot[]): Award[] {
  var awards: Award[] = []
  plots.forEach(plot => {
    plot.diceValues.forEach((diceValue, i) => {
      if(diceValue === rollValue) {
        awards.push({
          resourceName: plot.resourceNames[i],
          number: plot.weight
        })
      }
    })
  })
  return awards
}

function describeAward(award: Award): string {
  return `${award.number} x ${award.resourceName}`
}

function getPlotsFrom(queryResult: QueryResult<Catan.Plot, Catan.Plot.Key, string>): Plot[] {
  return queryResult.contracts.map(plot => {
    const {diceValues, resourceNames, weight} = plot.payload;
    return {
      diceValues: diceValues.map(e => parseInt(e)),
      resourceNames: resourceNames,
      weight: parseInt(weight)
    }
  })
}

const DiceRoller: React.FC = () => {
  const sender = userContext.useParty();
  const plotsQueryResult = userContext.useStreamQueries(Catan.Plot);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [lastRollDescription, setLastRollDescription] = React.useState("");
  const ledger = userContext.useLedger();
  const bankResult = userContext.useQuery(Catan.Bank)

  const bankReady = bankResult.contracts.length > 0

  const rollDice = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);

      const rollValue = getRollValue();
      const awards: Award[] = getAwardsFor(rollValue, getPlotsFrom(plotsQueryResult))
      const awardDescription = awards.length === 0 ? "nothing" : awards.map(describeAward)
      setLastRollDescription(`Rolled ${rollValue} -- Got ${awardDescription}`)
      
      const bankUsername = bankResult.contracts[0].payload.username 

      await ledger.exerciseByKey(Catan.Bank.ApplyDeltasToInventories, bankUsername, {
        player: sender,
        indices: awards.map((e, i) => i.toString()),
        inventoryKeys: awards.map(award => getInventoryKeyFor(sender, award.resourceName)),
        deltas: awards.map(award => award.number.toString())
      });
    } catch (error) {
      alert(`Could not roll dice:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={rollDice}>
      <strong>{lastRollDescription}</strong>
      <Button
        fluid
        className='test-select-message-send-button'
        type="submit"
        disabled={isSubmitting}
        loading={!bankReady || isSubmitting}
        content="Roll Dice"
      />
    </Form>
  );
};

export default DiceRoller;