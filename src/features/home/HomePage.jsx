import React from 'react';

const HomePage = ({ history }) => {
  return (
    <div className="ui inverted vertical masthead center aligned segment videoContainer">
      <div class="overlay" />
      <video autoPlay loop muted>
        <source src="/assets/homepage.mp4" type="video/mp4" />
      </video>
      <div className="text-container">
        <h2>Kamp Yapılacak Yerleri Öğren, Diğer Kampçılar İle Tanış</h2>
        <div
          onClick={() => history.push('/places')}
          className="ui huge white inverted button"
        >
          KAMP ZAMANI
          <i className="right arrow icon" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

{
  /* <div className="ui text container">
<h2>Kamp Yapılacak Yerleri Öğren, Diğer Kampçılar İle Tanış</h2>
<div
  onClick={() => history.push('/places')}
  className="ui huge white inverted button"
>
  KAMP ZAMANI
  <i className="right arrow icon" />
</div>
</div> */
}
