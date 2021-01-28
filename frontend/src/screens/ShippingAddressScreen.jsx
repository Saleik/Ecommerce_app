import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'
import { CheckoutSteps } from '../components/CheckoutSteps'

export const ShippingAddressScreen = props => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [lat, setLat] = useState(shippingAddress.lat);
    const [lng, setLng] = useState(shippingAddress.lng);

    const userAddressMap = useSelector(state => state.userAddressMap);
    const { address: addressMap } = userAddressMap;

    if (!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const shippingAddressRef = useCallback(() => {
        if (shippingAddress.address) {
            setFullName(shippingAddress.fullName);
            setAddress(shippingAddress.address);
            setCity(shippingAddress.city);
            setPostalCode(shippingAddress.postalCode);
            setCountry(shippingAddress.country);
        }
    }, [shippingAddress]);

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();

        const newLat = addressMap ? addressMap.lat : lat;
        const newLng = addressMap ? addressMap.lng : lat;

        if (addressMap) {
            setLat(addressMap.lat);
            setLng(addressMap.lng);
        }

        let moveOn = true;
        if (!newLat || !newLng) {
            moveOn = window.confirm('You did not set your location on map. Continue?')
        }

        if (moveOn) {
            dispatch(saveShippingAddress({
                fullName,
                address,
                city,
                postalCode,
                country,
                lat: newLat,
                lng: newLng
            }));
            props.history.push('/payment');
        }

    };

    const chooseOnMap = () => {
        dispatch(saveShippingAddress({
            fullName,
            address,
            city,
            postalCode,
            country,
            lat,
            lng,
        }));
        props.history.push('/map');
    }
    return (<>
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
        </div>
        <form ref={shippingAddressRef} className="form" onSubmit={submitHandler}>
            <div>
                <h1>Shipping</h1>
            </div>
            <div>
                <label htmlFor="fullName"> Full name</label>
                <input type="text" id="fullName" name="fullName" placeholder="Enter full name" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="address"> Address</label>
                <input type="text" id="address" name="address" placeholder="Enter address" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="city"> city</label>
                <input type="text" id="city" name="city" placeholder="Enter city" value={city} onChange={e => setCity(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="postalCode">Postal code</label>
                <input type="postalcode" id="postalCode" name="postalCode" placeholder="Enter postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input type="country" id="country" name="country" placeholder="Enter country" value={country} onChange={e => setCountry(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="chooseOnMap">Location</label>
                <button type="button" onClick={chooseOnMap}>Choose On Map</button>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">Continue</button>
            </div>
        </form>
    </>
    )
}
