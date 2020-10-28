var {transformSync} = require('@babel/core')
var plugin = require('.')

const transform = code => transformSync(code, {
  presets: ["@babel/preset-react"],
  plugins: [plugin],
}).code

test('transforms declared arrow functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
const xy = test => { return test }`)
  
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function fn(test) {
  return test;
});`
  )
});

test('transforms declared exported arrow functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
export const xy = test => { return test }`)
  
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
export const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function fn(test) {
  return test;
});`
  )
});

test('transforms default exported arrow functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
export default test => { return test }`)
  
  expect(output).toEqual(
`export default require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function fn(test) {
  return test;
});`
  )
});

test('transforms declared async arrow functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
const xy = async test => { return test }`)
  
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", async function fn(test) {
  return test;
});`
  )
});

test('transforms functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
function xy (test) { return test }`)
  expect(output).toEqual(
`var xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function xy(test) {
  return test;
});`)
});

test('transforms exported functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
export function xy (test) { return test }`)
  expect(output).toEqual(
`export var xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function xy(test) {
  return test;
});`)
});

test('transforms default exported functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
export default function xy (test) { return test }`)
  expect(output).toEqual(
`export default require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function xy(test) {
  return test;
});`)
});

test('transforms default exported anonym functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
export default function (test) { return test }`)
  expect(output).toEqual(
`export default require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function fn(test) {
  return test;
});`)
});

test('transforms async functions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
async function xy (test) { return test }`)
  expect(output).toEqual(
`var xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", async function xy(test) {
  return test;
});`)
});

test('transforms function expressions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
const xy = function xy (test) { return test }`)
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function xy(test) {
  return test;
});`)
});

test('transforms function expressions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
const xy = function (test) { return test }`)
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function fn(test) {
  return test;
});`)
});

test('transforms named function expressions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
const xy = function xy (test) { return test }`)
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function xy(test) {
  return test;
});`)
});

test('transforms async function expressions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
const xy = async function (test) { return test }`)
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", async function fn(test) {
  return test;
});`)
});

test('transforms named exported function expressions', () => {
  const output = transform(
`/** @firescoutMockFn Config.config */
export const xy = function (test) { return test }`)
  expect(output).toEqual(
`/** @firescoutMockFn Config.config */
export const xy = require("@kaminrunde/cypress-firescout").firescoutMockFn("Config.config", function fn(test) {
  return test;
});`)
});