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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

//Initial list of activities in order to useState
let initialList = [
  // {
  //   id: "a",
  //   name: "wash the dishes",
  // }

];


 function ImgMediaCard() {
   
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [nameTask, setNameTask] = useState('');

        /* La funcion no es necesaria hice uso de esta en el onchange */

        // function handleChange(event) {
        //   setName(event.target.value);

        // }
      
        function handleAdd() {
          setList([...list, {name: nameTask, id: uuidv4()}]);

          setNameTask('');
        }

        function handleRemove(id) {
          const newList = list.filter((item) => item.id !== id);
      
          setList(newList);
        }

        function refresh() {
          const newList = [];
          alert("Careful! Api has default values!");//Alert to indicate the user that the Api has been loaded with the Generic Value
      
          setList(newList);

        }

        
        // Este use effect es para cargar las lista solo una vez
        useEffect(() => {
          async function getRequest() {
            const urlAPI = 'https://assets.breatheco.de/apis/fake/todos/user/fpineda1410'
            const resultado = await fetch(urlAPI)
                  .then(res => res.json())
                  .then(data => data)
                  resultado.forEach(item => initialList.push({ id: uuidv4(), name: item.label }));
                  setList(initialList);
                  // initialList = [];
          }
          getRequest();
        }, [])

        // Este useeffect detecta cuando hubo un cambio en el array global (eliminar o añadir) y lo añade a la api
        useEffect (()=> { 
          async function putRequest() {
            const urlAPI = 'https://assets.breatheco.de/apis/fake/todos/user/fpineda1410'
            const json_list = [];
            
            if (list.length > 0) { 
              list.forEach((item) => { //translates the local List to the requirements of the API
                json_list.push({"label": item.name, "done":false});
              });
                await fetch(urlAPI, {
                  method: "PUT",
                  body: JSON.stringify(json_list),
                  headers: {
                    "Content-Type": "application/json"
                }})
            }
          }
          putRequest()
        },[list]);
  
  return (

//----------------------------------------------------------------MAIN
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
                name={nameTask}
                onChange={e => setNameTask(e.target.value)}
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
//----------------------------------------------------------------MAIN
  );
}

//------------------------------------------------------Verifiers in order to update the values inserted into the MAIN
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
        <TextField id="standard-basic" value={name} label={content.inputLabel} onChange={onChange} />
        <Button type="button" size="small" color="primary" onClick={onAdd}>
          {content.buttonLabel}
        </Button>
        <Button type="button" size="small" color="primary" onClick={onRefresh}>
          Delete api
        </Button>
      </div>
  );
//------------------------------------------------------END OF THE Verifiers in order to update the values inserted into the MAIN


export default ImgMediaCard;
