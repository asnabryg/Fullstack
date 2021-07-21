import React from "react"

const Filter = (props) => {
    return (
        <form>
            <input value={props.newFilter} onChange={props.handleFilterChange} />
        </form>
    )
}

export default Filter