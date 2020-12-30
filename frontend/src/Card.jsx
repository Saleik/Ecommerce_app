import React from 'react'
import PropTypes from 'prop-types'

export const Card = ({_id, image, name, price, rating, description})=> {
    return  <div key={_id} className="card">
                <a href={`/products/${_id}`}>
                    <img className="medium" src={image} alt={name} />
                </a>
                <div className="card-body">
                    <a href={`/product/${_id}`}>
                        <h2>{name}</h2>
                    </a>
                    <div className="rating">
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <div>
                            <div className="price">${price}</div>
                        </div>
                    </div>
                </div>
        </div>
}

Card.propTypes = {
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

