import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {readSpots, createNewSpot} from '../../store/spot';

import './Form.css';

const CreateSpotForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [previewImage, setPreviewImage] = useState("");

  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  // Error Messages
  const [errors, setErrors] = useState({});

  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {

      dispatch(readSpots())
      const err = {};
      const url = previewImage.split('.');
      if(country.length < 1) {err.country = "Country is required"};
      if(address.length < 1) {err.address = "Address is required"};
      if(city.length < 1) {err.city = "City is required"};
      if(state.length < 1) {err.state = "State is required"};
      if(description.length < 30) {err.description = "Description needs a minimum of 30 characters"};
      if(name.length < 1) {err.name = "Name is required"};
      if(price.length < 1) {err.price = "Price is required"};
      if(!['jpg', 'jpeg', 'png'].includes(url[url.length - 1])) {
        err.previewImage = "Image URL needs to end in png or jpg (or jpeg)"
      }
      if(previewImage.length < 1) {err.previewImage = "Preview image is required"}

      const optional_error = {};

      const urlTwo = image2.split('.');
      const urlThree = image3.split('.');
      const urlFour = image4.split('.');
      const urlFive = image5.split('.');

      if(!['jpg', 'jpeg', 'png'].includes(urlTwo[urlTwo.length - 1])) {
        optional_error.urlTwo = "Image URL needs to end in png or jpg (or jpeg)"
      }
      if(!['jpg', 'jpeg', 'png'].includes(urlThree[urlThree.length - 1])) {
        optional_error.urlThree = "Image URL needs to end in png or jpg (or jpeg)"
      }
      if(!['jpg', 'jpeg', 'png'].includes(urlFour[urlFour.length - 1])) {
        optional_error.urlFour = "Image URL needs to end in png or jpg (or jpeg)"
      }
      if(!['jpg', 'jpeg', 'png'].includes(urlFive[urlFive.length - 1])) {
        optional_error.urlFive = "Image URL needs to end in png or jpg (or jpeg)"
      }

      setImageErrors(optional_error)

      setErrors(err);

  }, [country, address, city, state, description, name, price, , previewImage, image2, image3, image4, image5, dispatch]);

  useEffect(() => {
    setErrors({});
    setImageErrors({})
  },[])


  const updateCountry = (e) => setCountry(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updatePreivewImage = (e) => setPreviewImage(e.target.value);

  const updateImage2 = (e) => setImage2(e.target.value);
  const updateImage3 = (e) => setImage3(e.target.value);
  const updateImage4 = (e) => setImage4(e.target.value);
  const updateImage5 = (e) => setImage5(e.target.value);


  const onSubmit = async (e) => {

    e.preventDefault();

    // const err ={};
    // const url = previewImage.split('.');

    // if(country.length < 1) {err.country = "Country is required"};
    // if(address.length < 1) {err.address = "Address is required"};
    // if(city.length < 1) {err.city = "City is required"};
    // if(state.length < 1) {err.state = "State is required"};
    // if(description.length < 30) {err.description = "Description needs a minimum of 30 characters"};
    // if(name.length < 1) {err.name = "Name is required"};
    // if(price.length < 1) {err.price = "Price is required"};
    // if(!['jpg', 'jpeg', 'png'].includes(url[url.length - 1])) {
    //   err.previewImage = "Image URL needs to end in png or jpg (or jpeg)"
    // }
    // if(previewImage.length < 1) {err.previewImage = "Preview image is required"}
    if(Object.values(errors).length === 0) {

      const payload = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        previewImage,
        image2,
        image3,
        image4,
        image5,
        lat:50,
        lng:100
      }
      let newSpot;

      newSpot = await dispatch(createNewSpot(payload));

      if(newSpot) {
        history.push(`/spots/${newSpot.payload.id}`);
      }
    }
  }

  return (
    <div className='create-form'>
    <h1>Create a new Spot</h1>
    <h2>Where's your place located?</h2>
    <h3>Guests will only get your exact address once they booked a reservation.</h3>
    <section className='spot-form-holder'>
      <form className='create-spot-form' onSubmit={onSubmit}>
        <p className='errors'>{errors.country}</p>
        <label>
        Country
          <input
            type ="text"
            placeholder='Country'
            value={country}
            onChange={updateCountry}
          />
        </label>
        <p className='errors'>{errors.address}</p>
        <label>
        Street Address
          <input
            type ="text"
            placeholder='Address'
            value={address}
            onChange={updateAddress}
          />
        </label>
        <p className='errors'>{errors.city}</p>
        <label>
        City
          <input
            type ="text"
            placeholder='City'
            value={city}
            onChange={updateCity}
          />
        </label>
        <p className='errors'>{errors.state}</p>
        <label>
        State
          <input
            type ="text"
            placeholder='State'
            value={state}
            onChange={updateState}
          />
        </label>
        <h2>Describe your place to guests</h2>
        <h3>Mention the best features of your space, any special amentities like<br/>
            fast wif or parking, and what you love about the neighborhood.
        </h3>
        <label>
        Description
          <textarea
            placeholder='Please write at least 30 characters'
            value={description}
            onChange={updateDescription}
          />
        <p className='errors'>{errors.description || " "}</p>
        </label>
        <h2>Create a title for your spot</h2>
        <h3>Mention the best features of your space, any special amentities like<br>
        </br>fast wif or parking, and what you love about the neighborhood</h3>
        <label>
        Name
          <input
            type ="text"
            placeholder='Name of your spot'
            value={name}
            onChange={updateName}
          />
        <p className='errors'>{errors.name}</p>
        </label>
        <h2>Set a base price for your spot</h2>
        <h3>Competitive pricing can help your listing stand out and rank higher<br>
        </br>in search results.</h3>
        <label>
        Price
          <input
            type ="text"
            placeholder='Price per night (USD)'
            value={price}
            onChange={updatePrice}
          />
        <p className='errors'>{errors.price}</p>
        </label>
        <h2>Liven up your spot with photos</h2>
        <h3>Submit a link to at least one photo to publish your spot.</h3>
        <p className='errors'>{errors.previewImage}</p>
        <label>
        PreviewImage
          <input
            type ="text"
            placeholder='Preview Image URL'
            value={previewImage}
            onChange={updatePreivewImage}
          />
        </label>

        <p className='errors'>{imageErrors.urlTwo}</p>
        <label>
        Image
          <input
            type ="text"
            placeholder="Image URL"
            value={image2}
            onChange={updateImage2}
          />
        </label>
        <p className='errors'>{imageErrors.urlThree}</p>
        <label>
        Image
          <input
            type ="text"
            placeholder="Image URL"
            value={image3}
            onChange={updateImage3}
          />
        </label>
        <p className='errors'>{imageErrors.urlFour}</p>
        <label>
        Image
          <input
            type ="text"
            placeholder="Image URL"
            value={image4}
            onChange={updateImage4}
          />
        </label>
        <p className='errors'>{imageErrors.urlFive}</p>
        <label>
        Image
          <input
            type ="text"
            placeholder="Image URL"
            value={image5}
            onChange={updateImage5}
          />
        </label>
        <button className='create-spot' type="submit">Create Spot</button>
      </form>
  </section>
  </div>
  )
}

export default CreateSpotForm;
