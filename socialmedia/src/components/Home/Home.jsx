import React from 'react';
import './home.css';
// import ImageUpload from '../Posts/CreatePost';
import ImageUploader from '../Posts/CreatePost';
import Cards from '../Card/Card';



function Home() {
  return (

    <>

      <div className="homeImage" >
        <div className="text">
          <h1>Computer Engineering</h1>
          <p>142,675 Computer Engineers follow this</p>
        </div>

      </div>
      <div className="tabs" >
        <div className="box">
          <div className="homeMenu">All Posts(32)</div>
          <div className="homeMenu">Article</div>
          <div className="homeMenu">Events</div>
          <div className="homeMenu">Education</div>
          <div className="homeMenu">Jobs</div>
        </div>
        <div className="btns">
        <button name="" id="" className="drop">
          <ImageUploader/>
          
        </button>

          <button className="kk">+ Join Group</button>
        </div>
      </div>
      <div className="mobiletab">
        <button>All Post(320)</button>
        <select name="ksjdlfkjd" id="" disabled="disabled">
          <option value="">Filtter All</option>
          <option value="">Options</option>
          <option value="">Options</option>
          <option value="">Options</option>
        </select>
      </div>
      <Cards/>
     
    </>


  )
}

export default Home
