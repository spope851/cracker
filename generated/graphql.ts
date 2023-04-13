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
  dashboardMetrics: DashboardMetrics;
  rawData: Array<Track>;
};

export type DashboardMetrics = {
  __typename?: 'DashboardMetrics';
  avgHours: Scalars['Float'];
  countNegOne: Scalars['Int'];
  countNegTwo: Scalars['Int'];
  countPlusOne: Scalars['Int'];
  countPlusTwo: Scalars['Int'];
  countZero: Scalars['Int'];
  daysOfUse: Scalars['Int'];
  overviews: Scalars['String'];
};

export type DashboardResponse = {
  __typename?: 'DashboardResponse';
  dashboard?: Maybe<Dashboard>;
  errors?: Maybe<Array<PsqlError>>;
};

export type LastPost = {
  __typename?: 'LastPost';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
  user?: Maybe<Scalars['String']>;
};

export type Me = {
  __typename?: 'Me';
  lastPost?: Maybe<LastPost>;
  user: User;
};

export type MeQueryResponse = {
  __typename?: 'MeQueryResponse';
  error?: Maybe<Scalars['String']>;
  me?: Maybe<Me>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: RegisterResponse;
  track: TrackerResponse;
  updateTrack: TrackerResponse;
};


export type MutationRegisterArgs = {
  user: UserInput;
};


export type MutationTrackArgs = {
  tracker: TrackerInput;
};


export type MutationUpdateTrackArgs = {
  tracker: UpdateTrackerInput;
};

export type PsqlError = {
  __typename?: 'PsqlError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dashboard: DashboardResponse;
  me: MeQueryResponse;
};


export type QueryDashboardArgs = {
  runningAvg: Scalars['String'];
};


export type QueryMeArgs = {
  refetch?: InputMaybe<Scalars['Boolean']>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<PsqlError>>;
  user?: Maybe<User>;
};

export type Track = {
  __typename?: 'Track';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
  user?: Maybe<Scalars['String']>;
};

export type TrackerInput = {
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
};

export type TrackerResponse = {
  __typename?: 'TrackerResponse';
  errors?: Maybe<Array<PsqlError>>;
  track?: Maybe<Track>;
};

export type UpdateTrackerInput = {
  id: Scalars['String'];
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  role: Scalars['Int'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type DashboardQueryQueryVariables = Exact<{
  runningAvg: Scalars['String'];
}>;


export type DashboardQueryQuery = { __typename?: 'Query', dashboard: { __typename?: 'DashboardResponse', dashboard?: { __typename?: 'Dashboard', dashboardMetrics: { __typename?: 'DashboardMetrics', daysOfUse: number, avgHours: number, countNegOne: number, countNegTwo: number, countZero: number, countPlusOne: number, countPlusTwo: number, overviews: string }, rawData: Array<{ __typename?: 'Track', id: string, overview: string, numberCreativeHours: number, rating: number, user?: string | null, createdAt?: string | null }> } | null } };

export type RegisterMutationMutationVariables = Exact<{
  user: UserInput;
}>;


export type RegisterMutationMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', errors?: Array<{ __typename?: 'PsqlError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string } | null } };

export type MeQueryVariables = Exact<{
  refetch?: InputMaybe<Scalars['Boolean']>;
}>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeQueryResponse', me?: { __typename?: 'Me', user: { __typename?: 'User', email: string, username: string, role: number }, lastPost?: { __typename?: 'LastPost', id: string, overview: string, numberCreativeHours: number, rating: number, user?: string | null, createdAt: string } | null } | null } };

export type TrackerMutationMutationVariables = Exact<{
  tracker: TrackerInput;
}>;


export type TrackerMutationMutation = { __typename?: 'Mutation', track: { __typename?: 'TrackerResponse', errors?: Array<{ __typename?: 'PsqlError', message: string, field: string }> | null, track?: { __typename?: 'Track', numberCreativeHours: number, overview: string, rating: number, user?: string | null, id: string } | null } };

export type UpdateTrackerMutationVariables = Exact<{
  tracker: UpdateTrackerInput;
}>;


export type UpdateTrackerMutation = { __typename?: 'Mutation', updateTrack: { __typename?: 'TrackerResponse', track?: { __typename?: 'Track', id: string, overview: string, numberCreativeHours: number, rating: number, user?: string | null } | null, errors?: Array<{ __typename?: 'PsqlError', field: string, message: string }> | null } };


export const DashboardQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"runningAvg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"runningAvg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"runningAvg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardMetrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daysOfUse"}},{"kind":"Field","name":{"kind":"Name","value":"avgHours"}},{"kind":"Field","name":{"kind":"Name","value":"countNegOne"}},{"kind":"Field","name":{"kind":"Name","value":"countNegTwo"}},{"kind":"Field","name":{"kind":"Name","value":"countZero"}},{"kind":"Field","name":{"kind":"Name","value":"countPlusOne"}},{"kind":"Field","name":{"kind":"Name","value":"countPlusTwo"}},{"kind":"Field","name":{"kind":"Name","value":"overviews"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rawData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DashboardQueryQuery, DashboardQueryQueryVariables>;
export const RegisterMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refetch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refetch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refetch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const TrackerMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TrackerMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tracker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TrackerMutationMutation, TrackerMutationMutationVariables>;
export const UpdateTrackerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTracker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTrackerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tracker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTrackerMutation, UpdateTrackerMutationVariables>;