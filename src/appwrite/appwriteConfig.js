import {Client, Account, Databases, Graphql} from 'appwrite'

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("644408dee637e4940bce")

export const graphql = new Graphql(client);

export const account = new Account(client)

//Database

export const databases = new Databases(client, "64441640c63acd8d0245")



