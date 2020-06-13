import React from 'react'
import Svg from '../public/images/Add_White.svg'

export const Exercises = ({ onClick, exercises } ) => {

    return (

        <div className={'list-container'}>
            <p>{'Top Exercises'}</p>
            <div className={'d-flex flex-wrap'}>

                {exercises.map((exercise, i) => {
                    
                    return (

                        <div key={i} className={'card'} >
                            <div className={'addSvg'} onClick={() => { onClick(exercise) }}><Svg /></div>
                            <p className={'bold'}>{exercise.fields.Name}</p>
                        </div>
                    )
                })}
            </div>
            <style jsx>
                {`
                    .list-container{
                        padding-top:24px;
                     }
                     .list-container > p {
                         line-height:20px;
                         opacity:0.3;
                         padding-bottom:16px;
                     }
                     .list-container >div{
                         justify-content:center;
                     }
                    .card{
                        width:178px;
                        height:135px;
                        position:relative;
                        border-radius:4px;
                        margin-bottom: 16px;
                        background-color:#D8D8D8;
                    }
                    .card:nth-child(2n){
                        margin-right:0;
                    }
                    .card .addSvg {
                        position:absolute;
                        top:8px;
                        right:8px;
                        cursor:pointer;
                    }
                    .card p{
                        position:absolute;
                        left:8px;
                        bottom:8px;
                        right:8px;
                        font-size:14px;
                    }
        
                `}
            </style>

        </div>

    )
}

