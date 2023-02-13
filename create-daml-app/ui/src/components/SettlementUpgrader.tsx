import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import { userContext, getInventoryKeyFor, getInventoryMap } from './App';
import { Catan } from '@daml.js/create-daml-app';

const upgradeRequirements = new Map<string, number>()
upgradeRequirements.set("grain", 2)
upgradeRequirements.set("ore", 3)

function canUpgradeSettlement(inventory: Map<string, number>): boolean {
    return Array.from(upgradeRequirements.entries()).every(entry => {
        const [resourceName, requirement] = entry
        const currentAmount = inventory.get(resourceName) ?? 0
        return currentAmount >= requirement
    })
}

const SettlementUpgrader: React.FC = () => {
  const sender = userContext.useParty();
  const bankResult = userContext.useQuery(Catan.Bank)
  const inventoryResult = userContext.useStreamQueries(Catan.Inventory);
  const plotResult = userContext.useStreamQueries(Catan.Plot);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [plotToUpgrade, setPlotToUpgrade] = React.useState<string | undefined>()
  const ledger = userContext.useLedger();

  const inventoryMap = getInventoryMap(inventoryResult)
  const canUpgrade = canUpgradeSettlement(inventoryMap)

  const submitMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setIsSubmitting(true);
      const bankUsername = bankResult.contracts[0].payload.username // race condition
      await ledger.exerciseByKey(Catan.Bank.UpgradePlot, bankUsername, {player: sender, plotNum: plotToUpgrade ?? ""})
    } catch (error) {
      alert(`Could not upgrade settlement:\n${JSON.stringify(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={submitMessage}>
    <Form.Select
        fluid
        search
        className='test-select-message-receiver'
        placeholder={plotToUpgrade ?? "Select a plot"}
        value={plotToUpgrade}
        options={plotResult.contracts.map(plot => ({key: plot.payload.index, text: plot.payload.index, value: plot.payload.index}))}
        disabled={!canUpgrade || isSubmitting}
        onChange={(event, data) => setPlotToUpgrade(data.value?.toString())}
      />
      <Button
        fluid
        className='test-select-message-send-button'
        type="submit"
        disabled={!canUpgrade || isSubmitting}
        loading={isSubmitting}
        content="Upgrade Settlement"
      />
    </Form>
  );
};

export default SettlementUpgrader;