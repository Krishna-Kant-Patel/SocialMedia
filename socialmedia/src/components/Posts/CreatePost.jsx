import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './create.css';

function Modals(props){

  return<>
  <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="formcontainer" onSubmit={props.handleSubmit}>
        <input
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => props.handleFileUpload(e)}
        />
        <input onChange={props.titleCaption} type="text" name="title" className="caption" placeholder="Enter Title" required />
        <input onChange={props.titleCaption} type="text" name="caption" className="caption" placeholder="Enter Caption" required />

        <button class="button-3">Post</button>
        
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
  </>
}

export default function ImageUploader() {
  
  const [postImage, setPostImage] = useState({
    image: "",
    title:"",
    caption:""
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

const url = "http://localhost:8000/uploads";
const createImage = (newImage) => axios.post(url, newImage);

  const createPost = async (post) => {
    try {
      await createImage(post);
      alert("posted successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
    setPostImage({
      image: "",
      title:"",
      caption:""
    })
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, image: base64 });
  };

  const titleCaption =(e)=>{
    const { name, value } = e.target;
    setPostImage({
      ...postImage,
      [name]:value
    });
  }

  return (
    <>
      
      
        <a onClick={handleShow}>
        Create a Post
      </a>

      
      <Modals 
      handleFileUpload={handleFileUpload}
      handleClose={handleClose}
      show={show}
      titleCaption={titleCaption}
      handleSubmit = {handleSubmit}
      />
    </>
  );
}