import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
        <Stack.Screen name="CreateEmployee" component={CreateEmployee} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation, route }) => {
  const [employees, setEmployees] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (route.params && route.params.newEmployee) {
      setEmployees((prevEmployees) => [...prevEmployees, route.params.newEmployee]);
    }

    if (route.params && route.params.updatedEmployees) {
      setEmployees(route.params.updatedEmployees);
    }
  }, [route.params]);

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };
<view></view>
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Contact Directory</Text>
      <View style={styles.gap} />
      <SearchBar
        navigation={navigation}
        employees={employees}
        updateSearchResults={updateSearchResults}
      />
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Button
              title={`${item.firstname} ${item.lastname}`}
              onPress={() => {
                navigation.navigate('EmployeeDetails', { employee: item, setEmployees });
              }}
            />
          )}
        />
      ) : (
        <Text>No results found</Text>
      )}
    </View>
  );
};

const EmployeeDetailsScreen = ({ route, navigation }) => {
  const { employee, setEmployees } = route.params;

  const [updatedFirstName, setUpdatedFirstName] = useState(employee.firstname);
  const [updatedLastName, setUpdatedLastName] = useState(employee.lastname);
  const [updatedPhone, setUpdatedPhone] = useState(employee.phone);
  const [updatedDepartment, setUpdatedDepartment] = useState(employee.department);

  const updateEmployeeDetails = () => {
    const updatedEmployee = {
      id: employee.id,
      firstname: updatedFirstName,
      lastname: updatedLastName,
      phone: updatedPhone,
      department: updatedDepartment,
    };

    const currentEmployees = route.params?.employees || [];

    const updatedEmployees = currentEmployees.map((emp) =>
      emp.id === employee.id ? updatedEmployee : emp
    );

    
    setEmployees(updatedEmployees);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Details</Text>
      <Text style={styles.text}>
        Id: {employee.id} {"\n"}
        First Name: {employee.firstname}{"\n"}
        Last Name: {employee.lastname}{"\n"}
        Phone number: {employee.phone} {"\n"}
        Department: {employee.department}
      </Text>
      


      <TextInput style={styles.input}
        placeholder="Updated First Name"
        onChangeText={(text) => setUpdatedFirstName(text)}
        value={updatedFirstName}
      />
      <TextInput style={styles.input}
        placeholder="Updated Last Name"
        onChangeText={(text) => setUpdatedLastName(text)}
        value={updatedLastName}
      />
      <TextInput style={styles.input}
        placeholder="Updated Phone number"
        onChangeText={(text) => setUpdatedPhone(text)}
        value={updatedPhone}
      />
      <TextInput style={styles.input}
        placeholder="Updated Department"
        onChangeText={(text) => setUpdatedDepartment(text)}
        value={updatedDepartment}
      />

      <Button title="Update Employee" onPress={updateEmployeeDetails} />
    </View>
  );
};


const CreateEmployee = ({ navigation }) => {
  const [id, setID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepart] = useState('');

  const recordEmployee = () => {
    const newEmployee = { id, firstname: firstName, lastname: lastName, phone, department };
    alert(
      `New Employee recorded:\nID: ${newEmployee.id}\nFirst Name: ${newEmployee.firstname}\nLast Name: ${newEmployee.lastname}\nPhone number:${phone}\nDepartment: ${newEmployee.department}`
    );

    navigation.navigate('Home', { newEmployee });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Id"
        onChangeText={(number) => setID(number)}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        onChangeText={(number) => setPhone(number)}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        onChangeText={(text) => setDepart(text)}
        value={department}
      />
      <Button title="Record Employee" onPress={recordEmployee} />
    </View>
  );
};

const SearchBar = ({ navigation, employees, updateSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (!trimmedQuery) {
      setErrorVisible(true);
      setSearchClicked(true);
      updateSearchResults([]);
      setShowAll(false); // Reset showAll state
      return;
    }

    setErrorVisible(false);

    const filteredItems = employees.filter((employee) => {
      const fullName = `${employee.firstname} ${employee.lastname}`.toLowerCase();
      return fullName.includes(trimmedQuery);
    });

    updateSearchResults(filteredItems);
    setSearchClicked(true);
    setShowAll(false); // Reset showAll state
  };

  const handleShowAll = () => {
    updateSearchResults(employees);
    setSearchClicked(false);
    setShowAll(true);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
      />
      <Button title="Search" onPress={handleSearch} />
      <View style={styles.gap} />

      <Button title="Show All Employees" onPress={handleShowAll} />
      <View style={styles.gap} />

      <Button title="Create New Employee" onPress={() => navigation.navigate('CreateEmployee')} />
      <View style={styles.gap} />
      {errorVisible && searchClicked && (
        <Text style={styles.errorText}>Please enter a name to search.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415BBA',
    alignItems: 'center',
  },
  title: {
    color: '#010C33',
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 30,
    fontStyle:'italic',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  gap: {
    padding: 10,
  },
  text: {
    color: '#001A0D',
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 3,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 10,
    fontStyle:'normal'
  },
});

export default App;