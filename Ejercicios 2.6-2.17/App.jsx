import React, { useState, useEffect } from 'react';
import personsService from './services/numbers';
import SearchFilter from './components/SearchFilter';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonList';
import Notification from './components/Notification';



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);


  const showNotification = (message, type) => {
    setNotification({message, type});
    setTimeout(() =>{
      setNotification({message:'', type:''});
    }, 5000);
  }
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id);
  
    if(window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
      personsService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Deleted ${personToDelete.name}`, 'success');
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          showNotification('Error deleting person. Please try again.', 'error');
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      // Si la persona ya existe, pedimos confirmación
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
  
      if (confirmUpdate) {
        // Creamos un nuevo objeto con el número actualizado
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        // Enviamos una solicitud PUT para actualizar el registro
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            // Actualizamos el estado local con el registro actualizado
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}`, 'success');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            // Eliminamos del estado local el registro que ya no está en el servidor
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          });
      }
    } else {
      // Si no existe, creamos un nuevo registro
      const personObject = {
        name: newName,
        number: newNumber,
      };
  
      personsService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(`Added ${returnedPerson.name}`, 'success');
      })
        .catch(error => {
          console.error('Error adding person:', error);
          showNotification('Error adding person. Please try again.', 'error');
        });
      }
    };
  
  const personsToShow = searchTerm ? persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())) : persons;




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <SearchFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <PersonsList persons={personsToShow} onDelete={handleDelete}/>
    </div>
  );
}

export default App;


