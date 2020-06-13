import React  from "react";
import NextHead from 'next/head'

import {Header} from './header'

export const Layout = ({title,description,keywords,children}) => {
    return (
        <React.Fragment>

            <NextHead>
                <meta charSet="UTF-8"/>
                <title>{title|| ''}</title>
                <meta name="description" content={description || ''}/>
                <meta name="keywords" content={keywords || ''}/>
                <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                <meta name=" theme-color" content="#fff"/>
                <link href="https://use.typekit.net/zsc5kqi.css" rel="stylesheet"/>
                <link type="text/css" rel="stylesheet" href={`/modules.css`} />
            </NextHead>

            <Header/>
            {children}


        </React.Fragment>
    )

}
