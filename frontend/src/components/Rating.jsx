import React from 'react'
import PropTypes from 'prop-types'

export const Rating = props => {

    const {rating, numReviews} = props

    return <div className="rating">
                <Stars rating={rating}/>
                <span>{numReviews + ' reviews'}</span>
            </div>
}

const Stars = props =>{
    const {rating} = props
    
    let stars = []

    for(let i=0; i < 5; i++){
        stars.push(<span key={i}><i className={rating >= i + 1 ? "fa fa-star": rating >= i + 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i></span>)
    }

    return stars
}
Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired
}
