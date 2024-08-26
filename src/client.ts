import { Kafka } from "kafkajs";

export const kafka=new Kafka({
    brokers:["192.168.29.119:9092"],
    clientId:'my-app'
});