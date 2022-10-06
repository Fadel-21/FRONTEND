import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import {
  Container,
  Icon,
  Input,
  Text,
  VStack,
  Box,
  Divider,
  HStack,
  Stack,
  ScrollView,
  Center,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <Stack>
          <Stack style={{ justifyContent: "center", alignItems: "center" }}>
            <HStack
              my="4"
              space={5}
              w="100%"
              maxW="300px"
              divider={
                <Box px="2">
                  <Divider />
                </Box>
              }
            >
              <VStack w="100%" space={5} alignSelf="center">
                <Input
                  placeholder="Search"
                  onFocus={openList}
                  onChangeText={(text) => searchProduct(text)}
                  variant="filled"
                  width="100%"
                  borderRadius="10"
                  py="1"
                  px="2"
                  InputLeftElement={
                    <Icon
                      ml="2"
                      size="4"
                      color="gray.400"
                      as={<Ionicons name="ios-search" />}
                    />
                  }
                />
                {focus == true ? (
                  <Icon
                    style={{ position: "absolute", right: 5, top: 10 }}
                    ml="2"
                    size="4"
                    color="gray.400"
                    onPress={onBlur}
                    as={<Ionicons name="ios-close" />}
                  />
                ) : null}
              </VStack>
            </HStack>
          </Stack>
          {focus == true ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    CategoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item.name}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Stack>
      ) : (
        // Loading
        <Stack>
          <ActivityIndicator size="large" color="blue" />
        </Stack>
      )}
    </>
  );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    // width: '100%',
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 125,
    // marginTop: 100
  },
});
