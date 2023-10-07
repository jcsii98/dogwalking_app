import { createConsumer } from "@rails/actioncable";

const consumer = createConsumer(
  `ws://localhost:3000/cable?uid=${localStorage.getItem(
    "uid"
  )}&client=${localStorage.getItem(
    "client"
  )}&access-token=${localStorage.getItem("access-token")}`
);

export default consumer;
