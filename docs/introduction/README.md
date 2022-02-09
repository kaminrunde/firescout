# Introduction

Firescout is a technique that allows you to create a living documentation for your view components. It it primarily designed to work best with `JSX (react)`, but it also works with any other view libary. In combination with cypress (jest will follow) it gives you the ability to write robust component and End-to-End tests where you can access your component with a typesave api

Firescout does a lot of things. You do not have to use every feature but they work really well together. These features can be seperated by three groups:

**Component-Documentation**: With lint rules firescout checks which parts of your component needs to be documented and enforces you to write down the documentation in a `README.md`. It also checks if the documentation is up to date. Learn more about this the the [component documentation](../component-docs/README.md) section

**Component-Testing-API**: Thanks to the `component-documentation` a typescript typesave (!!!) api to your component will be created. No more unsave css selectors to handle with. If you update your component you can see in your IDE if the way you want to interact with your component still works. That way your test will only fail when it should fail. No more errors because a css selector path changed.

**Mocking**: Firescout gives you the abillity to mock ANY function or variable regardless where it is or if it is exported or not. Of course the mocking is typesave too. 


Firescout is not opinionated about your setup and can be used in any modern frontend stack. But it works best in a setup with JSX (React) and Typescript (in your test-code).