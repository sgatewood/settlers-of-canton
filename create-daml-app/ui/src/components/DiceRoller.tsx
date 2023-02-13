import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { Party } from '@daml/types';
import { User } from '@daml.js/create-daml-app';
import { userContext, getInventoryKeyFor } from './App';
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

function getPlotsFrom(queryResult: QueryResult<Catan.Plot, undefined, string>): Plot[] {
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
  const ledger = userContext.useLedger();

  const submitMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);

      const rollValue = getRollValue();
      const awards: Award[] = getAwardsFor(rollValue, getPlotsFrom(plotsQueryResult))
      const awardDescription = awards.length === 0 ? "nothing" : awards.map(describeAward)
      alert(`Rolled ${rollValue} -- Got ${awardDescription}`)
      
      for (var i = 0; i < awards.length; i++) {
        const award = awards[i]
        const inventoryKey = getInventoryKeyFor(sender, award.resourceName)
        await ledger.exerciseByKey(Catan.Inventory.ApplyDelta, inventoryKey, {delta: award.number.toString()});
      }
    } catch (error) {
      alert(`Could not roll dice:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={submitMessage}>
      <Button
        fluid
        className='test-select-message-send-button'
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        content="Roll Dice"
      />
    </Form>
  );
};

export default DiceRoller;