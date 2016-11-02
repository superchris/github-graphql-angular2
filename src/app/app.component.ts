import { Component } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';
import "rxjs/Rx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  searchArgs: any = {};
  queryResults: any;
  lastCursor: String;

  constructor(private apolloClient: Angular2Apollo) {
  }

  prevPage() {
    console.log("previousing");
  }

  nextPage() {
    console.log("nexting");

    this.executeQuery({
      query: this.searchArgs.query,
      after: this.lastCursor,
      before: '',
      type: 'REPOSITORY'
    });
  }

  search(event) {
    this.executeQuery({
      query: this.searchArgs.query,
      after: '',
      before: '',
      type: 'REPOSITORY'
    });
  }

  executeQuery(variables) {
    this.queryResults = this.apolloClient.watchQuery({
      query: gql`
      query($query: String!, $type: SearchType!, $after: String, $before: String) {
        search(first: 10, type: $type, query: $query, after: $after, before: $before) {
          pageInfo {
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage
          }
          edges {
            cursor
            node {
              ... on Repository {
                name,
                owner {
                  id,
                  login
                }
              }
            }
          }
        }
      }
      `,
      variables
    }).map((data) => {
      const edges = data.data.search.edges;
      this.lastCursor = edges[edges.length - 1].cursor;
      return edges.map(edge => edge.node);
    });
  }
}
