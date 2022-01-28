import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: `http://localhost:8080/v1/graphql`,
    }),
});


const getTail = async (tail) => {
    const getTail = gql`
          query MyQuery ($_eq: bpchar = "") {
            hasura_long_tails(where: {tail: {_eq: $_eq}}) {
              tail
              json_id
            }
          }
        `;

    const {data} = await apolloClient.query({
        query: getTail,
        variables: {
            _eq: tail
        }
    });
    return data.hasura_long_tails;
}
const checkTail = async (id) => {
    const checkTail = gql`
     query checkTail($id: Int = "$id") {
        checkTail(arg1: {id: $id}) {
          description
          title
        }
      }
    `;
    const {data} = await apolloClient.query({
        query: checkTail,
        variables: {
            id: id
        }
    });
    return data.checkTail;
}
export { apolloClient, getTail, checkTail };