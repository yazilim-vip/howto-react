import React from 'react'

// ---------------------------
//  Internal Dependencies
// ---------------------------

import { PageLayout } from '../../component'
import './NotFound.scss'

export const NotFound = () => (
    <PageLayout>
        <div className='row h-100 text-center'>
            <div className='col-sm-12 my-auto'>
                <div className='glitch' data-text='NOT FOUND'>
                    NOT FOUND
                </div>
            </div>
        </div>
    </PageLayout>
)
