/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Dashboard = {
  __typename?: 'Dashboard';
  ninetyDayAvg: Scalars['Float'];
  ninetyDayCount0: Scalars['Int'];
  ninetyDayCount1: Scalars['Int'];
  ninetyDayCount2: Scalars['Int'];
  ninetyDayCountNeg1: Scalars['Int'];
  ninetyDayCountNeg2: Scalars['Int'];
  ninetyDayWordcloud: Scalars['String'];
  sixtyDayAvg: Scalars['Float'];
  sixtyDayCount0: Scalars['Int'];
  sixtyDayCount1: Scalars['Int'];
  sixtyDayCount2: Scalars['Int'];
  sixtyDayCountNeg1: Scalars['Int'];
  sixtyDayCountNeg2: Scalars['Int'];
  sixtyDayWordcloud: Scalars['String'];
  thirtyDayAvg: Scalars['Float'];
  thirtyDayCount0: Scalars['Int'];
  thirtyDayCount1: Scalars['Int'];
  thirtyDayCount2: Scalars['Int'];
  thirtyDayCountNeg1: Scalars['Int'];
  thirtyDayCountNeg2: Scalars['Int'];
  thirtyDayWordcloud: Scalars['String'];
  yearAvg: Scalars['Float'];
  yearCount0: Scalars['Int'];
  yearCount1: Scalars['Int'];
  yearCount2: Scalars['Int'];
  yearCountNeg1: Scalars['Int'];
  yearCountNeg2: Scalars['Int'];
  yearWordcloud: Scalars['String'];
};

export type DashboardResponse = {
  __typename?: 'DashboardResponse';
  dashboard?: Maybe<Dashboard>;
  errors?: Maybe<Array<PsqlError>>;
};

export type GetUserResponse = {
  __typename?: 'GetUserResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<UserInfo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterResponse;
  track: TrackerResponse;
};


export type MutationRegisterArgs = {
  user: UserInput;
};


export type MutationTrackArgs = {
  tracker: TrackerInput;
};

export type PsqlError = {
  __typename?: 'PsqlError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dashboard: DashboardResponse;
  me: GetUserResponse;
  todaysPost: TodaysPost;
};


export type QueryDashboardArgs = {
  user: Scalars['Int'];
};


export type QueryMeArgs = {
  refetch?: InputMaybe<Scalars['Boolean']>;
  user: UserAuthInput;
};


export type QueryTodaysPostArgs = {
  user: Scalars['Int'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<PsqlError>>;
  user?: Maybe<User>;
};

export type TodaysPost = {
  __typename?: 'TodaysPost';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
  user: Scalars['String'];
};

export type Track = {
  __typename?: 'Track';
  id: Scalars['ID'];
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
  user: Scalars['String'];
};

export type TrackerInput = {
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
  user: Scalars['String'];
};

export type TrackerResponse = {
  __typename?: 'TrackerResponse';
  errors?: Maybe<Array<PsqlError>>;
  track?: Maybe<Track>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  role: Scalars['Int'];
  username: Scalars['String'];
};

export type UserAuthInput = {
  id: Scalars['String'];
  token: Scalars['String'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email: Scalars['String'];
  id: Scalars['ID'];
  lastPost: Scalars['String'];
  role: Scalars['Int'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type DashboardQueryQueryVariables = Exact<{
  user: Scalars['Int'];
}>;


export type DashboardQueryQuery = { __typename?: 'Query', dashboard: { __typename?: 'DashboardResponse', dashboard?: { __typename?: 'Dashboard', thirtyDayAvg: number, sixtyDayAvg: number, ninetyDayAvg: number, yearAvg: number, thirtyDayCountNeg2: number, thirtyDayCountNeg1: number, thirtyDayCount0: number, thirtyDayCount1: number, thirtyDayCount2: number, sixtyDayCountNeg2: number, sixtyDayCountNeg1: number, sixtyDayCount0: number, sixtyDayCount1: number, sixtyDayCount2: number, ninetyDayCountNeg2: number, ninetyDayCountNeg1: number, ninetyDayCount0: number, ninetyDayCount1: number, ninetyDayCount2: number, yearCountNeg2: number, yearCountNeg1: number, yearCount0: number, yearCount1: number, yearCount2: number, thirtyDayWordcloud: string, sixtyDayWordcloud: string, ninetyDayWordcloud: string, yearWordcloud: string } | null } };

export type RegisterMutationMutationVariables = Exact<{
  user: UserInput;
}>;


export type RegisterMutationMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', errors?: Array<{ __typename?: 'PsqlError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string } | null } };

export type WordcloudQueryQueryVariables = Exact<{
  user: Scalars['Int'];
}>;


export type WordcloudQueryQuery = { __typename?: 'Query', dashboard: { __typename?: 'DashboardResponse', dashboard?: { __typename?: 'Dashboard', thirtyDayWordcloud: string, sixtyDayWordcloud: string, ninetyDayWordcloud: string, yearWordcloud: string } | null } };

export type MeQueryVariables = Exact<{
  user: UserAuthInput;
  refetch?: InputMaybe<Scalars['Boolean']>;
}>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'GetUserResponse', error?: string | null, user?: { __typename?: 'UserInfo', email: string, id: string, role: number, username: string, lastPost: string } | null } };

export type QueryQueryVariables = Exact<{
  user: Scalars['Int'];
}>;


export type QueryQuery = { __typename?: 'Query', todaysPost: { __typename?: 'TodaysPost', overview: string, numberCreativeHours: number, rating: number } };

export type TrackerMutationMutationVariables = Exact<{
  tracker: TrackerInput;
}>;


export type TrackerMutationMutation = { __typename?: 'Mutation', track: { __typename?: 'TrackerResponse', errors?: Array<{ __typename?: 'PsqlError', message: string, field: string }> | null, track?: { __typename?: 'Track', numberCreativeHours: number, overview: string, rating: number, user: string, id: string } | null } };


export const DashboardQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thirtyDayAvg"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayAvg"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayAvg"}},{"kind":"Field","name":{"kind":"Name","value":"yearAvg"}},{"kind":"Field","name":{"kind":"Name","value":"thirtyDayCountNeg2"}},{"kind":"Field","name":{"kind":"Name","value":"thirtyDayCountNeg1"}},{"kind":"Field","name":{"kind":"Name","value":"thirtyDayCount0"}},{"kind":"Field","name":{"kind":"Name","value":"thirtyDayCount1"}},{"kind":"Field","name":{"kind":"Name","value":"thirtyDayCount2"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayCountNeg2"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayCountNeg1"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayCount0"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayCount1"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayCount2"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayCountNeg2"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayCountNeg1"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayCount0"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayCount1"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayCount2"}},{"kind":"Field","name":{"kind":"Name","value":"yearCountNeg2"}},{"kind":"Field","name":{"kind":"Name","value":"yearCountNeg1"}},{"kind":"Field","name":{"kind":"Name","value":"yearCount0"}},{"kind":"Field","name":{"kind":"Name","value":"yearCount1"}},{"kind":"Field","name":{"kind":"Name","value":"yearCount2"}},{"kind":"Field","name":{"kind":"Name","value":"thirtyDayWordcloud"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayWordcloud"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayWordcloud"}},{"kind":"Field","name":{"kind":"Name","value":"yearWordcloud"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardQueryQuery, DashboardQueryQueryVariables>;
export const RegisterMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const WordcloudQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WordcloudQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thirtyDayWordcloud"}},{"kind":"Field","name":{"kind":"Name","value":"sixtyDayWordcloud"}},{"kind":"Field","name":{"kind":"Name","value":"ninetyDayWordcloud"}},{"kind":"Field","name":{"kind":"Name","value":"yearWordcloud"}}]}}]}}]}}]} as unknown as DocumentNode<WordcloudQueryQuery, WordcloudQueryQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserAuthInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refetch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"refetch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refetch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"lastPost"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todaysPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const TrackerMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TrackerMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tracker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TrackerMutationMutation, TrackerMutationMutationVariables>;