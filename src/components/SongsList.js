import React from 'react';
import Table from 'react-bootstrap/Table';
import moment  from 'moment';

function SongsList (props) {

  const getTableHeader = () => {
    return (<thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Artist</th>
        <th>Content Type</th>
        <th>Category</th>
        <th>Release Date</th>
        <th>Price</th>
      </tr>
    </thead>)
  };

  const getTableContent = () => {
    var songsList = (props.songsList &&  props.songsList.feed) ?  props.songsList.feed.entry : '';
    const labelFilter = props.labelFilter;
    if(labelFilter !=='') {
      songsList = songsList.filter(val =>
        val['im:name'].label.includes(labelFilter) ||
        val['im:artist'].label.includes(labelFilter) ||
        val['im:contentType']['im:contentType'].attributes.label.includes(labelFilter) ||
        val.category.attributes.label.includes(labelFilter)
      );
    }
    if(songsList && songsList.length > 0) {
      var newArr = songsList.map(function(val, index){
        return(<tr>
          <td>{index+1}</td>
          <td>{val['im:name'].label}</td>
          <td>{val['im:artist'].label}</td>
          <td>{val['im:contentType']['im:contentType'].attributes.label}</td>
          <td>{val.category.attributes.label}</td>
          <td>{moment(val['im:releaseDate'].label).format('DD MMM YYYY')}</td>
          <td>{val['im:price'].label}</td>
          </tr>);
        })
        return newArr;
    }

  };

  return (
    <Table striped bordered hover>
      {getTableHeader()}
      <tbody>
        {getTableContent()}
      </tbody>
    </Table>
  );

}
export default SongsList;
