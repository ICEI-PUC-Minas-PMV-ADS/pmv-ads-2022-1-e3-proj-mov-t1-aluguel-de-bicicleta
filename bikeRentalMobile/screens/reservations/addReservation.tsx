import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types";
import Colors from "../../constants/Colors";
import PageHeader from "../../common/pageHeader";
import { Button, SafeAreaView, Text, ListRenderItem, StyleSheet, View, FlatList } from "react-native";
import { StyledInput, StyledLabel } from "../../common/styled";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createReservation } from "../../services/api";
import {
  Paragraph,
  Dialog,
  Portal,
  Provider,
  TextInput,
  List,
} 
from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import { getBikes } from "../../actions/bikeActions";
import { defaultPadding } from "../../constants/Layout";

function AddReservation({navigation,}: RootStackScreenProps<"AddReservation">): JSX.Element {
  const dispatch = useDispatch(); // hook for to call action

  const [newReservation, setNewReservation] = useState<PostReservation>(
    {} as PostReservation
  );
  const [show, setShow] = useState(false);
  const [data, setData] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(false);
  const [date, setDate] = useState(new Date());
  
  const [allBikes] = useState<IBike[]>([]);
   
// function showDatePicker(){
//   setDatePicker(true);
// }

// function showTimePicker(){
//   setTimePicker(true);
// }

// function onDateSelected(event, value) {
//   setDate(value);
//   setDatePicker(false);
// };

// function onTimeSelected(event, value) {
//   setTime(value);
//   setTimePicker(false);
// };


  const renderBikes: ListRenderItem<IBike> = ({ item }) => (
    <>
      <List.Item
        style={styles.listContainer}
        title={`${item.model} - ${item.color.toLocaleUpperCase}`}
        descriptionNumberOfLines={3}
        description={
          `Location: ${item.location}\n` +
          `Bike Available: ${item.isAvailable? "Yes":"No"}\n` 
        }
        onPress={() =>
          setNewReservation({ ...newReservation, bikeId: item._id })
        }
        left={(props: JSX.IntrinsicAttributes) => <List.Icon {...props} color="#f4bd5a" icon="bike" />}
      />
    </>
  );

  const existEmptiesFields = (): boolean =>
    (newReservation && !newReservation.bikeId) ||
    !newReservation.startTimestamp ||
    !newReservation.endTimestamp;

  const onSaveReservation = () => {
    if (existEmptiesFields()) {
      console.log(
        "Algum campo no formulário de Add bike não foi preenchido pelo usuário."
      );
    } else {
      console.warn(`Adding new reservation....`);
      dispatch(createReservation(newReservation));
      navigation.navigate("Root");
    }
  };

  // return (
    
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <StyledCreateReservation>
  //     <PageHeader
  //       pageName="New Reservation"
  //       navigation={navigation}
  //       style={styles.pageHeaderX}
  //     />
  //     <FlatList style
  //       data={allBikes}
  //       renderItem={renderBikes}
  //       keyExtractor={(bike: { _id: any; }) => bike._id}
  //     />
  //     <View style={styles.inputBox}>
  //       {/* <View style={styles.containerInputs}>
  //         <StyledLabel>Bike ID:</StyledLabel>
  //         <StyledInput
  //           style={styles.sombraChique}
  //           textContentType="name"
  //           value={newReservation.bikeId}
  //           onChangeText={(value) =>
  //             setNewReservation({ ...newReservation, bikeId: value })
  //           }
  //         />
  //       </View> */}
  //       <View style={styles.containerInputs}>
  //         <StyledLabel>To:</StyledLabel>
  //         <StyledInput
  //           style={styles.sombraChique}
  //           mode={"date"}
  //           value={16546404247}
  //           onPressIn={(value) =>
  //             setNewReservation({ ...newReservation, startTimestamp: value })
  //           }
  //         />
  //       </View>
  //       <View style={styles.containerInputs}>
  //         <StyledLabel>From:</StyledLabel>
  //         <StyledInput
  //           style={styles.sombraChique}
  //           mode={"date"}
  //           value={1654640424744}
  //           onPressIn={(value) =>
  //             setNewReservation({ ...newReservation, endTimestamp: value })
  //           }
  //         />
  //       </View>
  //       <View style={styles.containerButtons}>
  //         <OptionListButton
  //           onPress={onSaveReservation}
  //           style={{ elevation: 10 }}
  //         >
  //           <ButtonText>Save</ButtonText>
  //           <MaterialIcons size={25} name="save" color="white" />
  //         </OptionListButton>
  //         <OptionListButton
  //           style={{ backgroundColor: "gray", elevation: 10 }}
  //           onPress={() => navigation.goBack()}
  //         >
  //           <ButtonText>Cancel</ButtonText>
  //         </OptionListButton>
  //       </View>
  //     </View>

      { show && (<DateTimePicker
            testID="dateTimePicker"
            value= {(new Date (newReservation.startTimestamp))}
            mode={"date"}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(_event: any, value: number) => {
              setShow(false);
              //setData(moment(date).format('DD/MM/YYYY'));
             //setNewReservation({ ... newReservation, startTimeStamp: Date.parse(value)});
              setNewReservation({...newReservation, startTimestamp: value});
            }}
          />) }

  //      {/* <TouchableOpacity onPress={() => setShow(true)}>
  //         <Input
  //           label="Data"
  //           value={data}
  //           left={<TextInput.Icon name="calendar" />}
  //           editable={false}
  //         />
  //       </TouchableOpacity> */}
  //     </StyledCreateReservation>
  //   </SafeAreaView>
  // );

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <View style={styleSheet.MainContainer}>
 
  //       <Text style={styleSheet.text}>Date = {date.toDateString()}</Text>
 
  //       <Text style={styleSheet.text}>Time = {time}</Text>
 
  //       {datePicker && (
  //         <DateTimePicker
  //           value={date}
  //           mode={'date'}
  //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
  //           is24Hour={true}
  //           onChange={onDateSelected}
  //           style={styleSheet.datePicker}
  //         />
  //       )}
 
  //       {timePicker && (
  //         <DateTimePicker
  //           value={time}
  //           mode={'time'}
  //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
  //           is24Hour={false}
  //           onChange={onTimeSelected}
  //           style={styleSheet.datePicker}
  //         />
  //       )}
 
  //       {!datePicker && (
  //         <View style={{ margin: 10 }}>
  //           <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
  //         </View>
  //       )}
 
  //       {!timePicker && (
  //         <View style={{ margin: 10 }}>
  //           <Button title="Show Time Picker" color="green" onPress={showTimePicker} />
  //         </View>
  //       )}
 
  //     </View>
  //   </SafeAreaView>
  // );
}

export default AddReservation;

const styleSheet = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white'
  },
 
  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },
 
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
 
});

const StyledCreateReservation = styled.KeyboardAvoidingView`
  padding: ${defaultPadding}px;
  display: flex;
  flex-direction: column;
  background-color: #f7d08a;
`;

const styles = StyleSheet.create({
  // pageHeaderX: {
  //   padding: 10,
  // },
  // containerButtons: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  // containerInputs: {
  //   flex: 0.25,
  //   borderRadius: 10,
  // },
  // inputBox: {
  //   flex: 1,
  //   borderRadius: 20,
  //   margin: 10,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   paddingBottom: 60,
  //   justifyContent: "center",
  // },
  // sombraChique: {
  //   elevation: 10,
  // },
  // listContainer: {
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   margin: 5,
  //   elevation: 5,
  // },
});

const OptionListButton = styled.Pressable`
  flex: 1;
  width: 175px;
  padding: 10px;
  background: ${Colors.light.yellow};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 9px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
  padding-right: 10px;
`;

function value(value: any) {
  throw new Error("Function not implemented.");
}

