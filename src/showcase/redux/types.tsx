import { Action } from './actions'

export const TOGGLE_FM_VIEW_MODE = 'TOGGLE_FM_VIEW_MODE'

type ToggleAction = Action<typeof TOGGLE_FM_VIEW_MODE, undefined>

export type HowToActions = ToggleAction
