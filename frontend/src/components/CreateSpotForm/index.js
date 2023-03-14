import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateSpotForm = () => {

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [previewImage, setPreviewImage] = useState("");
  const [image2, Setimage2] = useState("");
  const [image3, Setimage3] = useState("");
  const [image4, Setimage4] = useState("");
  const [image5, Setimage5] = useState("");

  return (
    null
  )
}

export default CreateSpotForm;
