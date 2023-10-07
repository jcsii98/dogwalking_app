import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer(
  `ws://dogwalking-api.onrender.com/cable?uid=${localStorage.getItem(
    "uid"
  )}&client=${localStorage.getItem(
    "client"
  )}&access-token=${localStorage.getItem("access-token")}`
);

export default consumer;
