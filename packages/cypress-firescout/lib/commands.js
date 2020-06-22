"use strict";
/// <reference types="cypress" />
Cypress.Commands.add("context", { prevSubject: 'optional' }, function (subject, name, index) {
    var cmd;
    if (subject)
        cmd = cy.get(subject.selector + " [data-cy-ctx=\"" + name + "\"]");
    else if (typeof index === 'string')
        cmd = cy.contains("[data-cy-ctx=\"" + name + "\"]", index);
    else
        cmd = cy.get("[data-cy-ctx=\"" + name + "\"]");
    if (typeof index === 'number') {
        cmd = cmd.eq(index);
    }
    return cmd;
});
Cypress.Commands.add("collection", { prevSubject: 'optional' }, function (subject, name, index) {
    var cmd;
    if (subject)
        cmd = cy.get(subject.selector + " [data-cy-collection=\"" + name + "\"]");
    else if (typeof index === 'string')
        cmd = cy.contains("[data-cy-collection=\"" + name + "\"]", index);
    else
        cmd = cy.get("[data-cy-collection=\"" + name + "\"]");
    if (typeof index === 'number') {
        cmd = cmd.eq(index);
    }
    return cmd;
});
Cypress.Commands.add("handle", { prevSubject: 'optional' }, function (subject, name, index) {
    var cmd;
    if (subject.attr('data-cy-handle') === name)
        return cy.get(subject.selector);
    else if (subject)
        cmd = subject.find("[data-cy-handle=\"" + name + "\"]");
    else if (typeof index === 'string')
        cmd = cy.contains("[data-cy-handle=\"" + name + "\"]", index);
    else
        cmd = cy.get("[data-cy-handle=\"" + name + "\"]");
    if (typeof index === 'number') {
        cmd = cmd.eq(index);
    }
    return cmd;
});
Cypress.Commands.add("shouldHaveState", { prevSubject: 'optional' }, function (subject, name) {
    return cy.get(subject).should('contain.html', "data-cy-state=\"" + name + "\"");
});
Cypress.Commands.add("shouldNotHaveState", { prevSubject: 'optional' }, function (subject, name) {
    return cy.get(subject).should('not.contain.html', "data-cy-state=\"" + name + "\"");
});
Cypress.Commands.add('module', function (module) {
    return cy.wrap(module, { log: false });
});
Cypress.Commands.add('fn', { prevSubject: true }, function (module, name) {
    return cy.wrap([module, name], { log: false });
});
Cypress.Commands.add('mock', { prevSubject: true }, function (_a, variation) {
    var module = _a[0], name = _a[1];
    var get = function () { return null; };
    cy.fixture("firescout/" + module + "/" + name + "." + variation + ".ts").then(function (file) {
        var match = file.match(/\/\*fs-start\*\/(.*)\/\*fs-end\*\//);
        if (!match)
            throw new Error("firescout mocks need to have content /*fs-start*/.../*fs-end*/. Please check fixtures/firescout/" + module + "/" + name + "." + variation + ".ts");
        var fn = new Function("return " + match[1]);
        get = function () { return fn(); };
    });
    var cb = function (win) {
        var id = module + "." + name;
        if (!win.cymocks)
            win.cymocks = {};
        win.cymocks[id] = cy.stub().as(id).resolves(get());
    };
    cy.window({ log: false }).then(cb);
    Cypress.on('window:before:load', cb);
    Cypress.on('test:after:run', function () {
        Cypress.off('window:before:load', cb);
    });
    return cy.wrap([module, name], { log: false });
});
