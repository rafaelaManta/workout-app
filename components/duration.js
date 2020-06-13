import React from 'react'


export const Duration = ({ time, save }) => {

    return (
        <div className={'d-flex align-items-center'}>
            <p>{`Total time `}<span className={'bold'}>{`${time}m`}</span></p>
            <div className={'save'} onClick={save}><p>{'Save'}</p></div>
            <style jsx>{`
                p{
                    opacity:0.4;
                    margin-right:16px;
                }
                .save{
                    border-radius:8px;
                    background-image: linear-gradient(-45deg, #EBEAEA 0%, #EEEDED 100%);
                    border-image:linear-gradient(135deg, #0095FF 0%, #1979FF 100%);
                    box-shadow: 8px 8px 18px 0 rgba(25,25,25,0.1),-8px -8px 18px 0 rgba(61,142,255,0.1);
                    border:2px solid #1979FF;       
                    cursor:pointer;            
                    
                }
                .save p{
                    line-height:20px;
                    color:#1979FF;
                    padding:10px 24px;
                    opacity:1;
                    margin-right:0;
                }
            `}
            </style>
        </div>
    )
}
