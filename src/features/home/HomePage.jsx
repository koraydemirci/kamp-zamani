import React from 'react';

const HomePage = ({ history }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          {/* <h1 className="ui inverted stackable header">
            <div className="content">KAMP ZAMANI</div>
          </h1> */}
          <h2>Kamp Yapılacak Yerleri Öğren, Diğer Kampçılar İle Tanış</h2>
          <div
            onClick={() => history.push('/campingEvents')}
            className="ui huge white inverted button"
          >
            KAMP ZAMANI
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
