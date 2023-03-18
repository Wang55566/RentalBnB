import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { readOneSpot, readSpots, updateSpot } from "../../store/spot";

import './EditSpot.css'

const EditSpotForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();

  const spot = useSelector( (state) => state.spot.singleSpot);

  const [country, setCountry] = useState(spot.country || "");
  const [address, setAddress] = useState(spot.address || "");
  const [city, setCity] = useState(spot.city || "");
  const [state, setState] = useState(spot.state || "");
  const [description, setDescription] = useState(spot.description || "");
  const [name, setName] = useState(spot.name || "");
  const [price, setPrice] = useState(spot.price || "");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(readOneSpot(id))
    dispatch(readSpots())
    const err = {};
    if(country.length < 1) {err.country = "Country is required"};
    if(address.length < 1) {err.address = "Address is required"};
    if(city.length < 1) {err.city = "City is required"};
    if(state.length < 1) {err.state = "State is required"};
    if(description.length < 30) {err.description = "Description needs a minimum of 30 characters"};
    if(name.length < 1) {err.name = "Name is required"};
    if(price.length < 1) {err.price = "Price is required"};
    setErrors(err);
  },[country, address, city, state, description, name, price, dispatch]);

  useEffect(() => {
    setErrors({})
  },[]);

  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    // const err = {}

    // if(country.length < 1) {err.country = "Country is required"};
    // if(address.length < 1) {err.address = "Address is required"};
    // if(city.length < 1) {err.city = "City is required"};
    // if(state.length < 1) {err.state = "State is required"};
    // if(description.length < 30) {err.description = "Description needs a minimum of 30 characters"};
    // if(name.length < 1) {err.name = "Name is required"};
    // if(price.length < 1) {err.price = "Price is required"};

    if(Object.values(errors).length === 0) {

    const payload = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      lat:50,
      lng:100
    }

    let spot;

    const upDatedSpot = await dispatch(updateSpot(payload, id))

    if(upDatedSpot) {
      history.push(`/spots/${upDatedSpot.payload.id}`);
    }
    }
  }

  return (
    <section className='spot-form-holder'>
      <form className='create-spot-form' onSubmit={onSubmit}>
        <p className='errors'>{errors.country}</p>
        <label>
        Country
          <input
            type ="text"
            value={country}
            onChange={updateCountry}
          />
        </label>
        <p className='errors'>{errors.address}</p>
        <label>
        Street Address
          <input
            type ="text"
            value={address}
            onChange={updateAddress}
          />
        </label>
        <p className='errors'>{errors.city}</p>
        <label>
        City
          <input
            type ="text"
            value={city}
            onChange={updateCity}
          />
        </label>
        <p className='errors'>{errors.state}</p>
        <label>
        State
          <input
            type ="text"
            value={state}
            onChange={updateState}
          />
        </label>
        <p className='errors'>{errors.description}</p>
        <label>
        Description
          <textarea
            value={description}
            onChange={updateDescription}
          />
        </label>
        <p className='errors'>{errors.name}</p>
        <label>
        Name
          <input
            type ="text"
            value={name}
            onChange={updateName}
          />
        </label>
        <p className='errors'>{errors.price}</p>
        <label>
        Price
          <input
            type ="text"
            value={price}
            onChange={updatePrice}
          />
        </label>
        <button className='edit-button' type="submit">Edit Spot</button>
      </form>
  </section>
  )
}

export default EditSpotForm;
