import { useRouter } from "next/router";
import gql from "graphql-tag";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";
import fileData from "./data.json";

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: `http://localhost:8080/v1/graphql`,
    }),
});

const MyQueryQuery = (props) => {
    const getTail = gql`
  query MyQuery {
    hasura_long_tails(where: {tail: {_eq: "${props.tail}"}}) {
      tail
      json_id
    }
  }
`;
    return (
        <Query
            query={getTail} >
            {({ loading, error, data }) => {
                if (loading) return <pre>Loading</pre>
                if (error)
                    return (
                        <div>
                            <span>Error in MY_QUERY_QUERY</span>
                            <p>{JSON.stringify(error, null, 2)}</p>
                        </div>
                    );

                if (data) {
                    let info = {};
                    const { hasura_long_tails: res } = data
                    if (res.length < 1) return (<div style={{margin: '50px'}}>Item not found</div>)
                    for (let i = 0; i < fileData.length; i++) {
                        const item = fileData[i];
                        if (res[0].json_id === item.id) {
                            info = item;
                            break;
                        }
                    }
                    if (!info.id) return (<div style={{margin: '50px'}}>Item not fo</div>)
                    
                    return (
                        <div style={{margin: '50px'}}>
                            <p>
                                <strong>Title: </strong>
                                <span>{info.title}</span>
                            </p>
                            <p>
                                <strong>Description: </strong>
                                <span>{info.description}</span>
                            </p>
                        </div>
                    )
                }
            }}
        </Query>
    )
};

const MY_MUTATION_MUTATION = gql`
  mutation MyMutation {
    checkTail(arg1: {tail: "1234"}) {
      description
      title
    }
  }
`;

const MyMutationMutation = (props) => {
    return (
        <Mutation
            mutation={MY_MUTATION_MUTATION}>
            {(MyMutation, { loading, error, data }) => {
                if (loading) return <pre>Loading</pre>

                if (error)
                    return (
                        <pre>
              Error in MY_MUTATION_MUTATION
                            {JSON.stringify(error, null, 2)}
            </pre>
                    );

                const dataEl = data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                ) : null;

                return (
                    <div>
                        {dataEl}

                        <button onClick={() => MyMutation()}>
                            Run mutation: MyMutation
                        </button>
                    </div>
                );
            }}
        </Mutation>
    )
};

export default function MyDynamicPage({ example }) {
    const router = useRouter();
    const {query: { tail }} = router;
    return (
        <ApolloProvider client={apolloClient}>
            <MyQueryQuery  tail={tail}/>
            <MyMutationMutation  />
        </ApolloProvider>
    )
}