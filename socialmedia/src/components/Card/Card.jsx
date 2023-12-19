import React, { useState, useEffect, useContext } from 'react';
import './Card.css';
import Card from 'react-bootstrap/Card';
import { getPostdata } from '../Apis/Apicall';
import { deletePostData, postlikes, commetsOnPost } from '../Apis/Apicall';
import Editpost from '../EditPost/EditPost';
import { MyContext } from '../contextApi/customApi';

function Cards() {

  const { userdata } = useContext(MyContext);
  const [load, setLoad] = useState(false);
  const [commentdata, setComment] = useState({
    text: "",
    user: "krishna"
  })
  const [imagedata, setImage] = useState();
  useEffect(() => {
    getPostdata(setImage);
    if (userdata) {
      setComment({ ...commentdata, user: userdata[0].name })
    }
    else {
      setComment({ ...commentdata, user: "unknownUser" })
    }


  }, [imagedata])
  const comment = () => {
    setLoad(!load);
  }
  const commentinput = (e) => {
    const { name, value } = e.target
    setComment({
      ...commentdata,
      [name]: value
    })
  }

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
                      <Editpost id={ele._id} />
                      <button onClick={() => {
                        deletePostData(ele._id)
                      }} className="dropbtn"><img width="20" height="20" src="https://img.icons8.com/plasticine/100/filled-trash.png" alt="filled-trash" /></button>

                    </div></div>
                  <Card.Text>{ele.caption}</Card.Text>
                  <div className="user">
                    <div className="userDetail">
                      <img src="https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto/https://www.gcu.edu/sites/default/files/media/GettyImages-485337116.jpg" className='images' alt="" />
                      <p className="username">{userdata && userdata[0].name}</p>
                      <img onClick={() => postlikes(ele._id)} width="25" height="25" src="https://img.icons8.com/color/48/facebook-like-skin-type-4.png" alt="facebook-like-skin-type-4" />{ele.likes}
                      <img onClick={comment} width="24" height="24" src="https://img.icons8.com/fluency/48/speech-bubble.png" alt="speech-bubble" />

                    </div>

                    <div className="comments">

                      <input onChange={commentinput} name="text" type="text" placeholder='Comment' />
                      <img onClick={() => commetsOnPost(ele._id, commentdata)} width="35" height="35" src="https://img.icons8.com/color/48/sent--v1.png" alt="sent--v1" />


                    </div>

                  </div>
                  <div className="commentBox">
                {ele.comments.map((item)=>{
                  return<>
                  <div className="commentsection">
                  <img width="35" height="35" src="https://img.icons8.com/color/48/user.png" alt="user"/>
                  <p className="usertag">{item.user} </p>
                  <p>{item.text}</p>
                    </div></>
                })}
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
