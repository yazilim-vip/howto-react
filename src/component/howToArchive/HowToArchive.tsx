import React from 'react'
import { Category } from '../../model'

export interface HowToArchiveProps {
    rootCategory: Category
    requestedPath: string
}

export const HowToArchive = ({
    rootCategory,
    requestedPath
}: HowToArchiveProps) => {
    console.log(requestedPath)
    return <div>new comp</div>
}
