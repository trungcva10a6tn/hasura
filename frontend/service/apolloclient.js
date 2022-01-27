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
          query MyQuery {
            hasura_long_tails(where: {tail: {_eq: "${tail}"}}) {
              tail
              json_id
            }
          }
        `;

    const {data} = await apolloClient.query({
        query: getTail,
    });
    return data.hasura_long_tails;
}
const checkTail = async (id) => {
    const checkTail = gql`
           mutation MyMutation {
            checkTail(arg1: {id: ${id}}) {
              description
              title
            }
          }
        `;

    const {data} = await apolloClient.mutate({
        mutation: checkTail,
    });
    console.log('data', data);
    return data.checkTail;
}
export { apolloClient, getTail, checkTail };