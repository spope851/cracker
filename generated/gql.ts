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
    "\n  query DashboardQuery($runningAvg: String!) {\n    dashboard(runningAvg: $runningAvg) {\n      dashboard {\n        dashboardMetrics {\n          daysOfUse\n          avgHours\n          countNegOne\n          countNegTwo\n          countZero\n          countPlusOne\n          countPlusTwo\n          overviews\n        }\n        rawData {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n": types.DashboardQueryDocument,
    "\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n": types.RegisterMutationDocument,
    "\n  query Me($refetch: Boolean) {\n    me(refetch: $refetch) {\n      me {\n        user {\n          email\n          username\n          role\n        }\n        lastPost {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n": types.TrackerMutationDocument,
    "\nmutation UpdateTracker($tracker: UpdateTrackerInput!) {\n  updateTrack(tracker: $tracker) {\n    track {\n      id\n      overview\n      numberCreativeHours\n      rating\n      user\n    }\n    errors {\n      field\n      message\n    }\n  }\n}\n": types.UpdateTrackerDocument,
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
export function graphql(source: "\n  query DashboardQuery($runningAvg: String!) {\n    dashboard(runningAvg: $runningAvg) {\n      dashboard {\n        dashboardMetrics {\n          daysOfUse\n          avgHours\n          countNegOne\n          countNegTwo\n          countZero\n          countPlusOne\n          countPlusTwo\n          overviews\n        }\n        rawData {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query DashboardQuery($runningAvg: String!) {\n    dashboard(runningAvg: $runningAvg) {\n      dashboard {\n        dashboardMetrics {\n          daysOfUse\n          avgHours\n          countNegOne\n          countNegTwo\n          countZero\n          countPlusOne\n          countPlusTwo\n          overviews\n        }\n        rawData {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me($refetch: Boolean) {\n    me(refetch: $refetch) {\n      me {\n        user {\n          email\n          username\n          role\n        }\n        lastPost {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me($refetch: Boolean) {\n    me(refetch: $refetch) {\n      me {\n        user {\n          email\n          username\n          role\n        }\n        lastPost {\n          id\n          overview\n          numberCreativeHours\n          rating\n          user\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateTracker($tracker: UpdateTrackerInput!) {\n  updateTrack(tracker: $tracker) {\n    track {\n      id\n      overview\n      numberCreativeHours\n      rating\n      user\n    }\n    errors {\n      field\n      message\n    }\n  }\n}\n"): (typeof documents)["\nmutation UpdateTracker($tracker: UpdateTrackerInput!) {\n  updateTrack(tracker: $tracker) {\n    track {\n      id\n      overview\n      numberCreativeHours\n      rating\n      user\n    }\n    errors {\n      field\n      message\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;