const hasPrefix = (action: any, prefix: string) => action.type.startsWith(prefix)
const isPending = (action: any) => action.type.endsWith('/pending')
const isFulfilled = (action: any) => action.type.endsWith('/fulfilled')
const isRejected = (action: any) => action.type.endsWith('/rejected')

export const isPendingAction = (prefix: string) => (action: any): action is any => {
  // Note: this cast to any could also be `any` or whatever fits your case best
  return hasPrefix(action, prefix) && isPending(action)
}

export const isRejectedAction = (prefix: string) => (action: any): action is any => {
  // Note: this cast to any could also be `any` or whatever fits your case best - like if you had standardized errors and used `rejectWithValue`
  return hasPrefix(action, prefix) && isRejected(action)
}

export const isFulfilledAction = (prefix: string) => (action: any): action is any => {
  return hasPrefix(action, prefix) && isFulfilled(action)
}
