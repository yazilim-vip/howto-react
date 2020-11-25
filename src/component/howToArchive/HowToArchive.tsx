import React, { useState } from 'react'

// ---------------------------
//  Internal Dependencies.
// ---------------------------
import { Category } from '../../model'
import { PathBreadcrumb } from './child/PathBreadcrumb'
import { FileManager } from './child/FileManager'
import {
    FileManagerViewMode,
    HOWTO_DEFAULT_VIEW_MODE,
    HOWTO_VIEW_MODE_GRID_VIEW
} from '../../constants'

import './HowToArchive.scss'
import { parsePathAndSetContent } from '../../util'
export interface HowToArchiveProps {
    rootCategory: Category
    requestedPath: string
    initialViewMode: FileManagerViewMode
}

export const HowToArchive = ({
    rootCategory,
    requestedPath,
    initialViewMode
}: HowToArchiveProps) => {
    const [viewMode, setViewMode] = useState(
        initialViewMode || HOWTO_DEFAULT_VIEW_MODE
    )

    const parsedUrl = parsePathAndSetContent(rootCategory, requestedPath)
    return (
        <div>
            <PathBreadcrumb items={parsedUrl.categoryNames} />
            <FileManager
                viewMode={HOWTO_VIEW_MODE_GRID_VIEW}
                howToList={[
                    {
                        name: 'emre',
                        path: '/howto/sen'
                    }
                ]}
                categoryList={[
                    {
                        name: 'emre',
                        path: '/howto/emre'
                    }
                ]}
            />
        </div>
    )
}
