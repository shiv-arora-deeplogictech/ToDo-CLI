#!/usr/bin/env node

const fs = require("fs");

if(!fs.existsSync("todos.json")){
    fs.writeFileSync("todos.json",JSON.stringify([]));
}

const todos = JSON.parse(fs.readFileSync("todos.json"));


const [,, command, input] = process.argv;


function getId(){
    if(todos.length===0){
        return 1; 
    } else {
        return todos[todos.length -1].id+1;
    }
}

function saveToDo(){
    fs.writeFileSync("todos.json",JSON.stringify(todos));
}
switch(command){

    case "add":
        const newTodo = {
            id: getId(),
            message: input
        }
        todos.push(newTodo);
        saveToDo();
        console.log("Added succesfully");
        break;
    case "view":
        for(let todo of todos){
            console.table(todos);
        }
        break;
    case "delete":
        const index = todos.findIndex(todo=>todo.id === parseInt(input));
        todos.splice(index,1);
        saveToDo();
        console.log("Deleted succesfully");
        break;
}