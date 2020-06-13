import React from 'react'


export const SearchResults = ({ onClick, results }) => {

    return (
        <ul >
            {results.map((result, i) => {
                if (result.fields.Name === 'Not Found!') return (<li key={i} className={'no-bullet'}>{result.fields.Name}</li>)
                return (

                    <li key={i} onClick={(e) => onClick(e, result)}>{result.fields.Name}</li>
                )
            })}
            <style jsx>{`
                ul{
                    list-style:none;
                }
                ul li{
                    margin-bottom: 5px;
                    cursor: pointer;
                    border-bottom: 1px solid #D8D8D8;
                    font-size: 14px;

                }
            `}
            </style>
        </ul>
    )
}

