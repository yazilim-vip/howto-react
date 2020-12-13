import { HowTo } from 'yvip-website/component'

export interface HowToComponentProps {
    events: Record<HowTo.types.HowToEvent, (...args: any[]) => void>
}
