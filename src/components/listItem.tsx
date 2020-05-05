import React from "react";
import { StyleSheet, ImageSourcePropType } from "react-native";
import { Button, Layout, Text, Avatar } from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import { Icons } from "./icons";
import { getTimeFromSeconds } from "../utils/timer";

export interface listItemProps {
  id: string;
  name: string;
  price: number;
  duration: number;
}

const ProgressBar: React.FC<listItemProps> = ({ id }) => {
  const progression = useSelector((state) => state.items[id].progression);
  return (
    <Layout style={styles.progressBarContainer}>
      <Layout
        style={[
          styles.progressBar,
          { backgroundColor: "#E9E9E9", borderColor: "grey", borderWidth: 3 },
        ]}
      >
        <Layout style={[styles.progressBar, { width: `${progression}%` }]} />
      </Layout>
    </Layout>
  );
};

const PurchaseItem: React.FC<listItemProps> = ({ duration, price, id }) => {
  const progression = useSelector((state) => state.items[id].progression);
  return (
    <Layout style={styles.purchaseItem}>
      <Layout style={styles.timer}>
        <Text style={{ fontSize: 30, color: "#E9E9E9" }}>
          {getTimeFromSeconds(duration)}
        </Text>
      </Layout>
      <Button style={styles.priceButton} status="basic">{`${price} $`}</Button>
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
          <Text>{name}</Text>
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

const DisabledComponent: React.FC<listItemProps> = ({ id, name }) => {
  return (
    <Button style={styles.disabledContainer} status="basic">
      {`Purchase ${name}`}
    </Button>
  );
};

export const ListItem: React.FC<listItemProps> = (props: listItemProps) => {
  const id = props.id;
  const disabled = useSelector((state) => state.items[id].disabled);
  return (
    <Layout style={styles.container}>
      {disabled ? (
        <DisabledComponent {...props} />
      ) : (
        <ActiveComponent {...props} />
      )}
    </Layout>
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
    borderColor: "grey",
    borderWidth: 2,
  },

  quantity: {
    flex: 1,
    fontSize: 20,
    backgroundColor: "grey",
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
    borderColor: "grey",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    borderColor: "grey",
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
    backgroundColor: "grey",
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
    borderColor: "grey",
    borderWidth: 4,
    padding: "10%",
  },
});
