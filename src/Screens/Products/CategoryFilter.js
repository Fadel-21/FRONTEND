import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { VStack, Text, Badge, HStack } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <HStack style={{ margin: 5, padding: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.CategoryFilter("all"), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
            borderRadius={20}
          >
            <Text style={{ color: "white" }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                props.CategoryFilter(item._id),
                  props.setActive(props.categories.indexOf(item));
              }}
            >
              <Badge
                style={[
                  styles.center,
                  { margin: 5 },
                  props.active == props.categories.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
                borderRadius={20}
              >
                <Text style={{ color: "white" }}>{item.name}</Text>
              </Badge>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});
