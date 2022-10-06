import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  Heading,
  Spacer,
  Button,
  Container,
  useToast,
} from "native-base";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  const Toast = useToast();

  return (
    <Stack style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Heading size="xl" style={styles.contentHeader}>
            {item.name}
          </Heading>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        {/* TODO: description, richDescription, availability */}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <HStack space={[24]} justifyContent="space-evenly">
          <Text style={styles.price}>Rp.{item.price}</Text>
          <Spacer />
          <Button
            onPress={() => {
              props.addItemToCart(item.id),
                Toast.show({
                  title: "Successfully",
                  description: `${item.name} added to Cart`,
                  placement: "top",
                  backgroundColor: "green.600",
                });
            }}
          >
            Add
          </Button>
        </HStack>
      </View>
    </Stack>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

export default connect(null, mapToDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
});
