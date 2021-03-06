import React, { useEffect, useState } from "react";
import { StyleSheet, ImageSourcePropType } from "react-native";
import { Button, Layout, Text, Avatar } from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import { Icons } from "./icons";
import { getTimeFromSeconds } from "../utils/timer";
import { purchase } from "../../redux/actions";

export interface listItemProps {
  id: string;
  name: string;
  price: number;
  duration: number;
  reward: number;
}

const ProgressBar: React.FC<listItemProps> = ({ id }) => {
  const duration = useSelector((state) => state.items[id].duration);
  const progression = useSelector((state) => state.items[id].progression);

  const isMinTime = duration === 1000;

  const percentage = isMinTime
    ? 100
    : Math.floor((progression * 100) / duration);

  return (
    <Layout style={styles.progressBarContainer}>
      <Layout
        style={[
          styles.progressBar,
          {
            backgroundColor: "#E9E9E9",
            borderColor: "#e00785",
            borderWidth: 3,
          },
        ]}
      >
        <Layout
          style={[
            styles.progressBar,
            { width: `${percentage}%` },
            isMinTime && { backgroundColor: "#e00785" },
          ]}
        />
      </Layout>
    </Layout>
  );
};

const PurchaseItem: React.FC<listItemProps> = ({ id }) => {
  const price = useSelector((state) => state.items[id].price);
  const duration = useSelector((state) => state.items[id].duration);
  const progression = useSelector((state) => state.items[id].progression);
  const amount = useSelector((state) => state.amount);
  const remainingTime = Math.ceil((duration - progression) / 1000);
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(purchase(id));
  };
  return (
    <Layout style={styles.purchaseItem}>
      <Layout style={styles.timer}>
        <Text style={{ fontSize: 30, color: "#E9E9E9" }}>
          {getTimeFromSeconds(remainingTime)}
        </Text>
      </Layout>
      <Button
        style={styles.priceButton}
        status="basic"
        disabled={amount < price}
        onPress={onPress}
      >{`${price} $`}</Button>
    </Layout>
  );
};

const ItemDescription: React.FC<listItemProps> = ({ id, name }) => {
  const quantity = useSelector((state) => state.items[id].quantity);
  const image: ImageSourcePropType = Icons[`item${id}`];
  return (
    <Layout style={styles.itemDescriptionContainer}>
      <Avatar style={styles.icon} source={image} />
      <Layout style={{ flex: 1 }}>
        <Layout style={styles.title}>
          <Text style={{ fontSize: 8 }}>{name}</Text>
        </Layout>
        <Layout style={styles.quantity}>
          <Text style={{ color: "#E9E9E9" }}>{`x${quantity}`}</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

const ActiveComponent: React.FC<listItemProps> = (props) => {
  return (
    <>
      <ItemDescription {...props} />
      <Layout style={styles.content}>
        <ProgressBar {...props} />
        <PurchaseItem {...props} />
      </Layout>
    </>
  );
};

const DisabledComponent: React.FC<listItemProps> = ({ id, name, price }) => {
  const amount = useSelector((state) => state.amount);
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(purchase(id));
  };
  return (
    <Button
      style={styles.disabledContainer}
      status="basic"
      disabled={amount < price}
      onPress={onPress}
    >
      {`Acheter ${name} : ${price}$`}
    </Button>
  );
};

export const ListItem: React.FC<listItemProps> = (props: listItemProps) => {
  const id = props.id;
  const quantity = useSelector((state) => state.items[id].quantity);

  return (
    <>
      <Layout style={styles.container}>
        {quantity === 0 ? (
          <DisabledComponent {...props} />
        ) : (
          <ActiveComponent {...props} />
        )}
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    margin: 10,
    minHeight: 100,
    marginRight: "5%",
    marginLeft: "5%",
  },
  itemDescriptionContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  icon: {
    flex: 5,
    width: "100%",
    backgroundColor: "#E9E9E9",
    borderRadius: 100,
    zIndex: -1,
    position: "relative",
    bottom: -5,
    borderColor: "#00a3d3",
    borderWidth: 2,
  },

  quantity: {
    flex: 1,
    fontSize: 20,
    backgroundColor: "#00a3d3",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#E9E9E9",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#00a3d3",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 5,
  },
  content: {
    flex: 4,
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },

  purchaseItem: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingLeft: 5,
  },
  priceButton: {
    flex: 3,
    borderColor: "#e00785",
    borderWidth: 4,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  timer: {
    flex: 2,
    fontSize: 25,
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
    borderRightWidth: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "#e00785",
  },
  progressBarContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    height: 10,
    margin: 10,
  },
  progressBar: {
    backgroundColor: "lightgreen",
    height: "100%",
    borderRadius: 10,
  },
  disabledContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    borderColor: "#00a3d3",
    borderWidth: 4,
    padding: "10%",
  },
});
