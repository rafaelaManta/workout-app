import React from 'react'

 const Input = ({ name, type, value, onChangeHandler, placeholder, className }) => {

    return (
        <div className={className}>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChangeHandler}
                placeholder={placeholder}
            />
            <style jsx>
                {`
                     input{
                        outline:none;
                        text-transform: capitalize;
                        background-color: #F3F3F3;
                        padding: 18px 0px 18px 24px;
                        box-shadow: inset 4px 4px 8px 0 transparent, inset -4px -4px 8px 0 #fff;
                        margin-bottom:16px;
                     }
                     .search-bar input{
                        max-width:372px;
                        border-radius: 8px;
                    
                     }
                     .workout-name input{
                        max-width: 420px;
                        border-radius: 10px;
                        margin-bottom:24px;

                     }

                `}
            </style>
        </div>


    )
}

export default Input