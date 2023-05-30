/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query BasicDashboardSentences($runningAvg: String!) {\n    basicDashboardSentences(runningAvg: $runningAvg) {\n      sentences {\n        id\n        overview\n        numberCreativeHours\n        rating\n        createdAt\n        user\n        text {\n          content\n        }\n      }\n    }\n  }\n": types.BasicDashboardSentencesDocument,
    "\n  query BasicDashboardWords($runningAvg: String!) {\n    basicDashboardWords(runningAvg: $runningAvg) {\n      words {\n        word {\n          text {\n            content\n          }\n          mentions\n        }\n        count\n        hide\n      }\n    }\n  }\n": types.BasicDashboardWordsDocument,
    "\n  query DashboardMetricsQuery($runningAvg: String!) {\n    dashboardMetrics(runningAvg: $runningAvg) {\n      dashboardMetrics {\n        daysOfUse\n        avgHours\n        ratings {\n          countNegOne\n          countNegTwo\n          countZero\n          countPlusOne\n          countPlusTwo\n        }\n      }\n    }\n  }\n": types.DashboardMetricsQueryDocument,
    "\n  query DashboardQuery($runningAvg: String!) {\n    dashboard(runningAvg: $runningAvg) {\n      dashboard {\n        rawData {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n        sentences {\n          sentiment {\n            magnitude\n            score\n          }\n          text {\n            content\n            beginOffset\n          }\n        }\n        entities {\n          sentiment {\n            magnitude\n            score\n          }\n          mentions {\n            sentiment {\n              magnitude\n              score\n            }\n            text {\n              content\n              beginOffset\n            }\n          }\n          name\n          salience\n        }\n        tokens {\n          partOfSpeech {\n            tag\n          }\n          text {\n            content\n            beginOffset\n          }\n        }\n      }\n    }\n  }\n": types.DashboardQueryDocument,
    "\n  query GetWordMentions($mentions: [Int!]!) {\n    getWordMentions(mentions: $mentions) {\n      mentions {\n        id\n        overview\n        numberCreativeHours\n        rating\n        createdAt\n      }\n    }\n  }\n": types.GetWordMentionsDocument,
    "\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n": types.RegisterMutationDocument,
    "\n  query FeatureFlags {\n    featureFlags {\n      name\n      isEnabled\n      requiredRole\n    }\n  }\n": types.FeatureFlagsDocument,
    "\n  query Me($refetch: Boolean) {\n    me(refetch: $refetch) {\n      me {\n        user {\n          email\n          username\n          role\n        }\n        lastPost {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation Upgrade {\n    upgrade\n  }\n": types.UpgradeDocument,
    "\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n": types.TrackerMutationDocument,
    "\nmutation UpdateTracker($tracker: UpdateTrackerInput!) {\n  updateTrack(tracker: $tracker) {\n    track {\n      id\n      overview\n      numberCreativeHours\n      rating\n      user\n    }\n    errors {\n      field\n      message\n    }\n  }\n}\n": types.UpdateTrackerDocument,
    "\n  mutation UploadTracker($data: [TrackerInput!]!) {\n    uploadTracker(data: $data) {\n      uploaded\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.UploadTrackerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BasicDashboardSentences($runningAvg: String!) {\n    basicDashboardSentences(runningAvg: $runningAvg) {\n      sentences {\n        id\n        overview\n        numberCreativeHours\n        rating\n        createdAt\n        user\n        text {\n          content\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicDashboardSentences($runningAvg: String!) {\n    basicDashboardSentences(runningAvg: $runningAvg) {\n      sentences {\n        id\n        overview\n        numberCreativeHours\n        rating\n        createdAt\n        user\n        text {\n          content\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BasicDashboardWords($runningAvg: String!) {\n    basicDashboardWords(runningAvg: $runningAvg) {\n      words {\n        word {\n          text {\n            content\n          }\n          mentions\n        }\n        count\n        hide\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicDashboardWords($runningAvg: String!) {\n    basicDashboardWords(runningAvg: $runningAvg) {\n      words {\n        word {\n          text {\n            content\n          }\n          mentions\n        }\n        count\n        hide\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DashboardMetricsQuery($runningAvg: String!) {\n    dashboardMetrics(runningAvg: $runningAvg) {\n      dashboardMetrics {\n        daysOfUse\n        avgHours\n        ratings {\n          countNegOne\n          countNegTwo\n          countZero\n          countPlusOne\n          countPlusTwo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DashboardMetricsQuery($runningAvg: String!) {\n    dashboardMetrics(runningAvg: $runningAvg) {\n      dashboardMetrics {\n        daysOfUse\n        avgHours\n        ratings {\n          countNegOne\n          countNegTwo\n          countZero\n          countPlusOne\n          countPlusTwo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DashboardQuery($runningAvg: String!) {\n    dashboard(runningAvg: $runningAvg) {\n      dashboard {\n        rawData {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n        sentences {\n          sentiment {\n            magnitude\n            score\n          }\n          text {\n            content\n            beginOffset\n          }\n        }\n        entities {\n          sentiment {\n            magnitude\n            score\n          }\n          mentions {\n            sentiment {\n              magnitude\n              score\n            }\n            text {\n              content\n              beginOffset\n            }\n          }\n          name\n          salience\n        }\n        tokens {\n          partOfSpeech {\n            tag\n          }\n          text {\n            content\n            beginOffset\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DashboardQuery($runningAvg: String!) {\n    dashboard(runningAvg: $runningAvg) {\n      dashboard {\n        rawData {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n        sentences {\n          sentiment {\n            magnitude\n            score\n          }\n          text {\n            content\n            beginOffset\n          }\n        }\n        entities {\n          sentiment {\n            magnitude\n            score\n          }\n          mentions {\n            sentiment {\n              magnitude\n              score\n            }\n            text {\n              content\n              beginOffset\n            }\n          }\n          name\n          salience\n        }\n        tokens {\n          partOfSpeech {\n            tag\n          }\n          text {\n            content\n            beginOffset\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWordMentions($mentions: [Int!]!) {\n    getWordMentions(mentions: $mentions) {\n      mentions {\n        id\n        overview\n        numberCreativeHours\n        rating\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWordMentions($mentions: [Int!]!) {\n    getWordMentions(mentions: $mentions) {\n      mentions {\n        id\n        overview\n        numberCreativeHours\n        rating\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FeatureFlags {\n    featureFlags {\n      name\n      isEnabled\n      requiredRole\n    }\n  }\n"): (typeof documents)["\n  query FeatureFlags {\n    featureFlags {\n      name\n      isEnabled\n      requiredRole\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me($refetch: Boolean) {\n    me(refetch: $refetch) {\n      me {\n        user {\n          email\n          username\n          role\n        }\n        lastPost {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me($refetch: Boolean) {\n    me(refetch: $refetch) {\n      me {\n        user {\n          email\n          username\n          role\n        }\n        lastPost {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Upgrade {\n    upgrade\n  }\n"): (typeof documents)["\n  mutation Upgrade {\n    upgrade\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateTracker($tracker: UpdateTrackerInput!) {\n  updateTrack(tracker: $tracker) {\n    track {\n      id\n      overview\n      numberCreativeHours\n      rating\n      user\n    }\n    errors {\n      field\n      message\n    }\n  }\n}\n"): (typeof documents)["\nmutation UpdateTracker($tracker: UpdateTrackerInput!) {\n  updateTrack(tracker: $tracker) {\n    track {\n      id\n      overview\n      numberCreativeHours\n      rating\n      user\n    }\n    errors {\n      field\n      message\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadTracker($data: [TrackerInput!]!) {\n    uploadTracker(data: $data) {\n      uploaded\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UploadTracker($data: [TrackerInput!]!) {\n    uploadTracker(data: $data) {\n      uploaded\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;