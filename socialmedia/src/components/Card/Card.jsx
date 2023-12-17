import React, { useState, useEffect } from 'react';
import './Card.css';
import Card from 'react-bootstrap/Card';

function Cards() {
  const [imagedata, setImage] = useState();
  useEffect(() => {
    fetch("http://localhost:8000/image")
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      }).catch((e) => console.log(e))
  }, [])
  return (
    <>
      <div className="cardContainer">
        {imagedata &&
          imagedata.map((ele) => {
            return <>
              <Card className="cardsize">
                <Card.Img variant="top" className="imagesize" src={ele.image} />
                <Card.Body>
                  <Card.Text>Article</Card.Text>
                  <div className="title">
                    <Card.Title>
                      {ele.title}

                    </Card.Title>
                    <div className="dropdown" >
                      <button className="dropbtn">...</button>
                      <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                      </div>
                    </div></div>
                  <Card.Text>{ele.caption}</Card.Text>
                  <div className="user">
                    <div className="userDetail">
                      <img src="https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto/https://www.gcu.edu/sites/default/files/media/GettyImages-485337116.jpg" className='images' alt="" />
                      <p className="username">Krishna</p>
                    </div>
                    <div className="share">
                      <i class="fa fa-eye-slash" >1.4k views</i>
                      <i class="fa fa-share-alt" ></i>
                    </div>

                  </div>
                </Card.Body>
              </Card>

            </>
          })
        }





      </div>

    </>
  )
}

export default Cards;
