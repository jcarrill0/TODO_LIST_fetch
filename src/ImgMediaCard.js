import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//form items
import TextField from '@material-ui/core/TextField';

//list items requirements
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//alert
import Alert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from "uuid";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const content = {
  buttonLabel: "Add item",
  inputLabel: "Todo List"
}


const initialList = [
  {
    id: "a",
    name: "wash the dishes",
  }
];


 function ImgMediaCard() {
  const classes = useStyles();
  const [list, setList] = useState(initialList);
  //const [json_list, setjson_List] = useState(initialList);
  const [name, setName] = useState('');
 
// todo hacer un useEffect que me haga el usuario 



  function handleChange(event) {
    setName(event.target.value);
    //console.log('bandera');
  }
 
  function handleAdd() {
    const newList = list.concat({name, id: uuidv4()});
 
    setList(newList);
    // !Crear de newlist un jsonlist con laber y doctrine
    // !ver como en el useEffect meto el updater de json y cuando lo jale actualizar el name y el id con uuid()
 
    setName('');
  }

  function handleRemove(id) {
    const newList = list.filter((item) => item.id !== id);
 
    setList(newList);
  }

  function refresh() {
    const newList = [];
    alert("Careful! Api has default values!");
 
    setList(newList);

  }

  useEffect (()=>{

    //Put request when List changes
    function postRequest(url, list) {//data would be newlist
        const json_list = [];
        if (list.length > 0){
          list.forEach((item)=>{
            json_list.push({"label": item.name, "done":false});
          });
        }else {
          json_list.push({"label": 'empty', "done":false});
        }
        //aqui va la transformacion de list y se hace el setjson_list
        return fetch(url, {
            //credentials: 'same-origin', // 'include', default: 'omit'
            method: 'PUT', // 'GET', 'PUT', 'DELETE', etc.
            body: JSON.stringify(json_list), // Coordinate the body type with 'Content-Type'
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then (data=>{
            console.log(data);
        })
    }
    
    async function Put_Get () {
      await postRequest('https://assets.breatheco.de/apis/fake/todos/user/fpineda1410', list)
      .then(data => console.log(data)) // Result from the `response.json()` call
      .catch(error => console.error(error))

      fetch('https://assets.breatheco.de/apis/fake/todos/user/fpineda1410')
      .then(response => response.json())
      .then(data => console.log(data))
    }

    Put_Get()

    
},[list])
  
  return (

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
      >

      <Grid item xs={6}>
          <Card mx="auto" className={classes.root}  >
              <CardContent>
              <AddItem
                name={name}
                onChange={handleChange}
                onAdd={handleAdd}
                onRefresh={refresh}
                />

                <ListGenerator list = {list} onRemove={handleRemove}/>
              
              </CardContent>
            
            <CardActions>
              
            </CardActions>
          </Card>
      </Grid>
    </Grid>
  );
}


const ListGenerator = ({ list,onRemove }) => {
      
  return list.map((item) => (
    <ListItem key={item.id}>
      <ListItemText primary={item.name} />
      <Button variant="contained" color="secondary" onClick={()=>onRemove(item.id)}>
        X
      </Button>
    </ListItem>
  ));
}
  

  const AddItem = ({ name, onChange, onAdd,onRefresh }) => (
    
      <div>
        <TextField id="standard-basic" value={name} label={content.inputLabel} onChange={onChange}/>
        <Button type="button" size="small" color="primary" onClick={onAdd}>
          {content.buttonLabel}
        </Button>
        <Button type="button" size="small" color="primary" onClick={onRefresh}>
          Delete api
        </Button>
      </div>
  );



export default ImgMediaCard;
