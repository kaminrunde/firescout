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
    cy.get(subject).should(function ($el) {
        var html = Cypress.$('<div>').append($el.clone()).html();
        var ctx = $el.attr('data-cy-ctx');
        expect(html).to.include("data-cy-state=\"" + name + "\"", "\"" + ctx + "\" should have state \"" + name + "\"");
    });
    return cy.get(subject);
});
Cypress.Commands.add("shouldNotHaveState", { prevSubject: 'optional' }, function (subject, name) {
    cy.get(subject).should(function ($el) {
        var html = Cypress.$('<div>').append($el.clone()).html();
        var ctx = $el.attr('data-cy-ctx');
        expect(html).not.to.include("data-cy-state=\"" + name + "\"", "\"" + ctx + "\" should not have state \"" + name + "\"");
    });
    return cy.get(subject);
});
Cypress.Commands.add('module', function (module) {
    return cy.wrap(module, { log: false });
});
Cypress.Commands.add('fn', { prevSubject: true }, function (module, name) {
    return cy.wrap([module, name], { log: false });
});
Cypress.Commands.add('mock', { prevSubject: true }, function (_a, variation, rootOpt) {
    var module = _a[0], name = _a[1];
    var get = function () { return null; };
    var getOptions = function () { return ({}); };
    var path = variation === 'default'
        ? "firescout/" + module + "/" + name + ".ts"
        : "firescout/" + module + "/" + name + "." + variation + ".ts";
    if (variation) {
        cy.fixture(path).then(function (file) {
            var content = file.split('\n').join(' ');
            var match = content.match(/\/\*fs-start\*\/(.*)\/\*fs-end\*\//);
            var sync = !!content.match(/\* @sync/);
            var throws = !!content.match(/\* @throws/);
            if (!match)
                throw new Error("firescout mocks need to have content /*fs-start*/.../*fs-end*/. Please check fixtures/firescout/" + module + "/" + name + "." + variation + ".ts");
            var fn = new Function("return " + match[1]);
            get = rootOpt.timeout
                ? function () { return new Promise(function (resolve) { return setTimeout(function () { return resolve(fn()); }, rootOpt.timeout); }); }
                : function () { return fn(); };
            getOptions = function () { return ({ sync: sync, throws: throws }); };
        });
    }
    var cb = function (win) {
        var id = module + "." + name;
        if (!win.cymocks)
            win.cymocks = {};
        var options = getOptions();
        win.cymocks[id] = {
            type: variation ? 'mock' : 'stub',
            cb: options.sync
                ? cy.stub().as(id).returns(get())
                : options.throws || rootOpt.throws
                    ? cy.stub().as(id).rejects(get())
                    : cy.stub().as(id).resolves(get()),
            options: options
        };
    };
    cy.window({ log: false }).then(cb);
    Cypress.on('window:before:load', cb);
    Cypress.on('test:after:run', function () {
        Cypress.off('window:before:load', cb);
    });
    return cy.wrap([module, name], { log: false });
});
