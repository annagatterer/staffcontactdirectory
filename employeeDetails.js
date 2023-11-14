import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmployeeDetailsScreen = ({ route }) => {
    const { employee } = route.params;
    const employees = [
        { id: 1, firstname: 'John', lastname: 'Smith', phone: '0299882211', department: 'ICT' },
        { id: 2, firstname: 'Sue', lastname: 'White', phone: '0388992255', department: 'Finance' },
        { id: 3, firstname: 'Bob', lastname: 'OBits', phone: '0577882255', department: 'Marketing' },
        { id: 4, firstname: 'Mary', lastname: 'Blue', phone: '0644559988', department: 'Finance' },
        { id: 5, firstname: 'Mick', lastname: 'Green', phone: '0299881122', department: 'Marketing' },
      ];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Employee Details</Text>
        <Text style={styles.text}>
          id: {employee.id} {"\n"}
          First Name: {employee.firstname}{"\n"}
          Last Name: {employee.lastname}{"\n"}
          Phone number: {employee.phone} {"\n"}
          Department: {employee.department}
        </Text>
        
      </View>
    );
  };
  



export default employeeDetails;