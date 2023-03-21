/* eslint-disable */
import * as types from "./graphql"
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

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
  "\n  query DashboardQuery($user: Int!) {\n    dashboard(user: $user) {\n      dashboard {\n        daysOfUse\n        thirtyDayAvg\n        sixtyDayAvg\n        ninetyDayAvg\n        yearAvg\n        thirtyDayCountNeg2\n        thirtyDayCountNeg1\n        thirtyDayCount0\n        thirtyDayCount1\n        thirtyDayCount2\n        sixtyDayCountNeg2\n        sixtyDayCountNeg1\n        sixtyDayCount0\n        sixtyDayCount1\n        sixtyDayCount2\n        ninetyDayCountNeg2\n        ninetyDayCountNeg1\n        ninetyDayCount0\n        ninetyDayCount1\n        ninetyDayCount2\n        yearCountNeg2\n        yearCountNeg1\n        yearCount0\n        yearCount1\n        yearCount2\n        thirtyDayWordcloud\n        sixtyDayWordcloud\n        ninetyDayWordcloud\n        yearWordcloud\n      }\n    }\n  }\n":
    types.DashboardQueryDocument,
  "\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n":
    types.RegisterMutationDocument,
  "\n  query WordcloudQuery($user: Int!) {\n    dashboard(user: $user) {\n      dashboard {\n        thirtyDayWordcloud\n        sixtyDayWordcloud\n        ninetyDayWordcloud\n        yearWordcloud\n      }\n    }\n  }\n":
    types.WordcloudQueryDocument,
  "\n  query Me($user: UserAuthInput!, $refetch: Boolean) {\n    me(user: $user, refetch: $refetch) {\n      error\n      user {\n        email\n        id\n        role\n        username\n        lastPost\n      }\n    }\n  }\n":
    types.MeDocument,
  "\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n":
    types.TrackerMutationDocument,
}

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
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query DashboardQuery($user: Int!) {\n    dashboard(user: $user) {\n      dashboard {\n        daysOfUse\n        thirtyDayAvg\n        sixtyDayAvg\n        ninetyDayAvg\n        yearAvg\n        thirtyDayCountNeg2\n        thirtyDayCountNeg1\n        thirtyDayCount0\n        thirtyDayCount1\n        thirtyDayCount2\n        sixtyDayCountNeg2\n        sixtyDayCountNeg1\n        sixtyDayCount0\n        sixtyDayCount1\n        sixtyDayCount2\n        ninetyDayCountNeg2\n        ninetyDayCountNeg1\n        ninetyDayCount0\n        ninetyDayCount1\n        ninetyDayCount2\n        yearCountNeg2\n        yearCountNeg1\n        yearCount0\n        yearCount1\n        yearCount2\n        thirtyDayWordcloud\n        sixtyDayWordcloud\n        ninetyDayWordcloud\n        yearWordcloud\n      }\n    }\n  }\n"
): (typeof documents)["\n  query DashboardQuery($user: Int!) {\n    dashboard(user: $user) {\n      dashboard {\n        daysOfUse\n        thirtyDayAvg\n        sixtyDayAvg\n        ninetyDayAvg\n        yearAvg\n        thirtyDayCountNeg2\n        thirtyDayCountNeg1\n        thirtyDayCount0\n        thirtyDayCount1\n        thirtyDayCount2\n        sixtyDayCountNeg2\n        sixtyDayCountNeg1\n        sixtyDayCount0\n        sixtyDayCount1\n        sixtyDayCount2\n        ninetyDayCountNeg2\n        ninetyDayCountNeg1\n        ninetyDayCount0\n        ninetyDayCount1\n        ninetyDayCount2\n        yearCountNeg2\n        yearCountNeg1\n        yearCount0\n        yearCount1\n        yearCount2\n        thirtyDayWordcloud\n        sixtyDayWordcloud\n        ninetyDayWordcloud\n        yearWordcloud\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterMutation($user: UserInput!) {\n    register(user: $user) {\n      errors {\n        field\n        message\n      }\n      user {\n        username\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query WordcloudQuery($user: Int!) {\n    dashboard(user: $user) {\n      dashboard {\n        thirtyDayWordcloud\n        sixtyDayWordcloud\n        ninetyDayWordcloud\n        yearWordcloud\n      }\n    }\n  }\n"
): (typeof documents)["\n  query WordcloudQuery($user: Int!) {\n    dashboard(user: $user) {\n      dashboard {\n        thirtyDayWordcloud\n        sixtyDayWordcloud\n        ninetyDayWordcloud\n        yearWordcloud\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Me($user: UserAuthInput!, $refetch: Boolean) {\n    me(user: $user, refetch: $refetch) {\n      error\n      user {\n        email\n        id\n        role\n        username\n        lastPost\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Me($user: UserAuthInput!, $refetch: Boolean) {\n    me(user: $user, refetch: $refetch) {\n      error\n      user {\n        email\n        id\n        role\n        username\n        lastPost\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation TrackerMutation($tracker: TrackerInput!) {\n    track(tracker: $tracker) {\n      errors {\n        message\n        field\n      }\n      track {\n        numberCreativeHours\n        overview\n        rating\n        user\n        id\n      }\n    }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
