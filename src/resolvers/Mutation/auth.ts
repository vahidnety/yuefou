import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../../utils'
import { NO_EXISTED_USER, INVALID_PASSWORD, INVALID_WX_ID } from '../../constants/error';

/*
   用户注册 
   */
async function signup(parent, args, ctx: Context, info?) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password },
  })

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}

/* 
 微信注册
*/
async function wxSignup(parent, args, ctx: Context, info?) {
  const password = await bcrypt.hash(args.id, 10)
  const user = await ctx.db.mutation.createUser({
    data: {
      name: args.name,
      wxId: args.id,
      password
    }
  })

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user
  }
}

/*
 用户登录
 */
async function login(parent, { email, password }, ctx: Context, info?) {
  const user = await ctx.db.query.user({ where: { email } })

  if (!user) {
    throw new Error(NO_EXISTED_USER)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error(INVALID_PASSWORD)
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}

/* 
微信登录
*/
async function wxLogin(parent, { id }, ctx: Context, info?) {
  const user = await ctx.db.query.user({ where: { wxId: id } })

  if (!user) {
    return wxSignup(parent, { id }, ctx, info)
  }

  const valid = await bcrypt.compare(id, user.password)
  if (!valid) {
    throw new Error(INVALID_WX_ID)
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}

export const authMutation = {
  signup: signup,
  wxSingup: wxSignup,
  login: login,
  wxLogin: wxLogin
}
