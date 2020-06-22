"use strict";
// @ts-ignore
Cypress.SelectorPlayground.defaults({
    onElement: function ($el) {
        var list = [];
        var $parent = $el;
        var max = 500;
        while (max--) {
            if ($parent.tagName === 'body')
                break;
            var id = $parent.attr('data-cy-ctx');
            var handle = $parent.attr('data-cy-handle');
            var collection = $parent.attr('data-cy-collection');
            if (handle)
                list.push({ type: 'handle', el: $parent, payload: handle });
            if (collection)
                list.push({ type: 'collection', el: $parent, payload: collection });
            if (id)
                list.push({ type: 'ctx', el: $parent, payload: id });
            $parent = $parent.parent();
        }
        list = list.reverse();
        for (var i = 0; i < list.length; i++) {
            var current = list[i];
            var next = list[i + 1];
            if (!next)
                continue;
            var name_1 = "data-cy-" + next.type;
            var value = next.el.attr(name_1);
            var items = current.el.find("[" + name_1 + "=\"" + value + "\"]");
            if (items.length > 1) {
                next.index = items.index(next.el);
            }
        }
        var selector = list.map(function (row) {
            if (row.type === 'ctx') {
                if (typeof row.index === 'number') {
                    return ".context('" + row.payload + "', " + row.index + ")";
                }
                else
                    return ".context('" + row.payload + "')";
            }
            if (row.type === 'collection') {
                if (typeof row.index === 'number') {
                    return ".collection('" + row.payload + "', " + row.index + ")";
                }
                else
                    return ".collection('" + row.payload + "')";
            }
            if (row.type === 'handle') {
                if (typeof row.index === 'number') {
                    return ".handle('" + row.payload + "', " + row.index + ")";
                }
                else
                    return ".handle('" + row.payload + "')";
            }
        })
            .join('');
        return 'cy' + selector;
    }
});
