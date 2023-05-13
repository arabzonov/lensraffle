import gql from 'graphql-tag';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
//import { InMemoryCache } from 'apollo-cache-inmemory';
import { InvalidationPolicyCache } from 'apollo-invalidation-policies';

const httpLink = new createHttpLink({
	uri: `${LENSTER_SNAPSHOT_HUB_URL}/graphql`,
    fetchOptions: 'no-cors',
    fetch
});

export const snapshotClient = new ApolloClient({
	link: ApolloLink.from([httpLink]),
    cache: new InvalidationPolicyCache({
		invalidationPolicies: { timeToLive: 2 * 1000 },
	}),
	//cache: new InMemoryCache({
    //    possibleTypes: {}
    //})
});

export const SnapshotDocument = gql`
  query Snapshot($id: String, $where: VoteWhere) {
    proposal(id: $id) {
      id
      author
      state
      title
      choices
      scores
      scores_total
      snapshot
      symbol
      network
      type
      end
      space {
        id
        name
      }
      strategies {
        network
        name
        params
      }
    }
    votes(where: $where) {
      choice
    }
  }
`;

export const SpaceDocument = gql`
  query Space($id: String) {
    proposal(id: $id) {
      space {
        id
      }
    }
  }
`;
