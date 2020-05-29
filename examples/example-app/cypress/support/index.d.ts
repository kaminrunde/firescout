/// <reference types="cypress" />
/// <reference path="./firescout-types.ts" />


declare namespace Cypress {
  interface Chainable {
    component: typeof Firescout.component;
    // module: typeof Firescout.module;
  }
}