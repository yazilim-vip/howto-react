import { HowToArchive } from 'yvip-website/component'

export interface HowToComponentProps {
    events: Record<HowToArchive.types.HowToEvent, (...args: any[]) => void>
}
