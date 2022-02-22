import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import { CheckBox } from "react-native-elements";

function TaskInput() {
  const [taskVal, setTaskVal] = useState("");
  const [tasklist, setTasklist] = useState([
    {
      id: 1,
      task: "Feed The Cat",
      isChecked: true,
      isChecked: false,
    },
    {
      id: 2,
      task: "Walk The Dog",
      isChecked: false,
      isChecked: false,
    },
  ]);
  const [newTaskVal, setNewTaskVal] = useState("");

  function renderTask({ item, index }) {
    return (
      <View>
        {item.isEditable ? (
          <View style={styles.singleTaskView}>
            <TextInput
              style={styles.input}
              onChangeText={newTaskInputHandler}
              placeholder={item.task}
            />
            <Button title="Modify" onPress={() => modifyBtnHandler(index)} />
            <Button title="Delete" onPress={() => deleteBtnHandler(index)} />
          </View>
        ) : item.isChecked ? (
          <View style={styles.singleTaskView}>
            <CheckBox
              checked={item.isChecked}
              onPress={() => cbHandler(index)}
            />
            <Text style={{ color: "white", fontSize: 20 }}>{item.task}</Text>
            <Button title="Delete" onPress={() => deleteBtnHandler(index)} />
          </View>
        ) : (
          <View style={styles.singleTaskView}>
            <CheckBox
              checked={item.isChecked}
              onPress={() => cbHandler(index)}
            />
            <Text style={{ color: "white", fontSize: 20 }}>{item.task}</Text>
            <Button title="Edit" onPress={() => editBtnHandler(index)} />
            <Button title="Delete" onPress={() => deleteBtnHandler(index)} />
          </View>
        )}
      </View>
    );
  }

  function inputHandler(text) {
    setTaskVal(text);
  }

  function addTaskBtnHandler() {
    let newTask = {
      id: new Date().getTime().toString(),
      task: taskVal,
      isChecked: false,
      isEditable: false,
    };
    setTasklist([...tasklist, newTask]);
    setTaskVal("");
  }

  function cbHandler(index) {
    let mylist = tasklist;
    tasklist[index].isChecked = !tasklist[index].isChecked;
    setTasklist([...mylist]);
  }

  function deleteBtnHandler(index) {
    let mylist = tasklist;
    mylist.splice(index, 1);
    setTasklist([...mylist]);
  }

  function editBtnHandler(index) {
    let mylist = tasklist;
    mylist[index].isEditable = !mylist[index].isEditable;
    setTasklist([...mylist]);
  }

  function newTaskInputHandler(task) {
    setNewTaskVal(task);
  }

  function modifyBtnHandler(index) {
    let mylist = tasklist;
    tasklist.splice(index, 1, {
      id: new Date().getTime().toString(),
      task: newTaskVal,
      isChecked: false,
      isEditable: false,
    });
    setTasklist([...mylist]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>-: Let's ToDo in react-native ! :-</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          onChangeText={inputHandler}
          value={taskVal}
        />
        <Button onPress={addTaskBtnHandler} title="Add Task" />
      </View>
      <View>
        <FlatList
          data={tasklist}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    textAlign: "center",
  },
  header: {
    fontSize: 28,
    color: "green",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    backgroundColor: "yellow",
    marginTop: "20%",
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 10,
  },
  input: {
    width: "50%",
    paddingVertical: 10,
    backgroundColor: "grey",
    color: "white",
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "red",
  },
  singleTaskView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginVertical: 10,
    backgroundColor: "blue",
    opacity: 0.4,
    color: "white",
    paddingVertical: 10,
  },
});

export default TaskInput;
