import React, { useState } from 'react'

export const SearchBox = props => {
    const [name, setName] = useState('');
    
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    }

    return (
        <form className="search" onSubmit={submitHandler}>
            <div className="row">
                <input type="text" name="query" id="query" onChange={e => setName(e.target.value)} />
                <button className="primary">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}
