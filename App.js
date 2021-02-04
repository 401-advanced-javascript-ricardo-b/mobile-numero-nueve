import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

export default function App() {

  const [stateVar, setStateVar] = useState('')
  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);

  const callContact = (contact)=>{
    console.log({contact})
    let phoneNumber = contact.phoneNumbers[0].number.replace(/[\(\)\-\s+]/g, '');
  }

  const showContacts = async()=>{
    //get all contacts
    const contactList = await Contacts.getContactsAsync();
    setContacts(contactList.data);
  }

  const getPermissions = async()=>{
    const {status} = await Permissions.askAsync(Permissions.CONTACTS);
    if(status === 'granted'){
      setPermissions(true);
    }else{
      setPermissions(false)
    }
  }

  useEffect(()=>{
    getPermissions();
  }, [])

  return (
    <View style={styles.container}>
      <Text>Hello {stateVar}!</Text>
      <Button
        onPress={()=> setStateVar('Bob')}
        title="Click to Display Name"
      ></Button>
      <Button
        onPress={showContacts}
        title="show contacts"
      ></Button>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({item})=> <Button title={item.name} onPress={()=> callContact(item)} />}
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
