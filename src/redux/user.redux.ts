import { Dispatch } from 'redux'
import update from 'immutability-helper'
import localStore from 'store'
import UserAPI from '@api/user.api'

// types
const SETUSERINFO = 'SETUSERINFO'
const USER = 'USER'

interface IUserInitState {
  info: any;
}
// state
const initState: IUserInitState = {
  info: {}
}

export function setUserInfo (info: any) {
  return {
    type: SETUSERINFO,
    payload: info.data
  }
}

// 获取用户信息
export function getUserInfo (name: string) {
  return async (dispatch: Dispatch) => {
    const res = await UserAPI.userLogin(name)
    if (res) {
      dispatch(setUserInfo(res))
      return {
        data: res
      }
    }
  }
}

// reducer
export function user (state = initState, action: { type: string; payload: any }) {
  switch (action.type) {
    case SETUSERINFO: {
      return update(state, {
        info: {
          $set: action.payload
        }
      })
    }
    default:
      return state
  }
}
