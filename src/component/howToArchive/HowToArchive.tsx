import React from 'react'

// ---------------------------
//  Internal Dependencies.
// ---------------------------
import { Category } from '../../model'
import { PathBreadcrumb } from './PathBreadcrumb'
import { FileManager } from './FileManager'
import { HOWTO_VIEW_MODE_GRID_VIEW } from '../../constants'

import './HowToArchive.scss'
export interface HowToArchiveProps {
    rootCategory: Category
    requestedPath: string
}

export const HowToArchive = ({
    rootCategory,
    requestedPath
}: HowToArchiveProps) => {
    const howto =
        rootCategory.subCategoryList['linux'].howtoList['bios-update.md']
    console.log(requestedPath)

    return (
        <div>
            <PathBreadcrumb items={howto.categoryList} />
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
