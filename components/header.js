import React from 'react'
import Avatar from '../public/images/avatar.svg'

export const Header = () => {


    return (
        <header className={'d-flex justify-content-between align-items-center p-15'}>
            <h1 className={'bold'}>{'Workout '}<span className={'light'}>{' app'}</span></h1>
            <div className={'d-flex align-items-center '}>
                <h4 className={'regular'}>{'Montana'}</h4>
                <div className={'svg'}><div><Avatar /></div></div>
            </div>


            <style jsx>
                {`
                    header{
                        margin:0 32px;
                        border-bottom:2px solid #fff;
                         box-shadow: 1px 1px 3px 0px rgba(255,255,255, 0.1), -1px -1px 3px 0px rgba(255,255,255, 0.1);
                    }
                    header .svg{
                        width:48px;
                        height:48px;
                        margin-left: 10px;
                    }
                    header .svg div{
                        left: 5px;
                        top: 4px;
                    }

                `}
            </style>
        </header>

    )


}

