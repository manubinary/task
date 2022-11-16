import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import moment  from 'moment';

function SongsList (props) {
  var [songsList, setSongsList] = useState( props.songsList.feed.entry);
  const [sortOrder, setSortOrder] = useState({'price': true, 'date' :true});

  const sortFunction = (type, oders) => {
    let songsListSort = [...songsList];
    switch (type){
    case "price":
      if (songsListSort.length > 0){
        songsListSort.sort((a, b)=>{
          if(Number(a['im:price'].attributes.amount) > Number(b['im:price'].attributes.amount)){
            return 1;
          }
          if(Number(a['im:price'].attributes.amount) < Number(b['im:price'].attributes.amount)){
            return -1;
          }
          return 0;
        });

        setSortOrder({...sortOrder, price: !oders});
      }
      break;
      case "date":
        if (songsListSort.length > 0){
          songsListSort.sort((a, b)=>{
            if(a['im:releaseDate'].label > b['im:releaseDate'].label){
                return 1;
              }
              if(a['im:releaseDate'].label < b['im:releaseDate'].label){
                return -1;
              }
            return 0;
          });
          setSortOrder({...sortOrder, date: !oders});
        }
      break;
      default:
    }
    setSongsList(oders ? songsListSort : songsListSort.reverse())
  }

  const getTableHeader = () => {
    return (<thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Artist</th>
        <th className="noWrap">Content Type</th>
        <th >Category</th>
        <th className="noWrap sortIncluded" onClick={()=>sortFunction('date', sortOrder.date)}>Release Date</th>
        <th className ="sortIncluded" onClick={()=>sortFunction('price', sortOrder.price)}>Price</th>
      </tr>
    </thead>)
  };

  const getTableContent = () => {
    const labelFilter = props.labelFilter;
      if (songsList.length > 0){
        if(labelFilter !=='') {
          songsList = songsList.filter(val =>
            val['im:name'].label.toLowerCase().includes(labelFilter.toLowerCase()) ||
            val['im:artist'].label.toLowerCase().includes(labelFilter.toLowerCase()) ||
            val['im:contentType']['im:contentType'].attributes.label.toLowerCase().includes(labelFilter.toLowerCase()) ||
            val.category.attributes.label.toLowerCase().includes(labelFilter.toLowerCase())
          );
        }
      }
    if(songsList && songsList.length > 0) {
      var newArr = songsList.map(function(val, index){
        return(<tr>
          <td>{index+1}</td>
          <td>{val['im:name'].label}</td>
          <td>{val['im:artist'].label}</td>
          <td>{val['im:contentType']['im:contentType'].attributes.label}</td>
          <td>{val.category.attributes.label}</td>
          <td className="noWrap">{moment(val['im:releaseDate'].label).format('DD MMM YYYY')}</td>
          <td>{val['im:price'].label}</td>
          </tr>);
        })
        return newArr;
    }

  };

  return (
    <Table striped bordered hover key={Math.random()}>
      {getTableHeader()}
      <tbody>
        {getTableContent()}
      </tbody>
    </Table>
  );

}
export default SongsList;
