import React, {useState, useEffect} from 'react';
import './Home.scss';
import SongsList from './SongsList.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
  const [songsList, setSongsList] = useState('');
  const [labelFilter, setLabelFilter] = useState('');
  useEffect(()=> {
     fetch('https://itunes.apple.com/us/rss/topalbums/limit=50/json')
      .then((response) => response.json())
      .then((responseJson) => {
          setSongsList(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <Container>
      <div className="main">
        <Row>
          <Col xs={12} md={6} lg={6} className="headerContainer">
            <h2> Legalesign Music</h2>
          </Col>
          <Col xs={12} md={6} lg={6} className="searchContainer">
          <a>Search here</a>
          <input
                  type="text"
                  value={labelFilter}
                  onChange={(e) =>
                    setLabelFilter(e.target.value)
                  }
                />
          </Col>
        </Row>
        <Row>
          <Col>
            {songsList && <SongsList songsList={songsList} labelFilter={labelFilter}/>}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Home;
