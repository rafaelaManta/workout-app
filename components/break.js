import React from 'react'
import BlueSvg from '../public/images/Add_Blue.svg'
import BreakSvg from '../public/images/Break.svg'

export const Break = ({ onClick }) => {

    return (
        <div className={'d-flex justify-content-between align-items-center break-btn'} >
            <div ><BreakSvg /></div>
            <h3 className={'bold'}>{'Add Break'}</h3>
            <div onClick={onClick} className={'svg'}><div><BlueSvg /></div></div>
            <style jsx>{`
                .break-btn{
                    padding:14px 29px;
                    background-color:#EBEAEA;
                    border-radius:8px;
                    box-shadow:8px 8px 18px 0 rgba(0,0,0,0.1), -8px -8px 18px 0 #FFFFFF;
                    margin-top:16px;
                    cursor:pointer;
                }
                .break-btn .svg{
                    width: 32px;
                    height: 32px;
                   
                }
                .break-btn .svg div{
    
                    top: 6px;
                    left: 6px;
                }
            `}
            </style>
        </div>
    )
}


