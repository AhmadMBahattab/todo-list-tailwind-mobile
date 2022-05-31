import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import GrediantContainer from "../components/GrediantContainer";
import axios from "axios";
import { FAB, Overlay, Input } from "@rneui/base";
import {
  MaterialCommunityIcons,
  Feather,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";
import DatePicker from "react-native-modern-datepicker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = () => {
  const [modalOn, setModalOn] = useState(false);
  const [calenderOpen, setcalenderOpen] = useState(false);
  const [taskName, settaskName] = useState("");
  const [taskDetails, settaskDetails] = useState("");
  const [taskDate, settaskDate] = useState("");
  const [toDoArray, settoDoArray] = useState([
    {
      _id: 1,
      taskName: "shopping",
      taskDate: "2022-06-30",
      taskDetails: "buy new cloths for the gym",
      taskOpen: false,
    },
    // {
    //   _id: 3,
    //   taskName: "Work",
    //   taskDate: "2022-06-30",
    //   taskDetails: "buy new cloths for the gym",
    //   taskOpen: false,
    // },
    // {
    //   _id: 4,
    //   taskName: "study ",
    //   taskDate: "2022-06-30",
    //   taskDetails: "buy new cloths for the gym",
    //   taskOpen: false,
    // },
  ]);

  //   useEffect(() => {
  //     async function getData() {
  //       const { data: tasks } = await axios.get("http://localhost:5500");
  //       console.log(data);
  //       settoDoArray(tasks);
  //     }
  //     getData().catch((err) => console.log("err is ", err));
  //   }, []);

  const openModel = () => {
    setModalOn(!modalOn);
  };

  const addTask = (name, date, details) => {
    let tasksArary = [...toDoArray];
    if (name === "" || name == null) {
      return alert("Must add task name");
    }
    let newTask = {
      _id: Date.now(),
      taskName: name,
      taskDate: date,
      taskDetails: details,
    };

    tasksArary.push(newTask);

    // const find = await axios.post("http://localhost:5500", newTask);

    settoDoArray(tasksArary);
    setModalOn(false);
    settaskDate("");
    settaskDetails("");
    settaskName("");
    console.log("Task added ", newTask);
  };

  const deleteTask = async (task) => {
    let tasksArr = [...toDoArray];
    console.log("Delete sucsses ", task);
    tasksArr = tasksArr.filter((todo) => {
      return todo._id !== task._id;
    });
    settoDoArray(tasksArr);
    // const find = await axios.put("http://localhost:5500", task);
    // toast.success("Task deleted ");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
          paddingTop: 60,
          flex: 1,
        }}
      >
        {toDoArray.length > 0 ? (
          <ScrollView>
            {toDoArray.map((item, index) => (
              <>
                <View key={index} style={styles.singleTaskContainer}>
                  <View>
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}: {item.taskName}
                    </Text>
                  </View>
                  <View style={{ padding: 2 }}>
                    <TouchableOpacity onPress={() => deleteTask(item)}>
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.singleTaskDetailsContainer}>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                      }}
                    >
                      {item.taskDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",

                        marginTop: 2,
                      }}
                    >
                      {item.taskDetails}
                    </Text>
                  </View>
                </View>
              </>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, color: "white" }}>
              No tasks at all !! add some
            </Text>
            <TouchableOpacity onPress={openModel}>
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  backgroundColor: "#031738",
                  width: windowWidth / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ fontSize: 19, color: "white", fontWeight: "bold" }}
                >
                  Add tasks
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {toDoArray.length > 0 ? (
        <View
          style={{
            backgroundColor: "transparent",
            flex: 0.05,
            justifyContent: "flex-end",
            padding: 20,
            flexDirection: "row",
          }}
        >
          <FAB
            icon={{ name: "add", color: "white" }}
            size="large"
            onPress={openModel}
          />
        </View>
      ) : null}
      <Overlay
        animationType="slide"
        isVisible={modalOn}
        onBackdropPress={openModel}
        overlayStyle={{
          backgroundColor: "white",
          width: windowWidth,
          paddingTop: 20,
        }}
        fullScreen
      >
        <ScrollView style={styles.taskFormContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View></View>
            <TouchableOpacity onPress={openModel}>
              <View style={{ padding: 10 }}>
                <MaterialIcons name="cancel" size={28} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          {!calenderOpen ? (
            <>
              <Input
                placeholder={"Task name"}
                value={taskName}
                underlineColorAndroid="rgba(0,0,0,0)"
                inputContainerStyle={{
                  backgroundColor: "white",
                  padding: 5,
                  paddingLeft: 10,
                  borderRadius: 10,
                  borderColor: "lightgray",
                  borderWidth: 1,
                }}
                selectionColor="#38487a"
                maxLength={20}
                style={{ backgroundColor: "white", fontSize: 15 }}
                leftIcon={
                  <View style={{ marginRight: 10 }}>
                    <Octicons name="tasklist" size={24} color="black" />
                  </View>
                }
                rightIcon={
                  taskName.length > 0 ? (
                    <View>
                      <Feather
                        name={"check-circle"}
                        size={20}
                        color={taskName.length == 0 ? "gray" : "green"}
                      />
                    </View>
                  ) : null
                }
                onChangeText={(e) => {
                  settaskName(e);
                }}
              />
              <Input
                placeholder={"Task Detail"}
                value={taskDetails}
                multiline={true}
                numberOfLines={4}
                underlineColorAndroid="rgba(0,0,0,0)"
                inputContainerStyle={{
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 10,
                  borderColor: "lightgray",
                  borderWidth: 1,
                }}
                selectionColor="#38487a"
                maxLength={100}
                style={{ backgroundColor: "white", fontSize: 15 }}
                leftIcon={
                  <View style={{ marginRight: 10 }}>
                    <MaterialCommunityIcons
                      name="android-messages"
                      size={24}
                      color="black"
                    />
                  </View>
                }
                onChangeText={(e) => {
                  settaskDetails(e);
                }}
              />
            </>
          ) : null}
          {calenderOpen && (
            <View>
              <DatePicker mode="date" onDateChange={(e) => settaskDate(e)} />
            </View>
          )}
          <TouchableOpacity onPress={() => setcalenderOpen(!calenderOpen)}>
            <Input
              value={taskDate}
              editable={false}
              placeholder={"Task date"}
              underlineColorAndroid="rgba(0,0,0,0)"
              inputContainerStyle={{
                backgroundColor: "white",
                padding: 5,
                borderRadius: 10,
                borderColor: "lightgray",
                borderWidth: 1,
              }}
              selectionColor="#38487a"
              style={{ backgroundColor: "white", fontSize: 15 }}
              leftIcon={
                <View style={{ marginRight: 10 }}>
                  <MaterialCommunityIcons
                    name="calendar-month-outline"
                    size={24}
                    color={calenderOpen ? "green" : "red"}
                  />
                </View>
              }
              // rightIcon={
              //   taskName.length > 0 ? (
              //     <View>
              //       <Feather
              //         name={"check-circle"}
              //         size={20}
              //         color={taskName.length == 0 ? "gray" : "green"}
              //       />
              //     </View>
              //   ) : null
              // }
            />
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => addTask(taskName, taskDate, taskDetails)}
          >
            <View style={styles.saveButton}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Save task
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskFormContainer: {
    padding: 1,
    width: "100%",
    margin: 0,
    borderRadius: 15,
    height: 100,
  },
  singleTaskContainer: {
    padding: 10,
    backgroundColor: "#2D1C5E",

    marginTop: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  singleTaskDetailsContainer: {
    padding: 10,
    backgroundColor: "#2D1C5E",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  saveButton: {
    padding: 10,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: "#031738",
    marginbottom: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default Home;
