"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');

var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 = require('@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');


exports.UpgradeWeight = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Plot = damlTypes.assembleTemplate(
{
  templateId: 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:Catan:Plot',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bank: damlTypes.Party.decoder, owner: damlTypes.Party.decoder, everyone: damlTypes.List(damlTypes.Party).decoder, weight: damlTypes.Int.decoder, diceValues: damlTypes.List(damlTypes.Int).decoder, resourceNames: damlTypes.List(damlTypes.Text).decoder, }); }),
  encode: function (__typed__) {
  return {
    bank: damlTypes.Party.encode(__typed__.bank),
    owner: damlTypes.Party.encode(__typed__.owner),
    everyone: damlTypes.List(damlTypes.Party).encode(__typed__.everyone),
    weight: damlTypes.Int.encode(__typed__.weight),
    diceValues: damlTypes.List(damlTypes.Int).encode(__typed__.diceValues),
    resourceNames: damlTypes.List(damlTypes.Text).encode(__typed__.resourceNames),
  };
}
,
  Archive: {
    template: function () { return exports.Plot; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  UpgradeWeight: {
    template: function () { return exports.Plot; },
    choiceName: 'UpgradeWeight',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.UpgradeWeight.decoder; }),
    argumentEncode: function (__typed__) { return exports.UpgradeWeight.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Plot).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Plot).encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.Plot);



exports.TradeFourForOneOf = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({destinationId: damlTypes.ContractId(exports.Inventory).decoder, }); }),
  encode: function (__typed__) {
  return {
    destinationId: damlTypes.ContractId(exports.Inventory).encode(__typed__.destinationId),
  };
}
,
};



exports.SetNumber = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({newNumber: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    newNumber: damlTypes.Int.encode(__typed__.newNumber),
  };
}
,
};



exports.Inventory = damlTypes.assembleTemplate(
{
  templateId: 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:Catan:Inventory',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Party, damlTypes.Party, damlTypes.Text).decoder; }); }),
  keyEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Party, damlTypes.Party, damlTypes.Text).encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({bank: damlTypes.Party.decoder, player: damlTypes.Party.decoder, resourceName: damlTypes.Text.decoder, number: damlTypes.Int.decoder, }); }),
  encode: function (__typed__) {
  return {
    bank: damlTypes.Party.encode(__typed__.bank),
    player: damlTypes.Party.encode(__typed__.player),
    resourceName: damlTypes.Text.encode(__typed__.resourceName),
    number: damlTypes.Int.encode(__typed__.number),
  };
}
,
  SetNumber: {
    template: function () { return exports.Inventory; },
    choiceName: 'SetNumber',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.SetNumber.decoder; }),
    argumentEncode: function (__typed__) { return exports.SetNumber.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Inventory).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Inventory).encode(__typed__); },
  },
  TradeFourForOneOf: {
    template: function () { return exports.Inventory; },
    choiceName: 'TradeFourForOneOf',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.TradeFourForOneOf.decoder; }),
    argumentEncode: function (__typed__) { return exports.TradeFourForOneOf.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Inventory).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Inventory).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.Inventory; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.Inventory);



exports.UpgradePlot = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({player: damlTypes.Party.decoder, plotId: damlTypes.ContractId(exports.Plot).decoder, }); }),
  encode: function (__typed__) {
  return {
    player: damlTypes.Party.encode(__typed__.player),
    plotId: damlTypes.ContractId(exports.Plot).encode(__typed__.plotId),
  };
}
,
};



exports.CreatePlot = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({player: damlTypes.Party.decoder, diceValues: damlTypes.List(damlTypes.Int).decoder, resourceNames: damlTypes.List(damlTypes.Text).decoder, }); }),
  encode: function (__typed__) {
  return {
    player: damlTypes.Party.encode(__typed__.player),
    diceValues: damlTypes.List(damlTypes.Int).encode(__typed__.diceValues),
    resourceNames: damlTypes.List(damlTypes.Text).encode(__typed__.resourceNames),
  };
}
,
};



exports.CreateInventories = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({player: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    player: damlTypes.Party.encode(__typed__.player),
  };
}
,
};



exports.Bank = damlTypes.assembleTemplate(
{
  templateId: 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:Catan:Bank',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return damlTypes.Party.decoder; }); }),
  keyEncode: function (__typed__) { return damlTypes.Party.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({username: damlTypes.Party.decoder, players: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    username: damlTypes.Party.encode(__typed__.username),
    players: damlTypes.List(damlTypes.Party).encode(__typed__.players),
  };
}
,
  CreateInventories: {
    template: function () { return exports.Bank; },
    choiceName: 'CreateInventories',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CreateInventories.decoder; }),
    argumentEncode: function (__typed__) { return exports.CreateInventories.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.List(damlTypes.ContractId(exports.Inventory)).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.List(damlTypes.ContractId(exports.Inventory)).encode(__typed__); },
  },
  CreatePlot: {
    template: function () { return exports.Bank; },
    choiceName: 'CreatePlot',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CreatePlot.decoder; }),
    argumentEncode: function (__typed__) { return exports.CreatePlot.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Plot).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Plot).encode(__typed__); },
  },
  UpgradePlot: {
    template: function () { return exports.Bank; },
    choiceName: 'UpgradePlot',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.UpgradePlot.decoder; }),
    argumentEncode: function (__typed__) { return exports.UpgradePlot.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Inventory).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Inventory).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.Bank; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.Bank);

