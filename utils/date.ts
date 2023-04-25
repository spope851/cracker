import { Maybe } from "@/generated/graphql"

const isSameDay = (date: Date, createdAt?: Maybe<string>) =>
  createdAt && new Date(createdAt).toLocaleDateString() === date.toLocaleDateString()

export { isSameDay }
