import { QueryResult } from '@daml/ledger';
import { Catan } from '@daml.js/create-daml-app';

export function getInventoryKeyFor(player: string, resourceName: string) {
    return {
      _1: player,
      _2: resourceName
    }
  }

export function getInventoryMap(queryResult: QueryResult<Catan.Inventory, Catan.Inventory.Key, string>): Map<string, number>{
  const result: Map<string, number> = new Map()
  queryResult.contracts.forEach(inventory => {
      const {resourceName, number} = inventory.payload;
      result.set(resourceName, result.get(resourceName) ?? 0 + parseInt(number))
  })
  return result
}

export const resourceToIcon = new Map()

resourceToIcon.set("lumber", "tree")
resourceToIcon.set("brick", "block layout")
resourceToIcon.set("wool", "cloudversify")
resourceToIcon.set("grain", "food")
resourceToIcon.set("ore", "fire")
