import React, { FC } from 'react'

import { PageLayout } from 'yvip-website/component/PageLayout'

import 'yvip-website/page/notFound/NotFound.scss'

export const NotFound: FC = () => (
    <PageLayout>
        <div className="row h-100 text-center">
            <div className="col-sm-12 my-auto">
                <div className="glitch" data-text="NOT FOUND">
                    NOT FOUND
                </div>
            </div>
        </div>
    </PageLayout>
)
