import * as common from './common'
import * as custom from './custom'

type Props = {}

export const useHook = (props: Props) => {
  return {
    common,
    custom,
  }
}

export * from './common'
export * from './custom'
