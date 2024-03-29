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

export type BasicDashboardInput = {
  maxHours?: InputMaybe<Scalars['Float']>;
  minHours?: InputMaybe<Scalars['Float']>;
  rating?: InputMaybe<Array<Scalars['Int']>>;
  runningAvg: Scalars['String'];
  sortColumn?: InputMaybe<Scalars['String']>;
  sortDir?: InputMaybe<Scalars['String']>;
};

export type BasicSentence = {
  __typename?: 'BasicSentence';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  numberCreativeHours: Scalars['Float'];
  overview: Scalars['String'];
  rating: Scalars['Int'];
  text?: Maybe<Text>;
  user?: Maybe<Scalars['String']>;
};

export type BasicWord = {
  __typename?: 'BasicWord';
  mentions: Array<Scalars['Int']>;
  text?: Maybe<Text>;
};

export type Dashboard = {
  __typename?: 'Dashboard';
  entities?: Maybe<Array<Entity>>;
  rawData: Array<Track>;
  sentences?: Maybe<Array<Sentence>>;
  tokens?: Maybe<Array<Token>>;
};

export type DashboardMetrics = {
  __typename?: 'DashboardMetrics';
  avgHours: Scalars['Float'];
  daysOfUse: Scalars['Int'];
  ratings: Ratings;
};

export type DashboardMetricsResponse = {
  __typename?: 'DashboardMetricsResponse';
  dashboardMetrics?: Maybe<DashboardMetrics>;
  errors?: Maybe<Array<PsqlError>>;
};

export type Entity = {
  __typename?: 'Entity';
  mentions?: Maybe<Array<Sentence>>;
  name?: Maybe<Scalars['String']>;
  salience?: Maybe<Scalars['Float']>;
  sentiment?: Maybe<Sentiment>;
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  description: Scalars['String'];
  id: Scalars['ID'];
  isEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  requiredRole?: Maybe<Scalars['Int']>;
};

export type GetMentions = {
  __typename?: 'GetMentions';
  errors?: Maybe<Array<PsqlError>>;
  mentions: Array<Track>;
};

export type GetSentences = {
  __typename?: 'GetSentences';
  errors?: Maybe<Array<PsqlError>>;
  sentences?: Maybe<Array<BasicSentence>>;
};

export type GetWords = {
  __typename?: 'GetWords';
  errors?: Maybe<Array<PsqlError>>;
  words: Array<Word>;
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
  upgrade: Scalars['String'];
  uploadTracker: UploadTrackerResponse;
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


export type MutationUploadTrackerArgs = {
  data: Array<TrackerInput>;
};

export type PartOfSpeech = {
  __typename?: 'PartOfSpeech';
  tag?: Maybe<Scalars['String']>;
};

export type PremiumDashboardResponse = {
  __typename?: 'PremiumDashboardResponse';
  dashboard?: Maybe<Dashboard>;
  errors?: Maybe<Array<PsqlError>>;
};

export type PsqlError = {
  __typename?: 'PsqlError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  basicDashboardSentences: GetSentences;
  basicDashboardWords: GetWords;
  dashboard: PremiumDashboardResponse;
  dashboardMetrics: DashboardMetricsResponse;
  featureFlags: Array<FeatureFlag>;
  getWordMentions: GetMentions;
  me: MeQueryResponse;
};


export type QueryBasicDashboardSentencesArgs = {
  args: BasicDashboardInput;
};


export type QueryBasicDashboardWordsArgs = {
  args: BasicDashboardInput;
};


export type QueryDashboardArgs = {
  runningAvg: Scalars['String'];
};


export type QueryDashboardMetricsArgs = {
  runningAvg: Scalars['String'];
};


export type QueryGetWordMentionsArgs = {
  mentions: Array<Scalars['Int']>;
};


export type QueryMeArgs = {
  refetch?: InputMaybe<Scalars['Boolean']>;
};

export type Ratings = {
  __typename?: 'Ratings';
  countNegOne: Scalars['Int'];
  countNegTwo: Scalars['Int'];
  countPlusOne: Scalars['Int'];
  countPlusTwo: Scalars['Int'];
  countZero: Scalars['Int'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<PsqlError>>;
  user?: Maybe<User>;
};

export type Sentence = {
  __typename?: 'Sentence';
  sentiment?: Maybe<Sentiment>;
  text?: Maybe<Text>;
};

export type Sentiment = {
  __typename?: 'Sentiment';
  magnitude?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

export type Text = {
  __typename?: 'Text';
  beginOffset?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  partOfSpeech?: Maybe<PartOfSpeech>;
  text?: Maybe<Text>;
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

export type UploadTrackerResponse = {
  __typename?: 'UploadTrackerResponse';
  errors?: Maybe<Array<PsqlError>>;
  uploaded?: Maybe<Scalars['String']>;
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

export type Word = {
  __typename?: 'Word';
  count: Scalars['Int'];
  hide: Scalars['Boolean'];
  word: BasicWord;
};

export type BasicDashboardSentencesQueryVariables = Exact<{
  args: BasicDashboardInput;
}>;


export type BasicDashboardSentencesQuery = { __typename?: 'Query', basicDashboardSentences: { __typename?: 'GetSentences', sentences?: Array<{ __typename?: 'BasicSentence', id: string, overview: string, numberCreativeHours: number, rating: number, createdAt?: string | null, user?: string | null, text?: { __typename?: 'Text', content?: string | null } | null }> | null } };

export type BasicDashboardWordsQueryVariables = Exact<{
  args: BasicDashboardInput;
}>;


export type BasicDashboardWordsQuery = { __typename?: 'Query', basicDashboardWords: { __typename?: 'GetWords', words: Array<{ __typename?: 'Word', count: number, hide: boolean, word: { __typename?: 'BasicWord', mentions: Array<number>, text?: { __typename?: 'Text', content?: string | null } | null } }> } };

export type DashboardMetricsQueryQueryVariables = Exact<{
  runningAvg: Scalars['String'];
}>;


export type DashboardMetricsQueryQuery = { __typename?: 'Query', dashboardMetrics: { __typename?: 'DashboardMetricsResponse', dashboardMetrics?: { __typename?: 'DashboardMetrics', daysOfUse: number, avgHours: number, ratings: { __typename?: 'Ratings', countNegOne: number, countNegTwo: number, countZero: number, countPlusOne: number, countPlusTwo: number } } | null } };

export type DashboardQueryQueryVariables = Exact<{
  runningAvg: Scalars['String'];
}>;


export type DashboardQueryQuery = { __typename?: 'Query', dashboard: { __typename?: 'PremiumDashboardResponse', dashboard?: { __typename?: 'Dashboard', rawData: Array<{ __typename?: 'Track', id: string, overview: string, numberCreativeHours: number, rating: number, user?: string | null, createdAt?: string | null }>, sentences?: Array<{ __typename?: 'Sentence', sentiment?: { __typename?: 'Sentiment', magnitude?: number | null, score?: number | null } | null, text?: { __typename?: 'Text', content?: string | null, beginOffset?: number | null } | null }> | null, entities?: Array<{ __typename?: 'Entity', name?: string | null, salience?: number | null, sentiment?: { __typename?: 'Sentiment', magnitude?: number | null, score?: number | null } | null, mentions?: Array<{ __typename?: 'Sentence', sentiment?: { __typename?: 'Sentiment', magnitude?: number | null, score?: number | null } | null, text?: { __typename?: 'Text', content?: string | null, beginOffset?: number | null } | null }> | null }> | null, tokens?: Array<{ __typename?: 'Token', partOfSpeech?: { __typename?: 'PartOfSpeech', tag?: string | null } | null, text?: { __typename?: 'Text', content?: string | null, beginOffset?: number | null } | null }> | null } | null } };

export type GetWordMentionsQueryVariables = Exact<{
  mentions: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type GetWordMentionsQuery = { __typename?: 'Query', getWordMentions: { __typename?: 'GetMentions', mentions: Array<{ __typename?: 'Track', id: string, overview: string, numberCreativeHours: number, rating: number, createdAt?: string | null }> } };

export type RegisterMutationMutationVariables = Exact<{
  user: UserInput;
}>;


export type RegisterMutationMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', errors?: Array<{ __typename?: 'PsqlError', field: string, message: string }> | null, user?: { __typename?: 'User', username: string } | null } };

export type FeatureFlagsQueryVariables = Exact<{ [key: string]: never; }>;


export type FeatureFlagsQuery = { __typename?: 'Query', featureFlags: Array<{ __typename?: 'FeatureFlag', name: string, isEnabled: boolean, requiredRole?: number | null }> };

export type MeQueryVariables = Exact<{
  refetch?: InputMaybe<Scalars['Boolean']>;
}>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeQueryResponse', me?: { __typename?: 'Me', user: { __typename?: 'User', email: string, username: string, role: number }, lastPost?: { __typename?: 'LastPost', id: string, overview: string, numberCreativeHours: number, rating: number, user?: string | null, createdAt: string } | null } | null } };

export type UpgradeMutationVariables = Exact<{ [key: string]: never; }>;


export type UpgradeMutation = { __typename?: 'Mutation', upgrade: string };

export type TrackerMutationMutationVariables = Exact<{
  tracker: TrackerInput;
}>;


export type TrackerMutationMutation = { __typename?: 'Mutation', track: { __typename?: 'TrackerResponse', errors?: Array<{ __typename?: 'PsqlError', message: string, field: string }> | null, track?: { __typename?: 'Track', numberCreativeHours: number, overview: string, rating: number, user?: string | null, id: string } | null } };

export type UpdateTrackerMutationVariables = Exact<{
  tracker: UpdateTrackerInput;
}>;


export type UpdateTrackerMutation = { __typename?: 'Mutation', updateTrack: { __typename?: 'TrackerResponse', track?: { __typename?: 'Track', id: string, overview: string, numberCreativeHours: number, rating: number, user?: string | null } | null, errors?: Array<{ __typename?: 'PsqlError', field: string, message: string }> | null } };

export type UploadTrackerMutationVariables = Exact<{
  data: Array<TrackerInput> | TrackerInput;
}>;


export type UploadTrackerMutation = { __typename?: 'Mutation', uploadTracker: { __typename?: 'UploadTrackerResponse', uploaded?: string | null, errors?: Array<{ __typename?: 'PsqlError', field: string, message: string }> | null } };


export const BasicDashboardSentencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BasicDashboardSentences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BasicDashboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basicDashboardSentences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]} as unknown as DocumentNode<BasicDashboardSentencesQuery, BasicDashboardSentencesQueryVariables>;
export const BasicDashboardWordsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BasicDashboardWords"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BasicDashboardInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basicDashboardWords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"words"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mentions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"hide"}}]}}]}}]}}]} as unknown as DocumentNode<BasicDashboardWordsQuery, BasicDashboardWordsQueryVariables>;
export const DashboardMetricsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardMetricsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"runningAvg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"runningAvg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"runningAvg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboardMetrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daysOfUse"}},{"kind":"Field","name":{"kind":"Name","value":"avgHours"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countNegOne"}},{"kind":"Field","name":{"kind":"Name","value":"countNegTwo"}},{"kind":"Field","name":{"kind":"Name","value":"countZero"}},{"kind":"Field","name":{"kind":"Name","value":"countPlusOne"}},{"kind":"Field","name":{"kind":"Name","value":"countPlusTwo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DashboardMetricsQueryQuery, DashboardMetricsQueryQueryVariables>;
export const DashboardQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"runningAvg"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"runningAvg"},"value":{"kind":"Variable","name":{"kind":"Name","value":"runningAvg"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rawData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sentences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentiment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"magnitude"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"beginOffset"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"entities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentiment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"magnitude"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mentions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sentiment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"magnitude"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"beginOffset"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"salience"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"partOfSpeech"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"beginOffset"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DashboardQueryQuery, DashboardQueryQueryVariables>;
export const GetWordMentionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWordMentions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mentions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWordMentions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mentions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mentions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mentions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetWordMentionsQuery, GetWordMentionsQueryVariables>;
export const RegisterMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const FeatureFlagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeatureFlags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"featureFlags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"requiredRole"}}]}}]}}]} as unknown as DocumentNode<FeatureFlagsQuery, FeatureFlagsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refetch"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refetch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refetch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastPost"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UpgradeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Upgrade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upgrade"}}]}}]} as unknown as DocumentNode<UpgradeMutation, UpgradeMutationVariables>;
export const TrackerMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TrackerMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tracker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TrackerMutationMutation, TrackerMutationMutationVariables>;
export const UpdateTrackerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTracker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTrackerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tracker"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tracker"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"numberCreativeHours"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"user"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTrackerMutation, UpdateTrackerMutationVariables>;
export const UploadTrackerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadTracker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackerInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadTracker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploaded"}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UploadTrackerMutation, UploadTrackerMutationVariables>;