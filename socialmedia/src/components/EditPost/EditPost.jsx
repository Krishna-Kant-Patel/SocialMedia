import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './edit.css';
import { updatepost } from "../Apis/Apicall";


function Modals(props){

  return<>
  <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="formcontainer" onSubmit={props.handleSubmit}>
        <input
          type="file"
          label="Image"
          name="image"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => props.handleFileUpload(e)}
        />
        <input onChange={props.titleCaption} type="text" name="title" className="caption" placeholder="Enter Title"  />
        <input onChange={props.titleCaption} type="text" name="caption" className="caption" placeholder="Enter Caption"  />

        <button class="button-3" nClick={props.handleClose}>Post</button>
        
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

export default function Editpost({id}) {
  
  const [postImage, setPostImage] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{

},[postImage,show])
  



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id,postImage);
    updatepost(id,postImage);
    setPostImage('')
    
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
      
      <img onClick={handleShow} width="50" height="50" src="https://img.icons8.com/bubbles/50/edit.png" alt="edit"/>
        

      
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