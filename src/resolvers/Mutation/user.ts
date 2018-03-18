import { Context, getUserId } from "../../utils";
import * as ERROR from '../../constants/error';
import { UserUpdateInput } from "../../generated/prisma";
import * as R from 'ramda'

import { upload } from '../Mutation/upload';

export async function isUserExisted(id, ctx: Context) {
  const isExisted = await ctx.db.exists.User({ id })

  if (!isExisted) {
    return Promise.reject(ERROR.NO_EXISTED_USER)
  }
}

async function updateUser(parent, args, ctx: Context, info) {
  const userId = getUserId(ctx)

  const data = R.filter(R.complement(R.isNil), args) as UserUpdateInput

  return ctx.db.mutation.updateUser({
    data,
    where: { id: userId }
  }, info)
}

async function uploadAvatar(parent, { file }, ctx: Context, info) {
  const userId = getUserId(ctx)

  const { path } = await upload.singleUpload(parent, { file }, ctx, info)

  const data: UserUpdateInput = {
    avatar: path
  }

  return ctx.db.mutation.updateUser({
    data,
    where: { id: userId }
  }, info)
}

export const user = {
  updateUser,
  uploadAvatar
}