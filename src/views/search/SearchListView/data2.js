import { v4 as uuid } from 'uuid';
import Axios from 'axios';

const data2 = () => {
  Axios.post('http://localhost:3001/api/item/selectall')
    .then(response => {
      console.log(response);
      return response.data;
    }).catch(err => {
      return [{nombre: "tmr"}];
    });
};
export default [data2];
