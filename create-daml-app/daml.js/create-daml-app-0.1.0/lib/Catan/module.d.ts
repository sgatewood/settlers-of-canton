// Generated from Catan.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type UpgradeWeight = {
};

export declare const UpgradeWeight:
  damlTypes.Serializable<UpgradeWeight> & {
  }
;


export declare type Plot = {
  bank: damlTypes.Party;
  owner: damlTypes.Party;
  everyone: damlTypes.Party[];
  weight: damlTypes.Int;
  diceValues: damlTypes.Int[];
  resourceNames: string[];
};

export declare interface PlotInterface {
  Archive: damlTypes.Choice<Plot, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<Plot, undefined>>;
  UpgradeWeight: damlTypes.Choice<Plot, UpgradeWeight, damlTypes.ContractId<Plot>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<Plot, undefined>>;
}
export declare const Plot:
  damlTypes.Template<Plot, undefined, 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:Catan:Plot'> &
  damlTypes.ToInterface<Plot, never> &
  PlotInterface;

export declare namespace Plot {
  export type CreateEvent = damlLedger.CreateEvent<Plot, undefined, typeof Plot.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Plot, typeof Plot.templateId>
  export type Event = damlLedger.Event<Plot, undefined, typeof Plot.templateId>
  export type QueryResult = damlLedger.QueryResult<Plot, undefined, typeof Plot.templateId>
}



export declare type TradeFourForOneOf = {
  destinationId: damlTypes.ContractId<Inventory>;
};

export declare const TradeFourForOneOf:
  damlTypes.Serializable<TradeFourForOneOf> & {
  }
;


export declare type SetNumber = {
  newNumber: damlTypes.Int;
};

export declare const SetNumber:
  damlTypes.Serializable<SetNumber> & {
  }
;


export declare type Inventory = {
  bank: damlTypes.Party;
  player: damlTypes.Party;
  resourceName: string;
  number: damlTypes.Int;
};

export declare interface InventoryInterface {
  SetNumber: damlTypes.Choice<Inventory, SetNumber, damlTypes.ContractId<Inventory>, Inventory.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Inventory, Inventory.Key>>;
  TradeFourForOneOf: damlTypes.Choice<Inventory, TradeFourForOneOf, damlTypes.ContractId<Inventory>, Inventory.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Inventory, Inventory.Key>>;
  Archive: damlTypes.Choice<Inventory, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, Inventory.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Inventory, Inventory.Key>>;
}
export declare const Inventory:
  damlTypes.Template<Inventory, Inventory.Key, 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:Catan:Inventory'> &
  damlTypes.ToInterface<Inventory, never> &
  InventoryInterface;

export declare namespace Inventory {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3<damlTypes.Party, damlTypes.Party, string>
  export type CreateEvent = damlLedger.CreateEvent<Inventory, Inventory.Key, typeof Inventory.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Inventory, typeof Inventory.templateId>
  export type Event = damlLedger.Event<Inventory, Inventory.Key, typeof Inventory.templateId>
  export type QueryResult = damlLedger.QueryResult<Inventory, Inventory.Key, typeof Inventory.templateId>
}



export declare type UpgradePlot = {
  player: damlTypes.Party;
  plotId: damlTypes.ContractId<Plot>;
};

export declare const UpgradePlot:
  damlTypes.Serializable<UpgradePlot> & {
  }
;


export declare type CreatePlot = {
  player: damlTypes.Party;
  diceValues: damlTypes.Int[];
  resourceNames: string[];
};

export declare const CreatePlot:
  damlTypes.Serializable<CreatePlot> & {
  }
;


export declare type CreateInventories = {
  player: damlTypes.Party;
};

export declare const CreateInventories:
  damlTypes.Serializable<CreateInventories> & {
  }
;


export declare type Bank = {
  username: damlTypes.Party;
  players: damlTypes.Party[];
};

export declare interface BankInterface {
  CreateInventories: damlTypes.Choice<Bank, CreateInventories, damlTypes.ContractId<Inventory>[], Bank.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Bank, Bank.Key>>;
  CreatePlot: damlTypes.Choice<Bank, CreatePlot, damlTypes.ContractId<Plot>, Bank.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Bank, Bank.Key>>;
  UpgradePlot: damlTypes.Choice<Bank, UpgradePlot, damlTypes.ContractId<Inventory>, Bank.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Bank, Bank.Key>>;
  Archive: damlTypes.Choice<Bank, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, Bank.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Bank, Bank.Key>>;
}
export declare const Bank:
  damlTypes.Template<Bank, Bank.Key, 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:Catan:Bank'> &
  damlTypes.ToInterface<Bank, never> &
  BankInterface;

export declare namespace Bank {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<Bank, Bank.Key, typeof Bank.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Bank, typeof Bank.templateId>
  export type Event = damlLedger.Event<Bank, Bank.Key, typeof Bank.templateId>
  export type QueryResult = damlLedger.QueryResult<Bank, Bank.Key, typeof Bank.templateId>
}


