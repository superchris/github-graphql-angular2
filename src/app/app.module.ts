import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'angular2-apollo';
import { AppComponent } from './app.component';
import { PaginationModule } from 'ng2-bootstrap';

const token = '7ee278836442d6c3c6fa9ad287b034963ce1463a';
let networkInterface = createNetworkInterface('https://api.github.com/graphql');
const client = new ApolloClient({
  // networkInterface: createNetworkInterface('http://localhost:53441/')
  networkInterface
  // networkInterface: createNetworkInterface('http://localhost:4000/graphql')
  // networkInterface: createNetworkInterface('https://www.graphqlhub.com/graphql')
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers['authorization'] = `bearer ${token}`;
    next();
  }
}]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PaginationModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.withClient(client)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
