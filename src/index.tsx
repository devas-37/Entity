import React from "react";
import ReactDOM from "react-dom";
import { MainPage } from "./pages/mainPage";
import { SecondPage } from "./pages/SecondPage";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <SecondPage open />
  </ApolloProvider>,
  document.getElementById("root")
);
