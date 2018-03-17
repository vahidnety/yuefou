import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type Activity implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  desc: String
  type: ActivityType!
  status: ProcessStatus
  startedAt: DateTime!
  endedAt: DateTime!
  location: String!
  creator(where: UserWhereInput): User!
  participants(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  tasks(where: ActivityTaskWhereInput, orderBy: ActivityTaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActivityTask!]
}

type ActivityTask implements Node {
  id: ID!
  name: String!
  status: ProcessStatus!
  activity(where: ActivityWhereInput): Activity
  assignee(where: UserWhereInput): User
}

type Post implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  isPublished: Boolean!
  title: String!
  text: String!
  author(where: UserWhereInput): User!
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  name: String!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  myActivities(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Activity!]
  myTasks(where: ActivityTaskWhereInput, orderBy: ActivityTaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActivityTask!]
  attendedActivities(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Activity!]
  avatar: String
}

"""
A connection to a list of items.
"""
type ActivityConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ActivityEdge]!
  aggregate: AggregateActivity!
}

input ActivityCreateInput {
  title: String!
  desc: String
  type: ActivityType!
  status: ProcessStatus
  startedAt: DateTime!
  endedAt: DateTime!
  location: String!
  creator: UserCreateOneWithoutMyActivitiesInput!
  participants: UserCreateManyWithoutAttendedActivitiesInput
  tasks: ActivityTaskCreateManyWithoutActivityInput
}

input ActivityCreateManyWithoutCreatorInput {
  create: [ActivityCreateWithoutCreatorInput!]
  connect: [ActivityWhereUniqueInput!]
}

input ActivityCreateManyWithoutParticipantsInput {
  create: [ActivityCreateWithoutParticipantsInput!]
  connect: [ActivityWhereUniqueInput!]
}

input ActivityCreateOneWithoutTasksInput {
  create: ActivityCreateWithoutTasksInput
  connect: ActivityWhereUniqueInput
}

input ActivityCreateWithoutCreatorInput {
  title: String!
  desc: String
  type: ActivityType!
  status: ProcessStatus
  startedAt: DateTime!
  endedAt: DateTime!
  location: String!
  participants: UserCreateManyWithoutAttendedActivitiesInput
  tasks: ActivityTaskCreateManyWithoutActivityInput
}

input ActivityCreateWithoutParticipantsInput {
  title: String!
  desc: String
  type: ActivityType!
  status: ProcessStatus
  startedAt: DateTime!
  endedAt: DateTime!
  location: String!
  creator: UserCreateOneWithoutMyActivitiesInput!
  tasks: ActivityTaskCreateManyWithoutActivityInput
}

input ActivityCreateWithoutTasksInput {
  title: String!
  desc: String
  type: ActivityType!
  status: ProcessStatus
  startedAt: DateTime!
  endedAt: DateTime!
  location: String!
  creator: UserCreateOneWithoutMyActivitiesInput!
  participants: UserCreateManyWithoutAttendedActivitiesInput
}

"""
An edge in a connection.
"""
type ActivityEdge {
  """
  The item at the end of the edge.
  """
  node: Activity!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ActivityOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  title_ASC
  title_DESC
  desc_ASC
  desc_DESC
  type_ASC
  type_DESC
  status_ASC
  status_DESC
  startedAt_ASC
  startedAt_DESC
  endedAt_ASC
  endedAt_DESC
  location_ASC
  location_DESC
}

type ActivityPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  desc: String
  type: ActivityType!
  status: ProcessStatus
  startedAt: DateTime!
  endedAt: DateTime!
  location: String!
}

type ActivitySubscriptionPayload {
  mutation: MutationType!
  node: Activity
  updatedFields: [String!]
  previousValues: ActivityPreviousValues
}

input ActivitySubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ActivitySubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ActivitySubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ActivityWhereInput
}

"""
A connection to a list of items.
"""
type ActivityTaskConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ActivityTaskEdge]!
  aggregate: AggregateActivityTask!
}

input ActivityTaskCreateInput {
  name: String!
  status: ProcessStatus!
  activity: ActivityCreateOneWithoutTasksInput
  assignee: UserCreateOneWithoutMyTasksInput
}

input ActivityTaskCreateManyWithoutActivityInput {
  create: [ActivityTaskCreateWithoutActivityInput!]
  connect: [ActivityTaskWhereUniqueInput!]
}

input ActivityTaskCreateManyWithoutAssigneeInput {
  create: [ActivityTaskCreateWithoutAssigneeInput!]
  connect: [ActivityTaskWhereUniqueInput!]
}

input ActivityTaskCreateWithoutActivityInput {
  name: String!
  status: ProcessStatus!
  assignee: UserCreateOneWithoutMyTasksInput
}

input ActivityTaskCreateWithoutAssigneeInput {
  name: String!
  status: ProcessStatus!
  activity: ActivityCreateOneWithoutTasksInput
}

"""
An edge in a connection.
"""
type ActivityTaskEdge {
  """
  The item at the end of the edge.
  """
  node: ActivityTask!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ActivityTaskOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  status_ASC
  status_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ActivityTaskPreviousValues {
  id: ID!
  name: String!
  status: ProcessStatus!
}

type ActivityTaskSubscriptionPayload {
  mutation: MutationType!
  node: ActivityTask
  updatedFields: [String!]
  previousValues: ActivityTaskPreviousValues
}

input ActivityTaskSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ActivityTaskSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ActivityTaskSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ActivityTaskWhereInput
}

input ActivityTaskUpdateInput {
  name: String
  status: ProcessStatus
  activity: ActivityUpdateOneWithoutTasksInput
  assignee: UserUpdateOneWithoutMyTasksInput
}

input ActivityTaskUpdateManyWithoutActivityInput {
  create: [ActivityTaskCreateWithoutActivityInput!]
  connect: [ActivityTaskWhereUniqueInput!]
  disconnect: [ActivityTaskWhereUniqueInput!]
  delete: [ActivityTaskWhereUniqueInput!]
  update: [ActivityTaskUpdateWithWhereUniqueWithoutActivityInput!]
  upsert: [ActivityTaskUpsertWithWhereUniqueWithoutActivityInput!]
}

input ActivityTaskUpdateManyWithoutAssigneeInput {
  create: [ActivityTaskCreateWithoutAssigneeInput!]
  connect: [ActivityTaskWhereUniqueInput!]
  disconnect: [ActivityTaskWhereUniqueInput!]
  delete: [ActivityTaskWhereUniqueInput!]
  update: [ActivityTaskUpdateWithWhereUniqueWithoutAssigneeInput!]
  upsert: [ActivityTaskUpsertWithWhereUniqueWithoutAssigneeInput!]
}

input ActivityTaskUpdateWithoutActivityDataInput {
  name: String
  status: ProcessStatus
  assignee: UserUpdateOneWithoutMyTasksInput
}

input ActivityTaskUpdateWithoutAssigneeDataInput {
  name: String
  status: ProcessStatus
  activity: ActivityUpdateOneWithoutTasksInput
}

input ActivityTaskUpdateWithWhereUniqueWithoutActivityInput {
  where: ActivityTaskWhereUniqueInput!
  data: ActivityTaskUpdateWithoutActivityDataInput!
}

input ActivityTaskUpdateWithWhereUniqueWithoutAssigneeInput {
  where: ActivityTaskWhereUniqueInput!
  data: ActivityTaskUpdateWithoutAssigneeDataInput!
}

input ActivityTaskUpsertWithWhereUniqueWithoutActivityInput {
  where: ActivityTaskWhereUniqueInput!
  update: ActivityTaskUpdateWithoutActivityDataInput!
  create: ActivityTaskCreateWithoutActivityInput!
}

input ActivityTaskUpsertWithWhereUniqueWithoutAssigneeInput {
  where: ActivityTaskWhereUniqueInput!
  update: ActivityTaskUpdateWithoutAssigneeDataInput!
  create: ActivityTaskCreateWithoutAssigneeInput!
}

input ActivityTaskWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ActivityTaskWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ActivityTaskWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  status: ProcessStatus
  """
  All values that are not equal to given value.
  """
  status_not: ProcessStatus
  """
  All values that are contained in given list.
  """
  status_in: [ProcessStatus!]
  """
  All values that are not contained in given list.
  """
  status_not_in: [ProcessStatus!]
  activity: ActivityWhereInput
  assignee: UserWhereInput
}

input ActivityTaskWhereUniqueInput {
  id: ID
}

enum ActivityType {
  HOST
  TASK
  POTLUCK
}

input ActivityUpdateInput {
  title: String
  desc: String
  type: ActivityType
  status: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  creator: UserUpdateOneWithoutMyActivitiesInput
  participants: UserUpdateManyWithoutAttendedActivitiesInput
  tasks: ActivityTaskUpdateManyWithoutActivityInput
}

input ActivityUpdateManyWithoutCreatorInput {
  create: [ActivityCreateWithoutCreatorInput!]
  connect: [ActivityWhereUniqueInput!]
  disconnect: [ActivityWhereUniqueInput!]
  delete: [ActivityWhereUniqueInput!]
  update: [ActivityUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [ActivityUpsertWithWhereUniqueWithoutCreatorInput!]
}

input ActivityUpdateManyWithoutParticipantsInput {
  create: [ActivityCreateWithoutParticipantsInput!]
  connect: [ActivityWhereUniqueInput!]
  disconnect: [ActivityWhereUniqueInput!]
  delete: [ActivityWhereUniqueInput!]
  update: [ActivityUpdateWithWhereUniqueWithoutParticipantsInput!]
  upsert: [ActivityUpsertWithWhereUniqueWithoutParticipantsInput!]
}

input ActivityUpdateOneWithoutTasksInput {
  create: ActivityCreateWithoutTasksInput
  connect: ActivityWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ActivityUpdateWithoutTasksDataInput
  upsert: ActivityUpsertWithoutTasksInput
}

input ActivityUpdateWithoutCreatorDataInput {
  title: String
  desc: String
  type: ActivityType
  status: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  participants: UserUpdateManyWithoutAttendedActivitiesInput
  tasks: ActivityTaskUpdateManyWithoutActivityInput
}

input ActivityUpdateWithoutParticipantsDataInput {
  title: String
  desc: String
  type: ActivityType
  status: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  creator: UserUpdateOneWithoutMyActivitiesInput
  tasks: ActivityTaskUpdateManyWithoutActivityInput
}

input ActivityUpdateWithoutTasksDataInput {
  title: String
  desc: String
  type: ActivityType
  status: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  creator: UserUpdateOneWithoutMyActivitiesInput
  participants: UserUpdateManyWithoutAttendedActivitiesInput
}

input ActivityUpdateWithWhereUniqueWithoutCreatorInput {
  where: ActivityWhereUniqueInput!
  data: ActivityUpdateWithoutCreatorDataInput!
}

input ActivityUpdateWithWhereUniqueWithoutParticipantsInput {
  where: ActivityWhereUniqueInput!
  data: ActivityUpdateWithoutParticipantsDataInput!
}

input ActivityUpsertWithoutTasksInput {
  update: ActivityUpdateWithoutTasksDataInput!
  create: ActivityCreateWithoutTasksInput!
}

input ActivityUpsertWithWhereUniqueWithoutCreatorInput {
  where: ActivityWhereUniqueInput!
  update: ActivityUpdateWithoutCreatorDataInput!
  create: ActivityCreateWithoutCreatorInput!
}

input ActivityUpsertWithWhereUniqueWithoutParticipantsInput {
  where: ActivityWhereUniqueInput!
  update: ActivityUpdateWithoutParticipantsDataInput!
  create: ActivityCreateWithoutParticipantsInput!
}

input ActivityWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ActivityWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ActivityWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  desc: String
  """
  All values that are not equal to given value.
  """
  desc_not: String
  """
  All values that are contained in given list.
  """
  desc_in: [String!]
  """
  All values that are not contained in given list.
  """
  desc_not_in: [String!]
  """
  All values less than the given value.
  """
  desc_lt: String
  """
  All values less than or equal the given value.
  """
  desc_lte: String
  """
  All values greater than the given value.
  """
  desc_gt: String
  """
  All values greater than or equal the given value.
  """
  desc_gte: String
  """
  All values containing the given string.
  """
  desc_contains: String
  """
  All values not containing the given string.
  """
  desc_not_contains: String
  """
  All values starting with the given string.
  """
  desc_starts_with: String
  """
  All values not starting with the given string.
  """
  desc_not_starts_with: String
  """
  All values ending with the given string.
  """
  desc_ends_with: String
  """
  All values not ending with the given string.
  """
  desc_not_ends_with: String
  type: ActivityType
  """
  All values that are not equal to given value.
  """
  type_not: ActivityType
  """
  All values that are contained in given list.
  """
  type_in: [ActivityType!]
  """
  All values that are not contained in given list.
  """
  type_not_in: [ActivityType!]
  status: ProcessStatus
  """
  All values that are not equal to given value.
  """
  status_not: ProcessStatus
  """
  All values that are contained in given list.
  """
  status_in: [ProcessStatus!]
  """
  All values that are not contained in given list.
  """
  status_not_in: [ProcessStatus!]
  startedAt: DateTime
  """
  All values that are not equal to given value.
  """
  startedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  startedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  startedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  startedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  startedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  startedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  startedAt_gte: DateTime
  endedAt: DateTime
  """
  All values that are not equal to given value.
  """
  endedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  endedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  endedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  endedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  endedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  endedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  endedAt_gte: DateTime
  location: String
  """
  All values that are not equal to given value.
  """
  location_not: String
  """
  All values that are contained in given list.
  """
  location_in: [String!]
  """
  All values that are not contained in given list.
  """
  location_not_in: [String!]
  """
  All values less than the given value.
  """
  location_lt: String
  """
  All values less than or equal the given value.
  """
  location_lte: String
  """
  All values greater than the given value.
  """
  location_gt: String
  """
  All values greater than or equal the given value.
  """
  location_gte: String
  """
  All values containing the given string.
  """
  location_contains: String
  """
  All values not containing the given string.
  """
  location_not_contains: String
  """
  All values starting with the given string.
  """
  location_starts_with: String
  """
  All values not starting with the given string.
  """
  location_not_starts_with: String
  """
  All values ending with the given string.
  """
  location_ends_with: String
  """
  All values not ending with the given string.
  """
  location_not_ends_with: String
  creator: UserWhereInput
  participants_every: UserWhereInput
  participants_some: UserWhereInput
  participants_none: UserWhereInput
  tasks_every: ActivityTaskWhereInput
  tasks_some: ActivityTaskWhereInput
  tasks_none: ActivityTaskWhereInput
}

input ActivityWhereUniqueInput {
  id: ID
}

type AggregateActivity {
  count: Int!
}

type AggregateActivityTask {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

scalar DateTime

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

"""
A connection to a list of items.
"""
type PostConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  isPublished: Boolean
  title: String!
  text: String!
  author: UserCreateOneWithoutPostsInput!
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateWithoutAuthorInput {
  isPublished: Boolean
  title: String!
  text: String!
}

"""
An edge in a connection.
"""
type PostEdge {
  """
  The item at the end of the edge.
  """
  node: Post!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  isPublished_ASC
  isPublished_DESC
  title_ASC
  title_DESC
  text_ASC
  text_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  isPublished: Boolean!
  title: String!
  text: String!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PostSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PostSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PostWhereInput
}

input PostUpdateInput {
  isPublished: Boolean
  title: String
  text: String
  author: UserUpdateOneWithoutPostsInput
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
}

input PostUpdateWithoutAuthorDataInput {
  isPublished: Boolean
  title: String
  text: String
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PostWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PostWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  isPublished: Boolean
  """
  All values that are not equal to given value.
  """
  isPublished_not: Boolean
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  text: String
  """
  All values that are not equal to given value.
  """
  text_not: String
  """
  All values that are contained in given list.
  """
  text_in: [String!]
  """
  All values that are not contained in given list.
  """
  text_not_in: [String!]
  """
  All values less than the given value.
  """
  text_lt: String
  """
  All values less than or equal the given value.
  """
  text_lte: String
  """
  All values greater than the given value.
  """
  text_gt: String
  """
  All values greater than or equal the given value.
  """
  text_gte: String
  """
  All values containing the given string.
  """
  text_contains: String
  """
  All values not containing the given string.
  """
  text_not_contains: String
  """
  All values starting with the given string.
  """
  text_starts_with: String
  """
  All values not starting with the given string.
  """
  text_not_starts_with: String
  """
  All values ending with the given string.
  """
  text_ends_with: String
  """
  All values not ending with the given string.
  """
  text_not_ends_with: String
  author: UserWhereInput
}

input PostWhereUniqueInput {
  id: ID
}

enum ProcessStatus {
  INIT
  PENDING
  DONE
  STOP
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String!
  avatar: String
  posts: PostCreateManyWithoutAuthorInput
  myActivities: ActivityCreateManyWithoutCreatorInput
  myTasks: ActivityTaskCreateManyWithoutAssigneeInput
  attendedActivities: ActivityCreateManyWithoutParticipantsInput
}

input UserCreateManyWithoutAttendedActivitiesInput {
  create: [UserCreateWithoutAttendedActivitiesInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutMyActivitiesInput {
  create: UserCreateWithoutMyActivitiesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutMyTasksInput {
  create: UserCreateWithoutMyTasksInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutAttendedActivitiesInput {
  email: String!
  password: String!
  name: String!
  avatar: String
  posts: PostCreateManyWithoutAuthorInput
  myActivities: ActivityCreateManyWithoutCreatorInput
  myTasks: ActivityTaskCreateManyWithoutAssigneeInput
}

input UserCreateWithoutMyActivitiesInput {
  email: String!
  password: String!
  name: String!
  avatar: String
  posts: PostCreateManyWithoutAuthorInput
  myTasks: ActivityTaskCreateManyWithoutAssigneeInput
  attendedActivities: ActivityCreateManyWithoutParticipantsInput
}

input UserCreateWithoutMyTasksInput {
  email: String!
  password: String!
  name: String!
  avatar: String
  posts: PostCreateManyWithoutAuthorInput
  myActivities: ActivityCreateManyWithoutCreatorInput
  attendedActivities: ActivityCreateManyWithoutParticipantsInput
}

input UserCreateWithoutPostsInput {
  email: String!
  password: String!
  name: String!
  avatar: String
  myActivities: ActivityCreateManyWithoutCreatorInput
  myTasks: ActivityTaskCreateManyWithoutAssigneeInput
  attendedActivities: ActivityCreateManyWithoutParticipantsInput
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  avatar_ASC
  avatar_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
  avatar: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  avatar: String
  posts: PostUpdateManyWithoutAuthorInput
  myActivities: ActivityUpdateManyWithoutCreatorInput
  myTasks: ActivityTaskUpdateManyWithoutAssigneeInput
  attendedActivities: ActivityUpdateManyWithoutParticipantsInput
}

input UserUpdateManyWithoutAttendedActivitiesInput {
  create: [UserCreateWithoutAttendedActivitiesInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutAttendedActivitiesInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutAttendedActivitiesInput!]
}

input UserUpdateOneWithoutMyActivitiesInput {
  create: UserCreateWithoutMyActivitiesInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutMyActivitiesDataInput
  upsert: UserUpsertWithoutMyActivitiesInput
}

input UserUpdateOneWithoutMyTasksInput {
  create: UserCreateWithoutMyTasksInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutMyTasksDataInput
  upsert: UserUpsertWithoutMyTasksInput
}

input UserUpdateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
}

input UserUpdateWithoutAttendedActivitiesDataInput {
  email: String
  password: String
  name: String
  avatar: String
  posts: PostUpdateManyWithoutAuthorInput
  myActivities: ActivityUpdateManyWithoutCreatorInput
  myTasks: ActivityTaskUpdateManyWithoutAssigneeInput
}

input UserUpdateWithoutMyActivitiesDataInput {
  email: String
  password: String
  name: String
  avatar: String
  posts: PostUpdateManyWithoutAuthorInput
  myTasks: ActivityTaskUpdateManyWithoutAssigneeInput
  attendedActivities: ActivityUpdateManyWithoutParticipantsInput
}

input UserUpdateWithoutMyTasksDataInput {
  email: String
  password: String
  name: String
  avatar: String
  posts: PostUpdateManyWithoutAuthorInput
  myActivities: ActivityUpdateManyWithoutCreatorInput
  attendedActivities: ActivityUpdateManyWithoutParticipantsInput
}

input UserUpdateWithoutPostsDataInput {
  email: String
  password: String
  name: String
  avatar: String
  myActivities: ActivityUpdateManyWithoutCreatorInput
  myTasks: ActivityTaskUpdateManyWithoutAssigneeInput
  attendedActivities: ActivityUpdateManyWithoutParticipantsInput
}

input UserUpdateWithWhereUniqueWithoutAttendedActivitiesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutAttendedActivitiesDataInput!
}

input UserUpsertWithoutMyActivitiesInput {
  update: UserUpdateWithoutMyActivitiesDataInput!
  create: UserCreateWithoutMyActivitiesInput!
}

input UserUpsertWithoutMyTasksInput {
  update: UserUpdateWithoutMyTasksDataInput!
  create: UserCreateWithoutMyTasksInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserUpsertWithWhereUniqueWithoutAttendedActivitiesInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutAttendedActivitiesDataInput!
  create: UserCreateWithoutAttendedActivitiesInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  avatar: String
  """
  All values that are not equal to given value.
  """
  avatar_not: String
  """
  All values that are contained in given list.
  """
  avatar_in: [String!]
  """
  All values that are not contained in given list.
  """
  avatar_not_in: [String!]
  """
  All values less than the given value.
  """
  avatar_lt: String
  """
  All values less than or equal the given value.
  """
  avatar_lte: String
  """
  All values greater than the given value.
  """
  avatar_gt: String
  """
  All values greater than or equal the given value.
  """
  avatar_gte: String
  """
  All values containing the given string.
  """
  avatar_contains: String
  """
  All values not containing the given string.
  """
  avatar_not_contains: String
  """
  All values starting with the given string.
  """
  avatar_starts_with: String
  """
  All values not starting with the given string.
  """
  avatar_not_starts_with: String
  """
  All values ending with the given string.
  """
  avatar_ends_with: String
  """
  All values not ending with the given string.
  """
  avatar_not_ends_with: String
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  myActivities_every: ActivityWhereInput
  myActivities_some: ActivityWhereInput
  myActivities_none: ActivityWhereInput
  myTasks_every: ActivityTaskWhereInput
  myTasks_some: ActivityTaskWhereInput
  myTasks_none: ActivityTaskWhereInput
  attendedActivities_every: ActivityWhereInput
  attendedActivities_some: ActivityWhereInput
  attendedActivities_none: ActivityWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Mutation {
  createPost(data: PostCreateInput!): Post!
  createUser(data: UserCreateInput!): User!
  createActivity(data: ActivityCreateInput!): Activity!
  createActivityTask(data: ActivityTaskCreateInput!): ActivityTask!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateActivity(data: ActivityUpdateInput!, where: ActivityWhereUniqueInput!): Activity
  updateActivityTask(data: ActivityTaskUpdateInput!, where: ActivityTaskWhereUniqueInput!): ActivityTask
  deletePost(where: PostWhereUniqueInput!): Post
  deleteUser(where: UserWhereUniqueInput!): User
  deleteActivity(where: ActivityWhereUniqueInput!): Activity
  deleteActivityTask(where: ActivityTaskWhereUniqueInput!): ActivityTask
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertActivity(where: ActivityWhereUniqueInput!, create: ActivityCreateInput!, update: ActivityUpdateInput!): Activity!
  upsertActivityTask(where: ActivityTaskWhereUniqueInput!, create: ActivityTaskCreateInput!, update: ActivityTaskUpdateInput!): ActivityTask!
  updateManyPosts(data: PostUpdateInput!, where: PostWhereInput!): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput!): BatchPayload!
  updateManyActivities(data: ActivityUpdateInput!, where: ActivityWhereInput!): BatchPayload!
  updateManyActivityTasks(data: ActivityTaskUpdateInput!, where: ActivityTaskWhereInput!): BatchPayload!
  deleteManyPosts(where: PostWhereInput!): BatchPayload!
  deleteManyUsers(where: UserWhereInput!): BatchPayload!
  deleteManyActivities(where: ActivityWhereInput!): BatchPayload!
  deleteManyActivityTasks(where: ActivityTaskWhereInput!): BatchPayload!
}

type Query {
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  activities(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Activity]!
  activityTasks(where: ActivityTaskWhereInput, orderBy: ActivityTaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ActivityTask]!
  post(where: PostWhereUniqueInput!): Post
  user(where: UserWhereUniqueInput!): User
  activity(where: ActivityWhereUniqueInput!): Activity
  activityTask(where: ActivityTaskWhereUniqueInput!): ActivityTask
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  activitiesConnection(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActivityConnection!
  activityTasksConnection(where: ActivityTaskWhereInput, orderBy: ActivityTaskOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActivityTaskConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  activity(where: ActivitySubscriptionWhereInput): ActivitySubscriptionPayload
  activityTask(where: ActivityTaskSubscriptionWhereInput): ActivityTaskSubscriptionPayload
}
`

export type ProcessStatus = 
  'INIT' |
  'PENDING' |
  'DONE' |
  'STOP'

export type ActivityType = 
  'HOST' |
  'TASK' |
  'POTLUCK'

export type PostOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'isPublished_ASC' |
  'isPublished_DESC' |
  'title_ASC' |
  'title_DESC' |
  'text_ASC' |
  'text_DESC'

export type ActivityOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'title_ASC' |
  'title_DESC' |
  'desc_ASC' |
  'desc_DESC' |
  'type_ASC' |
  'type_DESC' |
  'status_ASC' |
  'status_DESC' |
  'startedAt_ASC' |
  'startedAt_DESC' |
  'endedAt_ASC' |
  'endedAt_DESC' |
  'location_ASC' |
  'location_DESC'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'name_ASC' |
  'name_DESC' |
  'avatar_ASC' |
  'avatar_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type ActivityTaskOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'status_ASC' |
  'status_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface UserCreateInput {
  email: String
  password: String
  name: String
  avatar?: String
  posts?: PostCreateManyWithoutAuthorInput
  myActivities?: ActivityCreateManyWithoutCreatorInput
  myTasks?: ActivityTaskCreateManyWithoutAssigneeInput
  attendedActivities?: ActivityCreateManyWithoutParticipantsInput
}

export interface PostWhereInput {
  AND?: PostWhereInput[] | PostWhereInput
  OR?: PostWhereInput[] | PostWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  isPublished?: Boolean
  isPublished_not?: Boolean
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  text?: String
  text_not?: String
  text_in?: String[] | String
  text_not_in?: String[] | String
  text_lt?: String
  text_lte?: String
  text_gt?: String
  text_gte?: String
  text_contains?: String
  text_not_contains?: String
  text_starts_with?: String
  text_not_starts_with?: String
  text_ends_with?: String
  text_not_ends_with?: String
  author?: UserWhereInput
}

export interface UserUpdateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export interface ActivityTaskWhereInput {
  AND?: ActivityTaskWhereInput[] | ActivityTaskWhereInput
  OR?: ActivityTaskWhereInput[] | ActivityTaskWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  status?: ProcessStatus
  status_not?: ProcessStatus
  status_in?: ProcessStatus[] | ProcessStatus
  status_not_in?: ProcessStatus[] | ProcessStatus
  activity?: ActivityWhereInput
  assignee?: UserWhereInput
}

export interface ActivityCreateOneWithoutTasksInput {
  create?: ActivityCreateWithoutTasksInput
  connect?: ActivityWhereUniqueInput
}

export interface ActivityTaskUpdateManyWithoutActivityInput {
  create?: ActivityTaskCreateWithoutActivityInput[] | ActivityTaskCreateWithoutActivityInput
  connect?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
  disconnect?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
  delete?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
  update?: ActivityTaskUpdateWithWhereUniqueWithoutActivityInput[] | ActivityTaskUpdateWithWhereUniqueWithoutActivityInput
  upsert?: ActivityTaskUpsertWithWhereUniqueWithoutActivityInput[] | ActivityTaskUpsertWithWhereUniqueWithoutActivityInput
}

export interface ActivityCreateWithoutTasksInput {
  title: String
  desc?: String
  type: ActivityType
  status?: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  creator: UserCreateOneWithoutMyActivitiesInput
  participants?: UserCreateManyWithoutAttendedActivitiesInput
}

export interface UserUpdateWithoutPostsDataInput {
  email?: String
  password?: String
  name?: String
  avatar?: String
  myActivities?: ActivityUpdateManyWithoutCreatorInput
  myTasks?: ActivityTaskUpdateManyWithoutAssigneeInput
  attendedActivities?: ActivityUpdateManyWithoutParticipantsInput
}

export interface UserCreateOneWithoutMyActivitiesInput {
  create?: UserCreateWithoutMyActivitiesInput
  connect?: UserWhereUniqueInput
}

export interface ActivityTaskSubscriptionWhereInput {
  AND?: ActivityTaskSubscriptionWhereInput[] | ActivityTaskSubscriptionWhereInput
  OR?: ActivityTaskSubscriptionWhereInput[] | ActivityTaskSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ActivityTaskWhereInput
}

export interface UserCreateWithoutMyActivitiesInput {
  email: String
  password: String
  name: String
  avatar?: String
  posts?: PostCreateManyWithoutAuthorInput
  myTasks?: ActivityTaskCreateManyWithoutAssigneeInput
  attendedActivities?: ActivityCreateManyWithoutParticipantsInput
}

export interface ActivitySubscriptionWhereInput {
  AND?: ActivitySubscriptionWhereInput[] | ActivitySubscriptionWhereInput
  OR?: ActivitySubscriptionWhereInput[] | ActivitySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ActivityWhereInput
}

export interface ActivityCreateManyWithoutParticipantsInput {
  create?: ActivityCreateWithoutParticipantsInput[] | ActivityCreateWithoutParticipantsInput
  connect?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
}

export interface PostSubscriptionWhereInput {
  AND?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput
  OR?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PostWhereInput
}

export interface ActivityCreateWithoutParticipantsInput {
  title: String
  desc?: String
  type: ActivityType
  status?: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  creator: UserCreateOneWithoutMyActivitiesInput
  tasks?: ActivityTaskCreateManyWithoutActivityInput
}

export interface PostWhereUniqueInput {
  id?: ID_Input
}

export interface ActivityTaskCreateManyWithoutActivityInput {
  create?: ActivityTaskCreateWithoutActivityInput[] | ActivityTaskCreateWithoutActivityInput
  connect?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
}

export interface ActivityWhereUniqueInput {
  id?: ID_Input
}

export interface ActivityTaskCreateWithoutActivityInput {
  name: String
  status: ProcessStatus
  assignee?: UserCreateOneWithoutMyTasksInput
}

export interface ActivityUpdateInput {
  title?: String
  desc?: String
  type?: ActivityType
  status?: ProcessStatus
  startedAt?: DateTime
  endedAt?: DateTime
  location?: String
  creator?: UserUpdateOneWithoutMyActivitiesInput
  participants?: UserUpdateManyWithoutAttendedActivitiesInput
  tasks?: ActivityTaskUpdateManyWithoutActivityInput
}

export interface UserCreateOneWithoutMyTasksInput {
  create?: UserCreateWithoutMyTasksInput
  connect?: UserWhereUniqueInput
}

export interface UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export interface UserCreateWithoutMyTasksInput {
  email: String
  password: String
  name: String
  avatar?: String
  posts?: PostCreateManyWithoutAuthorInput
  myActivities?: ActivityCreateManyWithoutCreatorInput
  attendedActivities?: ActivityCreateManyWithoutParticipantsInput
}

export interface UserUpsertWithWhereUniqueWithoutAttendedActivitiesInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutAttendedActivitiesDataInput
  create: UserCreateWithoutAttendedActivitiesInput
}

export interface ActivityTaskUpdateWithoutActivityDataInput {
  name?: String
  status?: ProcessStatus
  assignee?: UserUpdateOneWithoutMyTasksInput
}

export interface ActivityUpsertWithoutTasksInput {
  update: ActivityUpdateWithoutTasksDataInput
  create: ActivityCreateWithoutTasksInput
}

export interface ActivityCreateInput {
  title: String
  desc?: String
  type: ActivityType
  status?: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  creator: UserCreateOneWithoutMyActivitiesInput
  participants?: UserCreateManyWithoutAttendedActivitiesInput
  tasks?: ActivityTaskCreateManyWithoutActivityInput
}

export interface ActivityUpsertWithWhereUniqueWithoutParticipantsInput {
  where: ActivityWhereUniqueInput
  update: ActivityUpdateWithoutParticipantsDataInput
  create: ActivityCreateWithoutParticipantsInput
}

export interface ActivityTaskCreateInput {
  name: String
  status: ProcessStatus
  activity?: ActivityCreateOneWithoutTasksInput
  assignee?: UserCreateOneWithoutMyTasksInput
}

export interface UserUpsertWithoutMyTasksInput {
  update: UserUpdateWithoutMyTasksDataInput
  create: UserCreateWithoutMyTasksInput
}

export interface PostUpdateInput {
  isPublished?: Boolean
  title?: String
  text?: String
  author?: UserUpdateOneWithoutPostsInput
}

export interface UserUpdateOneWithoutMyTasksInput {
  create?: UserCreateWithoutMyTasksInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutMyTasksDataInput
  upsert?: UserUpsertWithoutMyTasksInput
}

export interface ActivityWhereInput {
  AND?: ActivityWhereInput[] | ActivityWhereInput
  OR?: ActivityWhereInput[] | ActivityWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  desc?: String
  desc_not?: String
  desc_in?: String[] | String
  desc_not_in?: String[] | String
  desc_lt?: String
  desc_lte?: String
  desc_gt?: String
  desc_gte?: String
  desc_contains?: String
  desc_not_contains?: String
  desc_starts_with?: String
  desc_not_starts_with?: String
  desc_ends_with?: String
  desc_not_ends_with?: String
  type?: ActivityType
  type_not?: ActivityType
  type_in?: ActivityType[] | ActivityType
  type_not_in?: ActivityType[] | ActivityType
  status?: ProcessStatus
  status_not?: ProcessStatus
  status_in?: ProcessStatus[] | ProcessStatus
  status_not_in?: ProcessStatus[] | ProcessStatus
  startedAt?: DateTime
  startedAt_not?: DateTime
  startedAt_in?: DateTime[] | DateTime
  startedAt_not_in?: DateTime[] | DateTime
  startedAt_lt?: DateTime
  startedAt_lte?: DateTime
  startedAt_gt?: DateTime
  startedAt_gte?: DateTime
  endedAt?: DateTime
  endedAt_not?: DateTime
  endedAt_in?: DateTime[] | DateTime
  endedAt_not_in?: DateTime[] | DateTime
  endedAt_lt?: DateTime
  endedAt_lte?: DateTime
  endedAt_gt?: DateTime
  endedAt_gte?: DateTime
  location?: String
  location_not?: String
  location_in?: String[] | String
  location_not_in?: String[] | String
  location_lt?: String
  location_lte?: String
  location_gt?: String
  location_gte?: String
  location_contains?: String
  location_not_contains?: String
  location_starts_with?: String
  location_not_starts_with?: String
  location_ends_with?: String
  location_not_ends_with?: String
  creator?: UserWhereInput
  participants_every?: UserWhereInput
  participants_some?: UserWhereInput
  participants_none?: UserWhereInput
  tasks_every?: ActivityTaskWhereInput
  tasks_some?: ActivityTaskWhereInput
  tasks_none?: ActivityTaskWhereInput
}

export interface UserCreateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export interface ActivityTaskUpdateWithWhereUniqueWithoutActivityInput {
  where: ActivityTaskWhereUniqueInput
  data: ActivityTaskUpdateWithoutActivityDataInput
}

export interface ActivityCreateManyWithoutCreatorInput {
  create?: ActivityCreateWithoutCreatorInput[] | ActivityCreateWithoutCreatorInput
  connect?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
}

export interface ActivityUpdateManyWithoutCreatorInput {
  create?: ActivityCreateWithoutCreatorInput[] | ActivityCreateWithoutCreatorInput
  connect?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
  disconnect?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
  delete?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
  update?: ActivityUpdateWithWhereUniqueWithoutCreatorInput[] | ActivityUpdateWithWhereUniqueWithoutCreatorInput
  upsert?: ActivityUpsertWithWhereUniqueWithoutCreatorInput[] | ActivityUpsertWithWhereUniqueWithoutCreatorInput
}

export interface UserCreateManyWithoutAttendedActivitiesInput {
  create?: UserCreateWithoutAttendedActivitiesInput[] | UserCreateWithoutAttendedActivitiesInput
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
}

export interface ActivityUpdateWithWhereUniqueWithoutCreatorInput {
  where: ActivityWhereUniqueInput
  data: ActivityUpdateWithoutCreatorDataInput
}

export interface PostCreateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
  connect?: PostWhereUniqueInput[] | PostWhereUniqueInput
}

export interface ActivityUpdateWithoutCreatorDataInput {
  title?: String
  desc?: String
  type?: ActivityType
  status?: ProcessStatus
  startedAt?: DateTime
  endedAt?: DateTime
  location?: String
  participants?: UserUpdateManyWithoutAttendedActivitiesInput
  tasks?: ActivityTaskUpdateManyWithoutActivityInput
}

export interface ActivityTaskCreateManyWithoutAssigneeInput {
  create?: ActivityTaskCreateWithoutAssigneeInput[] | ActivityTaskCreateWithoutAssigneeInput
  connect?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
}

export interface UserUpdateManyWithoutAttendedActivitiesInput {
  create?: UserCreateWithoutAttendedActivitiesInput[] | UserCreateWithoutAttendedActivitiesInput
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput[] | UserWhereUniqueInput
  delete?: UserWhereUniqueInput[] | UserWhereUniqueInput
  update?: UserUpdateWithWhereUniqueWithoutAttendedActivitiesInput[] | UserUpdateWithWhereUniqueWithoutAttendedActivitiesInput
  upsert?: UserUpsertWithWhereUniqueWithoutAttendedActivitiesInput[] | UserUpsertWithWhereUniqueWithoutAttendedActivitiesInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserUpdateWithWhereUniqueWithoutAttendedActivitiesInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutAttendedActivitiesDataInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface UserUpdateWithoutAttendedActivitiesDataInput {
  email?: String
  password?: String
  name?: String
  avatar?: String
  posts?: PostUpdateManyWithoutAuthorInput
  myActivities?: ActivityUpdateManyWithoutCreatorInput
  myTasks?: ActivityTaskUpdateManyWithoutAssigneeInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  name?: String
  avatar?: String
  posts?: PostUpdateManyWithoutAuthorInput
  myActivities?: ActivityUpdateManyWithoutCreatorInput
  myTasks?: ActivityTaskUpdateManyWithoutAssigneeInput
  attendedActivities?: ActivityUpdateManyWithoutParticipantsInput
}

export interface PostUpdateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
  connect?: PostWhereUniqueInput[] | PostWhereUniqueInput
  disconnect?: PostWhereUniqueInput[] | PostWhereUniqueInput
  delete?: PostWhereUniqueInput[] | PostWhereUniqueInput
  update?: PostUpdateWithWhereUniqueWithoutAuthorInput[] | PostUpdateWithWhereUniqueWithoutAuthorInput
  upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput[] | PostUpsertWithWhereUniqueWithoutAuthorInput
}

export interface ActivityTaskUpsertWithWhereUniqueWithoutAssigneeInput {
  where: ActivityTaskWhereUniqueInput
  update: ActivityTaskUpdateWithoutAssigneeDataInput
  create: ActivityTaskCreateWithoutAssigneeInput
}

export interface PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

export interface ActivityTaskUpsertWithWhereUniqueWithoutActivityInput {
  where: ActivityTaskWhereUniqueInput
  update: ActivityTaskUpdateWithoutActivityDataInput
  create: ActivityTaskCreateWithoutActivityInput
}

export interface PostUpdateWithoutAuthorDataInput {
  isPublished?: Boolean
  title?: String
  text?: String
}

export interface PostCreateInput {
  isPublished?: Boolean
  title: String
  text: String
  author: UserCreateOneWithoutPostsInput
}

export interface PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export interface ActivityCreateWithoutCreatorInput {
  title: String
  desc?: String
  type: ActivityType
  status?: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  participants?: UserCreateManyWithoutAttendedActivitiesInput
  tasks?: ActivityTaskCreateManyWithoutActivityInput
}

export interface ActivityTaskUpdateManyWithoutAssigneeInput {
  create?: ActivityTaskCreateWithoutAssigneeInput[] | ActivityTaskCreateWithoutAssigneeInput
  connect?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
  disconnect?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
  delete?: ActivityTaskWhereUniqueInput[] | ActivityTaskWhereUniqueInput
  update?: ActivityTaskUpdateWithWhereUniqueWithoutAssigneeInput[] | ActivityTaskUpdateWithWhereUniqueWithoutAssigneeInput
  upsert?: ActivityTaskUpsertWithWhereUniqueWithoutAssigneeInput[] | ActivityTaskUpsertWithWhereUniqueWithoutAssigneeInput
}

export interface PostCreateWithoutAuthorInput {
  isPublished?: Boolean
  title: String
  text: String
}

export interface ActivityTaskUpdateWithWhereUniqueWithoutAssigneeInput {
  where: ActivityTaskWhereUniqueInput
  data: ActivityTaskUpdateWithoutAssigneeDataInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  avatar?: String
  avatar_not?: String
  avatar_in?: String[] | String
  avatar_not_in?: String[] | String
  avatar_lt?: String
  avatar_lte?: String
  avatar_gt?: String
  avatar_gte?: String
  avatar_contains?: String
  avatar_not_contains?: String
  avatar_starts_with?: String
  avatar_not_starts_with?: String
  avatar_ends_with?: String
  avatar_not_ends_with?: String
  posts_every?: PostWhereInput
  posts_some?: PostWhereInput
  posts_none?: PostWhereInput
  myActivities_every?: ActivityWhereInput
  myActivities_some?: ActivityWhereInput
  myActivities_none?: ActivityWhereInput
  myTasks_every?: ActivityTaskWhereInput
  myTasks_some?: ActivityTaskWhereInput
  myTasks_none?: ActivityTaskWhereInput
  attendedActivities_every?: ActivityWhereInput
  attendedActivities_some?: ActivityWhereInput
  attendedActivities_none?: ActivityWhereInput
}

export interface ActivityTaskUpdateWithoutAssigneeDataInput {
  name?: String
  status?: ProcessStatus
  activity?: ActivityUpdateOneWithoutTasksInput
}

export interface ActivityTaskWhereUniqueInput {
  id?: ID_Input
}

export interface ActivityUpdateOneWithoutTasksInput {
  create?: ActivityCreateWithoutTasksInput
  connect?: ActivityWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: ActivityUpdateWithoutTasksDataInput
  upsert?: ActivityUpsertWithoutTasksInput
}

export interface UserUpsertWithoutMyActivitiesInput {
  update: UserUpdateWithoutMyActivitiesDataInput
  create: UserCreateWithoutMyActivitiesInput
}

export interface ActivityUpdateWithoutTasksDataInput {
  title?: String
  desc?: String
  type?: ActivityType
  status?: ProcessStatus
  startedAt?: DateTime
  endedAt?: DateTime
  location?: String
  creator?: UserUpdateOneWithoutMyActivitiesInput
  participants?: UserUpdateManyWithoutAttendedActivitiesInput
}

export interface UserCreateWithoutPostsInput {
  email: String
  password: String
  name: String
  avatar?: String
  myActivities?: ActivityCreateManyWithoutCreatorInput
  myTasks?: ActivityTaskCreateManyWithoutAssigneeInput
  attendedActivities?: ActivityCreateManyWithoutParticipantsInput
}

export interface UserUpdateOneWithoutMyActivitiesInput {
  create?: UserCreateWithoutMyActivitiesInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutMyActivitiesDataInput
  upsert?: UserUpsertWithoutMyActivitiesInput
}

export interface ActivityTaskCreateWithoutAssigneeInput {
  name: String
  status: ProcessStatus
  activity?: ActivityCreateOneWithoutTasksInput
}

export interface ActivityUpdateWithoutParticipantsDataInput {
  title?: String
  desc?: String
  type?: ActivityType
  status?: ProcessStatus
  startedAt?: DateTime
  endedAt?: DateTime
  location?: String
  creator?: UserUpdateOneWithoutMyActivitiesInput
  tasks?: ActivityTaskUpdateManyWithoutActivityInput
}

export interface ActivityUpdateWithWhereUniqueWithoutParticipantsInput {
  where: ActivityWhereUniqueInput
  data: ActivityUpdateWithoutParticipantsDataInput
}

export interface ActivityUpdateManyWithoutParticipantsInput {
  create?: ActivityCreateWithoutParticipantsInput[] | ActivityCreateWithoutParticipantsInput
  connect?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
  disconnect?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
  delete?: ActivityWhereUniqueInput[] | ActivityWhereUniqueInput
  update?: ActivityUpdateWithWhereUniqueWithoutParticipantsInput[] | ActivityUpdateWithWhereUniqueWithoutParticipantsInput
  upsert?: ActivityUpsertWithWhereUniqueWithoutParticipantsInput[] | ActivityUpsertWithWhereUniqueWithoutParticipantsInput
}

export interface UserUpdateWithoutMyActivitiesDataInput {
  email?: String
  password?: String
  name?: String
  avatar?: String
  posts?: PostUpdateManyWithoutAuthorInput
  myTasks?: ActivityTaskUpdateManyWithoutAssigneeInput
  attendedActivities?: ActivityUpdateManyWithoutParticipantsInput
}

export interface ActivityTaskUpdateInput {
  name?: String
  status?: ProcessStatus
  activity?: ActivityUpdateOneWithoutTasksInput
  assignee?: UserUpdateOneWithoutMyTasksInput
}

export interface UserCreateWithoutAttendedActivitiesInput {
  email: String
  password: String
  name: String
  avatar?: String
  posts?: PostCreateManyWithoutAuthorInput
  myActivities?: ActivityCreateManyWithoutCreatorInput
  myTasks?: ActivityTaskCreateManyWithoutAssigneeInput
}

export interface UserUpdateWithoutMyTasksDataInput {
  email?: String
  password?: String
  name?: String
  avatar?: String
  posts?: PostUpdateManyWithoutAuthorInput
  myActivities?: ActivityUpdateManyWithoutCreatorInput
  attendedActivities?: ActivityUpdateManyWithoutParticipantsInput
}

export interface ActivityUpsertWithWhereUniqueWithoutCreatorInput {
  where: ActivityWhereUniqueInput
  update: ActivityUpdateWithoutCreatorDataInput
  create: ActivityCreateWithoutCreatorInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface ActivityTaskPreviousValues {
  id: ID_Output
  name: String
  status: ProcessStatus
}

export interface ActivityTask extends Node {
  id: ID_Output
  name: String
  status: ProcessStatus
  activity?: Activity
  assignee?: User
}

export interface Post extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  isPublished: Boolean
  title: String
  text: String
  author: User
}

export interface BatchPayload {
  count: Long
}

export interface AggregateActivityTask {
  count: Int
}

export interface ActivityTaskSubscriptionPayload {
  mutation: MutationType
  node?: ActivityTask
  updatedFields?: String[]
  previousValues?: ActivityTaskPreviousValues
}

export interface Activity extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  title: String
  desc?: String
  type: ActivityType
  status?: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
  creator: User
  participants?: User[]
  tasks?: ActivityTask[]
}

/*
 * An edge in a connection.

 */
export interface ActivityTaskEdge {
  node: ActivityTask
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface ActivityTaskConnection {
  pageInfo: PageInfo
  edges: ActivityTaskEdge[]
  aggregate: AggregateActivityTask
}

export interface AggregateActivity {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface ActivityConnection {
  pageInfo: PageInfo
  edges: ActivityEdge[]
  aggregate: AggregateActivity
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  name: String
  posts?: Post[]
  myActivities?: Activity[]
  myTasks?: ActivityTask[]
  attendedActivities?: Activity[]
  avatar?: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface ActivityPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  title: String
  desc?: String
  type: ActivityType
  status?: ProcessStatus
  startedAt: DateTime
  endedAt: DateTime
  location: String
}

export interface AggregatePost {
  count: Int
}

export interface PostSubscriptionPayload {
  mutation: MutationType
  node?: Post
  updatedFields?: String[]
  previousValues?: PostPreviousValues
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

/*
 * An edge in a connection.

 */
export interface ActivityEdge {
  node: Activity
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  name: String
  avatar?: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface ActivitySubscriptionPayload {
  mutation: MutationType
  node?: Activity
  updatedFields?: String[]
  previousValues?: ActivityPreviousValues
}

export interface PostPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  isPublished: Boolean
  title: String
  text: String
}

export interface AggregateUser {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface PostConnection {
  pageInfo: PageInfo
  edges: PostEdge[]
  aggregate: AggregatePost
}

/*
 * An edge in a connection.

 */
export interface PostEdge {
  node: Post
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

export type DateTime = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  posts: (args: { where?: PostWhereInput, orderBy?: PostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Post[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  activities: (args: { where?: ActivityWhereInput, orderBy?: ActivityOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Activity[]>
  activityTasks: (args: { where?: ActivityTaskWhereInput, orderBy?: ActivityTaskOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ActivityTask[]>
  post: (args: { where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Post | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  activity: (args: { where: ActivityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Activity | null>
  activityTask: (args: { where: ActivityTaskWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<ActivityTask | null>
  postsConnection: (args: { where?: PostWhereInput, orderBy?: PostOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<PostConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  activitiesConnection: (args: { where?: ActivityWhereInput, orderBy?: ActivityOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ActivityConnection>
  activityTasksConnection: (args: { where?: ActivityTaskWhereInput, orderBy?: ActivityTaskOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ActivityTaskConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createPost: (args: { data: PostCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Post>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createActivity: (args: { data: ActivityCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Activity>
  createActivityTask: (args: { data: ActivityTaskCreateInput }, info?: GraphQLResolveInfo | string) => Promise<ActivityTask>
  updatePost: (args: { data: PostUpdateInput, where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Post | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateActivity: (args: { data: ActivityUpdateInput, where: ActivityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Activity | null>
  updateActivityTask: (args: { data: ActivityTaskUpdateInput, where: ActivityTaskWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<ActivityTask | null>
  deletePost: (args: { where: PostWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Post | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteActivity: (args: { where: ActivityWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Activity | null>
  deleteActivityTask: (args: { where: ActivityTaskWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<ActivityTask | null>
  upsertPost: (args: { where: PostWhereUniqueInput, create: PostCreateInput, update: PostUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Post>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertActivity: (args: { where: ActivityWhereUniqueInput, create: ActivityCreateInput, update: ActivityUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Activity>
  upsertActivityTask: (args: { where: ActivityTaskWhereUniqueInput, create: ActivityTaskCreateInput, update: ActivityTaskUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<ActivityTask>
  updateManyPosts: (args: { data: PostUpdateInput, where: PostWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateInput, where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyActivities: (args: { data: ActivityUpdateInput, where: ActivityWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyActivityTasks: (args: { data: ActivityTaskUpdateInput, where: ActivityTaskWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyPosts: (args: { where: PostWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyActivities: (args: { where: ActivityWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyActivityTasks: (args: { where: ActivityTaskWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  post: (args: { where?: PostSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<PostSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  activity: (args: { where?: ActivitySubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ActivitySubscriptionPayload>>
  activityTask: (args: { where?: ActivityTaskSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ActivityTaskSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Post: (where: PostWhereInput): Promise<boolean> => super.existsDelegate('query', 'posts', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    Activity: (where: ActivityWhereInput): Promise<boolean> => super.existsDelegate('query', 'activities', { where }, {}, '{ id }'),
    ActivityTask: (where: ActivityTaskWhereInput): Promise<boolean> => super.existsDelegate('query', 'activityTasks', { where }, {}, '{ id }')
  }

  query: Query = {
    posts: (args, info): Promise<Post[]> => super.delegate('query', 'posts', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    activities: (args, info): Promise<Activity[]> => super.delegate('query', 'activities', args, {}, info),
    activityTasks: (args, info): Promise<ActivityTask[]> => super.delegate('query', 'activityTasks', args, {}, info),
    post: (args, info): Promise<Post | null> => super.delegate('query', 'post', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    activity: (args, info): Promise<Activity | null> => super.delegate('query', 'activity', args, {}, info),
    activityTask: (args, info): Promise<ActivityTask | null> => super.delegate('query', 'activityTask', args, {}, info),
    postsConnection: (args, info): Promise<PostConnection> => super.delegate('query', 'postsConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    activitiesConnection: (args, info): Promise<ActivityConnection> => super.delegate('query', 'activitiesConnection', args, {}, info),
    activityTasksConnection: (args, info): Promise<ActivityTaskConnection> => super.delegate('query', 'activityTasksConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createPost: (args, info): Promise<Post> => super.delegate('mutation', 'createPost', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createActivity: (args, info): Promise<Activity> => super.delegate('mutation', 'createActivity', args, {}, info),
    createActivityTask: (args, info): Promise<ActivityTask> => super.delegate('mutation', 'createActivityTask', args, {}, info),
    updatePost: (args, info): Promise<Post | null> => super.delegate('mutation', 'updatePost', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateActivity: (args, info): Promise<Activity | null> => super.delegate('mutation', 'updateActivity', args, {}, info),
    updateActivityTask: (args, info): Promise<ActivityTask | null> => super.delegate('mutation', 'updateActivityTask', args, {}, info),
    deletePost: (args, info): Promise<Post | null> => super.delegate('mutation', 'deletePost', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteActivity: (args, info): Promise<Activity | null> => super.delegate('mutation', 'deleteActivity', args, {}, info),
    deleteActivityTask: (args, info): Promise<ActivityTask | null> => super.delegate('mutation', 'deleteActivityTask', args, {}, info),
    upsertPost: (args, info): Promise<Post> => super.delegate('mutation', 'upsertPost', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertActivity: (args, info): Promise<Activity> => super.delegate('mutation', 'upsertActivity', args, {}, info),
    upsertActivityTask: (args, info): Promise<ActivityTask> => super.delegate('mutation', 'upsertActivityTask', args, {}, info),
    updateManyPosts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyPosts', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyActivities: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyActivities', args, {}, info),
    updateManyActivityTasks: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyActivityTasks', args, {}, info),
    deleteManyPosts: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyPosts', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyActivities: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyActivities', args, {}, info),
    deleteManyActivityTasks: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyActivityTasks', args, {}, info)
  }

  subscription: Subscription = {
    post: (args, infoOrQuery): Promise<AsyncIterator<PostSubscriptionPayload>> => super.delegateSubscription('post', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    activity: (args, infoOrQuery): Promise<AsyncIterator<ActivitySubscriptionPayload>> => super.delegateSubscription('activity', args, {}, infoOrQuery),
    activityTask: (args, infoOrQuery): Promise<AsyncIterator<ActivityTaskSubscriptionPayload>> => super.delegateSubscription('activityTask', args, {}, infoOrQuery)
  }
}