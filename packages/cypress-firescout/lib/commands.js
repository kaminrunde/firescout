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
Cypress.Commands.add("shouldHaveState", { prevSubject: 'optional' }, function (subject, name, implementations) {
    var imps = implementations ? implementations.split(',') : null;
    cy.get(subject).should(function ($el) {
        var ctx = $el.attr('data-cy-ctx') || $el.attr('data-cy-collection');
        if (imps)
            for (var _i = 0, imps_1 = imps; _i < imps_1.length; _i++) {
                var imp = imps_1[_i];
                if ($el.attr('data-cy-state') === name + ":" + imp) {
                    expect($el, ctx).to.have.attr('data-cy-state', name + ":" + imp);
                }
                else {
                    expect($el, ctx).to.include.html("data-cy-state=\"" + name + ":" + imp + "\"");
                }
            }
        else {
            if ($el.attr('data-cy-state') === name) {
                expect($el, ctx).to.have.attr('data-cy-state', name);
            }
            else {
                expect($el, ctx).to.include.html("data-cy-state=\"" + name + "\"");
            }
        }
    });
    return cy.get(subject);
});
Cypress.Commands.add("shouldNotHaveState", { prevSubject: 'optional' }, function (subject, name) {
    cy.get(subject).should(function ($el) {
        var html = Cypress.$('<div>').append($el.clone()).html();
        var ctx = $el.attr('data-cy-ctx') || $el.attr('data-cy-collection');
        var regex = new RegExp("data-cy-state=\"" + name + "[^\"]*\"", 'g');
        var matches = html.match(regex);
        if (!matches) {
            if ($el.attr('data-cy-state') === name) {
                expect($el, ctx).not.to.have.attr('data-cy-state', name);
            }
            else {
                expect($el, ctx).not.to.include.html("data-cy-state=\"" + name + "\"");
            }
        }
        else {
            if ($el.attr('data-cy-state') === matches[0]) {
                expect($el, ctx).not.to.have.attr('data-cy-state', matches[0]);
            }
            else {
                expect($el, ctx).not.to.include.html(matches[0]);
            }
        }
    });
    return cy.get(subject);
});
Cypress.Commands.add('module', function (module) {
    return cy.wrap(module, { log: false });
});
Cypress.Commands.add('fn', { prevSubject: true }, function (module, name) {
    return cy.wrap([module, name], { log: false });
});
Cypress.Commands.add('variable', { prevSubject: true }, function (module, name) {
    return cy.wrap([module, name], { log: false });
});
Cypress.Commands.add('set', { prevSubject: true }, function (_a, data) {
    var module = _a[0], name = _a[1];
    var cb = function (win) {
        var id = module + "." + name;
        if (!win.firescoutVars)
            win.firescoutVars = {};
        win.firescoutVars[id] = data;
    };
    cy.window({ log: false }).then(cb);
    Cypress.on('window:before:load', cb);
    Cypress.on('test:after:run', function () {
        Cypress.off('window:before:load', cb);
    });
    return cy.wrap([module, name], { log: false });
});
Cypress.Commands.add('load', { prevSubject: true }, function (_a, data) {
    var module = _a[0], name = _a[1];
    throw new Error('"load" is not implemmented yet');
});
Cypress.Commands.add('mock', { prevSubject: true }, function (_a, variation, rootOpt) {
    var module = _a[0], name = _a[1];
    if (rootOpt === void 0) { rootOpt = {}; }
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
        var result = get();
        if (rootOpt.transform)
            result = rootOpt.transform(result);
        win.cymocks[id] = {
            type: 'mock',
            cb: options.sync
                ? cy.stub().as(id).returns(result)
                : options.throws || rootOpt.throws
                    ? cy.stub().as(id).rejects(result)
                    : cy.stub().as(id).resolves(result),
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
Cypress.Commands.add('doesReturn', { prevSubject: true }, function (_a, data, opt) {
    var module = _a[0], name = _a[1];
    if (opt === void 0) { opt = {}; }
    var get = opt.timeout
        ? function () { return new Promise(function (resolve) { return setTimeout(function () { return resolve(data); }, opt.timeout); }); }
        : function () { return data; };
    var cb = function (win) {
        var id = module + "." + name;
        if (!win.cymocks)
            win.cymocks = {};
        var result = get();
        win.cymocks[id] = {
            type: 'mock',
            cb: opt.sync
                ? cy.stub().as(id).returns(result)
                : opt.throws
                    ? cy.stub().as(id).rejects(result)
                    : cy.stub().as(id).resolves(result),
            options: {}
        };
    };
    cy.window({ log: false }).then(cb);
    Cypress.on('window:before:load', cb);
    Cypress.on('test:after:run', function () {
        Cypress.off('window:before:load', cb);
    });
    return cy.wrap([module, name], { log: false });
});
Cypress.Commands.add('createStub', { prevSubject: true }, function (_a) {
    var module = _a[0], name = _a[1];
    var cb = function (win) {
        var id = module + "." + name;
        if (!win.cymocks)
            win.cymocks = {};
        win.cymocks[id] = {
            type: 'stub',
            cb: cy.stub().as(id),
            options: {}
        };
    };
    cy.window({ log: false }).then(cb);
    Cypress.on('window:before:load', cb);
    Cypress.on('test:after:run', function () {
        Cypress.off('window:before:load', cb);
    });
    return cy.wrap([module, name], { log: false });
});
