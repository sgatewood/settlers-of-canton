// Generated from User.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type Message = {
  sender: damlTypes.Party;
  receiver: damlTypes.Party;
  content: string;
};

export declare interface MessageInterface {
  Archive: damlTypes.Choice<Message, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<Message, undefined>>;
}
export declare const Message:
  damlTypes.Template<Message, undefined, 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:User:Message'> &
  damlTypes.ToInterface<Message, never> &
  MessageInterface;

export declare namespace Message {
  export type CreateEvent = damlLedger.CreateEvent<Message, undefined, typeof Message.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Message, typeof Message.templateId>
  export type Event = damlLedger.Event<Message, undefined, typeof Message.templateId>
  export type QueryResult = damlLedger.QueryResult<Message, undefined, typeof Message.templateId>
}



export declare type Change = {
  newAlias: string;
};

export declare const Change:
  damlTypes.Serializable<Change> & {
  }
;


export declare type Alias = {
  username: damlTypes.Party;
  alias: string;
  public: damlTypes.Party;
};

export declare interface AliasInterface {
  Archive: damlTypes.Choice<Alias, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, Alias.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Alias, Alias.Key>>;
  Change: damlTypes.Choice<Alias, Change, damlTypes.ContractId<Alias>, Alias.Key> & damlTypes.ChoiceFrom<damlTypes.Template<Alias, Alias.Key>>;
}
export declare const Alias:
  damlTypes.Template<Alias, Alias.Key, 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:User:Alias'> &
  damlTypes.ToInterface<Alias, never> &
  AliasInterface;

export declare namespace Alias {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, damlTypes.Party>
  export type CreateEvent = damlLedger.CreateEvent<Alias, Alias.Key, typeof Alias.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Alias, typeof Alias.templateId>
  export type Event = damlLedger.Event<Alias, Alias.Key, typeof Alias.templateId>
  export type QueryResult = damlLedger.QueryResult<Alias, Alias.Key, typeof Alias.templateId>
}



export declare type SendMessage = {
  sender: damlTypes.Party;
  content: string;
};

export declare const SendMessage:
  damlTypes.Serializable<SendMessage> & {
  }
;


export declare type Follow = {
  userToFollow: damlTypes.Party;
};

export declare const Follow:
  damlTypes.Serializable<Follow> & {
  }
;


export declare type User = {
  username: damlTypes.Party;
  following: damlTypes.Party[];
};

export declare interface UserInterface {
  Archive: damlTypes.Choice<User, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, User.Key> & damlTypes.ChoiceFrom<damlTypes.Template<User, User.Key>>;
  Follow: damlTypes.Choice<User, Follow, damlTypes.ContractId<User>, User.Key> & damlTypes.ChoiceFrom<damlTypes.Template<User, User.Key>>;
  SendMessage: damlTypes.Choice<User, SendMessage, damlTypes.ContractId<Message>, User.Key> & damlTypes.ChoiceFrom<damlTypes.Template<User, User.Key>>;
}
export declare const User:
  damlTypes.Template<User, User.Key, 'b94989ac7b6c1d9ffa0881ad496e4cfab4c9e9187cfd90fe46f18806522f6185:User:User'> &
  damlTypes.ToInterface<User, never> &
  UserInterface;

export declare namespace User {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<User, User.Key, typeof User.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<User, typeof User.templateId>
  export type Event = damlLedger.Event<User, User.Key, typeof User.templateId>
  export type QueryResult = damlLedger.QueryResult<User, User.Key, typeof User.templateId>
}


