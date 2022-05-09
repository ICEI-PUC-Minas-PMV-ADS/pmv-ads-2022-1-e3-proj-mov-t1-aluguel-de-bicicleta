import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [name, setName] = useState("User");
  const navigation = useNavigation();

  const handleGoToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 16,
            marginHorizontal: 16,
            justifyContent: "space-between",
          }}
        >
          {/* titulo */}
          <View>
            <Text style={styles.textTitle}>Welcome, {name}!</Text>
          </View>

          {/* Icone engrenangem */}
          <View>
            {/* <Text>Engrenagem</Text> */}
            <TouchableOpacity onPress={handleGoToEditProfile}>
              <Octicons name="gear" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLabel: {
    marginTop: 30,
    marginLeft: 30,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
});