const express = require('express');
const app = express();
const cors = require('cors')

const PORT = 8080

app.use(cors({
    origin: 'http://localhost:5173/'
}))


let people=  [
    { id: 1, name: 'John Doe', age: 30},
    { id: 1, name: 'Jane smith', age: 25},
    { id: 1, name: 'Bob Johnson', age: 20},

];

app.get('/people', (req, res) => {
    res.json(people)
});


app.get('/people/:id', (req, res) => {
    const person = people.find(p => p.id == parseInt( req.params.id))
    if (!person) {
        return res.status(404).send('Person not found');
    }

    res.json(person);
})



app.post('people', (req, res) => {

    const newPerson = {
        id: people.length + 1,
        name: req.body.name,
        age: req.body.age
    };

    people.push(newPerson);
    res.status(201).json(newPerson);

})



app.delete('people/:id', (req, res) => {
    const personIdenx = people.findIndex(p => p.id === parseInt(req.params.id))
    if(personIdenx === -1){
        return res.status(404).send('Person not found');
    }

    const deletePerson  = people.splice(personIndex, 1);

    res.json(deletePerson[0]);

})


app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
})