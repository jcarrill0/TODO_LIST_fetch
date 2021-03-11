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
const initialList = [
  {
    id: "a",
    name: "wash the dishes",
  }

];


 function ImgMediaCard() {
  const classes = useStyles();
  const [list, setList] = useState(initialList);
  const [name, setName] = useState('');
 
        function handleChange(event) {
          setName(event.target.value);

        }
      
        function handleAdd() {
          const newList = list.concat({name, id: uuidv4()});
          setList(newList);

          setName('');
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

              useEffect (()=>{

                //Put request when List changes
                function postRequest(url, list) {//data would be newlist
                    const json_list = [];
                    if (list.length > 0){
                      list.forEach((item)=>{ //translates the local List to the requirements of the API
                        json_list.push({"label": item.name, "done":false});
                      });
                    }else {
                      json_list.push({"label": 'empty', "done":false}); //Generic Value!
                    }
                    return fetch(url, {
                        
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
            //-------------------------------Synchronization with the API 
                async function Put_Get () {
                  await postRequest('https://assets.breatheco.de/apis/fake/todos/user/fpineda1410', list)
                  .then(data => console.log(data)) // Result from the `response.json()` call
                  .catch(error => console.error(error))

                  fetch('https://assets.breatheco.de/apis/fake/todos/user/fpineda1410') //Generic GET Method to the 4Geeks API
                  .then(response => response.json())
                  .then(data => console.log(data))
                }
            //-------------------------------END OF Synchronization with the API 

                Put_Get()

                
            },[list])
  
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
        <TextField id="standard-basic" value={name} label={content.inputLabel} onChange={onChange}/>
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
