import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { userContext, getInventoryKeyFor, getInventoryMap } from './App';
import { Catan } from '@daml.js/create-daml-app';

const resourceTypes = [
    "lumber",
    "brick",
    "wool",
    "grain",
    "ore"
]

function canTradeSomething(inventory: Map<string, number>): boolean {
    return Array.from(inventory.values()).some(value => value >= 4)
}

const ResourceTrader: React.FC = () => {
  const sender = userContext.useParty();
  const bankResult = userContext.useQuery(Catan.Bank)
  const inventoryResult = userContext.useStreamQueries(Catan.Inventory);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [giving, setGiving] = React.useState<string | undefined>()
  const [receiving, setReceiving] = React.useState<string | undefined>()
  const ledger = userContext.useLedger();

  const inventoryMap = getInventoryMap(inventoryResult)
  const canTrade = canTradeSomething(inventoryMap)

  const submitMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);
      await ledger.exerciseByKey(Catan.Inventory.TradeFourForOneOf, getInventoryKeyFor(sender, giving ?? ""), {destinationResource: receiving ?? ""})
    } catch (error) {
      alert(`Could not trade:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const overFour = Array.from(inventoryMap.entries()).filter(entry => entry[1] >= 4).map(entry => entry[0])

  return (
    <Form onSubmit={submitMessage}>
    <Form.Select
        fluid
        search
        className='test-select-message-receiver'
        placeholder={giving ?? "Giving"}
        value={giving}
        options={canTrade ? overFour.map(resource => ({key: resource, text: resource, value: resource})) : []}
        disabled={!canTrade || isSubmitting}
        onChange={(event, data) => setGiving(data.value?.toString())}
      />
    <Form.Select
        fluid
        search
        className='test-select-message-receiver'
        placeholder={receiving ?? "Receiving"}
        value={receiving}
        options={canTrade ? resourceTypes.map(resource => ({key: resource, text: resource, value: resource})) : []}
        disabled={!canTrade || isSubmitting}
        onChange={(event, data) => setReceiving(data.value?.toString())}
      />
      <Button
        fluid
        className='test-select-message-send-button'
        type="submit"
        disabled={!canTrade || isSubmitting}
        loading={isSubmitting}
        content="Trade 4"
      />
    </Form>
  );
};

export default ResourceTrader;