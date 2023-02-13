import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { userContext, getInventoryKeyFor, getInventoryMap } from './App';
import { Catan } from '@daml.js/create-daml-app';

const settlementRequirements = [
    "lumber",
    "brick",
    "wool",
    "grain"
]

const allResourceTypes = [
    "lumber",
    "brick",
    "wool",
    "grain",
    "ore"
]

function canBuySettlement(inventory: Map<String, number>): boolean {
    return settlementRequirements.every(resourceName => (inventory.get(resourceName) ?? 0) > 0)
}

function getRandInt(low: number, high: number): number {
    return Math.floor(Math.random() * high) + low
}

function getRandomDiceValue(): number {
    return getRandInt(1,12)
}

function getRandomResource(): string {
    return allResourceTypes[getRandInt(0, allResourceTypes.length)]
}

function getRandomDiceValues(): string[] {
    return [
        getRandomDiceValue().toString(),
        getRandomDiceValue().toString(),
        getRandomDiceValue().toString()
    ]
}

function getRandomResourceNames(): string[] {
    return [
        getRandomResource(),
        getRandomResource(),
        getRandomResource()
    ]
}

const SettlementCreator: React.FC = () => {
  const sender = userContext.useParty();
  const bankResult = userContext.useQuery(Catan.Bank)
  const inventoryResult = userContext.useStreamQueries(Catan.Inventory);
  const plotResult = userContext.useStreamQueries(Catan.Plot);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const ledger = userContext.useLedger();


  const inventoryMap = getInventoryMap(inventoryResult)
  const canBuy = canBuySettlement(inventoryMap)

  const submitMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);

      const bankUsername = bankResult.contracts[0].payload.username // race condition
      const index = plotResult.contracts.length+1
      await ledger.exerciseByKey(Catan.Bank.CreatePlot, bankUsername, {
        player: sender, 
        diceValues: getRandomDiceValues(), 
        resourceNames: getRandomResourceNames(), 
        index: index.toString() })
    } catch (error) {
      alert(`Could not create settlement:\n${JSON.stringify(error)}`);
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
        disabled={!canBuy || isSubmitting}
        loading={isSubmitting}
        content="New Settlement"
      />
    </Form>
  );
};

export default SettlementCreator;