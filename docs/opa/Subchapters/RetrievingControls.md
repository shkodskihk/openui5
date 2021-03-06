# Retrieving a Control by Its ID

Example:

```javascript
new sap.ui.test.Opa5().waitFor({
    id : "page-title",
    viewName : "Category",
    viewNamespace : "my.Application.",
    success : function (oTitle) {
        Opa5.assert.ok(oTitle.getVisible(), "the title was visible");
    }
});
```

In this example, we search for a control with the ID `page-title`. The control is located in the `my.Application.Category` view.

By default, OPA5 will try to find the element until the default timeout of 15 seconds is reached. You can override this by passing it as a parameter to the `waitFor` function. 0 means infinite timeout.

Another example:

```javascript
new sap.ui.test.Opa5().waitFor({
    id : "productList",
    viewName : "Category",
    success : function (oList) {
        Opa5.assert.ok(oList.getItems().length, "The list did contain products");
    }
});
```

In this example, the check function is omitted. In this case, OPA5 creates its own check function that waits until the control is found or the specified timeout is reached.

## Retrieving a Control that Does Not Have an ID

Sometimes you need to test for a control that has no explicit ID set and maybe you cannot or do not want to provide one for your test. To get around this issue, use a custom check function to filter for this control. Let's assume we have a view called `Detail` and there are multiple `sap.m.ObjectHeaders` on this page. We want to wait until there is an object header with the title `myTitle`.

To do this, use the following code:

```javascript
return new Opa5().waitFor({
    controlType : "sap.m.ObjectHeader",
    viewName : "Detail",
    matchers : new sap.ui.test.matchers.PropertyStrictEquals({
                                 name : "title",
                                 value: "myTitle"
                           }),
    success : function (aObjectHeaders) {
        Opa5.assert.strictEqual(aObjectHeaders.length, 1, "was there was only one Object header with this title on the page");
        Opa5.assert.strictEqual(aObjectHeaders[0].getTitle(), "myTitle", "was on the correct Title");
    }
});
```

Since no ID is specified, OPA passes an array of controls to the check function. The array contains all visible object header instances in the `Detail` view. However, a built-in support for comparing properties does **not** exist, so we implement a custom check to achieve this.

## More About Matchers

For more information about all matchers, see the [API Reference](https://openui5nightly.hana.ondemand.com/#/api/sap.ui.test.matchers) and the [Samples](https://openui5nightly.hana.ondemand.com/#/entity/sap.ui.test.matchers).

`sap.ui.test.matchers.Properties`: This matcher checks if the controls have properties with given values. The values may also be defined as regular expressions (RegExp) for the string type properties.

```javascript
return new Opa5().waitFor({
    controlType : "sap.ui.commons.TreeNode",
    matchers : new sap.ui.test.matchers.Properties({
        text: new RegExp("root", "i"),
        isSelected: true
    }),
    success : function (aNodes) {
        Opa5.assert.ok(aNodes[0], "Root node is selected")
    },
    errorMessage: "No selected root node found"
});
```

>*Note:* `sap.ui.test.matchers.Properties` and `sap.ui.test.matchers.PropertyStrictEquals` serve the same purpose but it's easier to pass parameters to `sap.ui.test.matchers.Properties`.

`sap.ui.test.matchers.Ancestor`: This matcher checks if the control has the specified ancestor (ancestor is of a control type).

```javascript
var oRootNode = getRootNode();
return new Opa5().waitFor({
        controlType : "sap.ui.commons.TreeNode",
        matchers : new sap.ui.test.matchers.Ancestor(oRootNode),
        success : function (aNodes) {
            Opa5.assert.notStrictEqual(aNodes.length, 0, "Found nodes in a root node")
        },
        errorMessage: "No nodes in a root node found"
});
```

`sap.ui.test.matchers.BindingPath`: This matcher checks if the controls have specified data binding paths. The `path` property matches
controls by their binding context. Controls with a binding context are usually inside an aggregation or have a parent control with data binding.
The `propertyPath` property matches controls by the data binding paths of their own properties. Binding property paths can be
part of an expression binding. You can set the `path` and `propertyPath` properties separately or in combination. For a practical example of the various
types of data binding, see the [Tutorial Samples](https://openui5nightly.hana.ondemand.com/#/entity/sap.ui.core.tutorial.databinding)

```javascript
// Match a CheckBox located inside a ListItem:
// the CheckBox has a property binding with relative path "Selected"
// the ListItem has a binding context path "/products/0"
return new Opa5().waitFor({
    controlType : "sap.m.CheckBox",
    matchers : new sap.ui.test.matchers.BindingPath({
        path: "/products/0",
        propertyPath: "Selected"
    }),
    success : function (aResult) {
        Opa5.assert.ok(aResult[0], "CheckBox is matched")
    }
});
```

You can also define a matcher as an inline function: The first parameter of the function is a control to match. If the control matches, return true to pass the control on to the next matcher and/or to check and success functions.

```javascript
return new Opa5().waitFor({
    controlType : "sap.ui.commons.TreeNode",
    matchers : function(oNode) {
        return oNode.$().hasClass("specialNode");
    },
    success : function (aNodes) {
        Opa5.assert.notStrictEqual(aNodes.length, 0, "Found special nodes")
    },
    errorMessage: "No special nodes found"
});
```

If you return a 'truthy' value from the matcher, but not a Boolean, it will be used as an input parameter for the next matchers and/or check and success. This allows you to build a matchers pipeline.

```javascript
return new Opa5().waitFor({
    controlType : "sap.ui.commons.TreeNode",
    matchers : [
        function(oNode) {
            // returns truthy value - jQuery instance of control
            return oNode.$();
        },
        function($node) {
            // $node is a previously returned value
            return $node.hasClass("specialNode");
        }
    ],
    actions : function (oNode) {
        // oNode is a matching control's jQuery instance
        oNode.trigger("click");
    },
    errorMessage: "No special nodes found"
});
```

`sap.ui.test.matchers.LabelFor`: This matcher checks if a given control is associated with an
`sap.m.Label` control. This means that there should be a label on the page with a `labelFor`
association to the control. The label can be filtered by text value or by the `i18n` key of a given
property value. Note that some controls, such as `sap.ui.comp.navpopover.SmartLink`, `sap.m.Link`,
`sap.m.Label`, and `sap.m.Text` cannot be matched by `sap.ui.test.matchers.LabelFor` as they
cannot have an associated label.

Using `i18n` key:

```javascript
return new Opa5().waitFor({
    controlType: "sap.m.Input",
    // Get sap.m.Input which is associated with Label which have i18n text with key "CART_ORDER_NAME_LABEL"
    matchers: new sap.ui.test.matchers.LabelFor({ key: "CART_ORDER_NAME_LABEL", modelName: "i18n" }),
    // It will enter the given text in the matched sap.m.Input
    actions: new sap.ui.test.actions.EnterText({ text: "MyName" })
});
```

Using `text` property:

```javascript
return new Opa5().waitFor({
    controlType: "sap.m.Input",
    // Get sap.m.Input which is associated with Label which have i18n text with text "Name"
    matchers: new sap.ui.test.matchers.LabelFor({ text: "Name" }),
    // It will enter the given text in the matched sap.m.Input
    actions: new sap.ui.test.actions.EnterText({ text: "MyName" }),
    success: function (oInput) {
        Opa5.assert.ok(oInput.getValue() === "MyName", "Input value is correct");
    }
});
```

For more information, see the [API Reference](https://openui5nightly.hana.ondemand.com/#/api/sap.ui.test.Opa5) and the [Sample](https://openui5nightly.hana.ondemand.com/#/sample/sap.ui.core.sample.OpaMatchers/preview).

## Searching for Controls Inside a Dialog

Use the option `searchOpenDialogs` to restrict control search to open dialogs only. You can combine
`searchOpenDialogs` with `controlType` or any predefined or custom matcher. As of version 1.62,
the `id` option is also effective in combination with `searchOpenDialogs`. If the dialog is inside
a view, the `viewName` option ensures the given ID is relative to the view. Otherwise, the search
is done by global ID.

This is an example of matching a control with ID "mainView--testButton" located inside a dialog.
The dialog itself is part of a view with name "main.view" and ID "mainView":

```javascript
this.waitFor({
    searchOpenDialogs: true,
    id: "testButton",
    viewName: "main.view"
    actions: new sap.ui.test.actions.Press(),
    errorMessage : "Did not find the dialog button"
});
```

The next example shows the use case where we want to press a button with 'Order Now' text on it
inside a dialog.

To do this, we set the `searchOpenDialogs` option to `true` and then restrict the `controlType`
we want to search for to `sap.m.Button`. We use the `check` function to search for a button with
the text 'Order Now' and save it to the outer scope. After we find it, we trigger a `tap` event:

```javascript
iPressOrderNow : function () {
    var oOrderNowButton = null;
    this.waitFor({
        searchOpenDialogs : true,
        controlType : "sap.m.Button",
        check : function (aButtons) {
            return aButtons.filter(function (oButton) {
                if(oButton.getText() !== "Order Now") {
                    return false;
                }

                oOrderNowButton = oButton;
                return true;
            });
        },
        actions: new sap.ui.test.actions.Press(),
        errorMessage : "Did not find the Order Now button"
    });
    return this;
}
```

## Searching for Controls inside a Fragment

As of version 1.63, you can limit control search to a fragment with the option `fragmentId`.

`fragmentId` is effective only when searching by control ID inside a view.
Whether a control belongs to a fragment is only relevant when the fragment has a user-assigned ID,
which is different from the ID of its parent view. In this case, the fragment ID takes part in
the formation of control ID and you should use the `fragmentId` option to simplify test maintenance.

The next example shows the use case where we want to press a button with ID `theMainView--greeting--helloWorld`,
located inside a fragment with ID `greeting` and view with ID `theMainView`:

```javascript
this.waitFor({
    viewId: "theMainView",
    fragmentId: "greeting",
    id: "hello",
    actions: new Press(),
    errorMessage : "Did not find the Hello button"
});
```

## Searching for Disabled Controls

As of version 1.66, you can search for controls by their enabled state using the `enabled` property.
When `enabled` is set to `true`, only enabled controls will match.
When `enabled` is set to `false`, both enabled and disabled controls will match.

By default, only enabled controls are matched when:
* `autoWait` is `true`, or
* there are actions defined in the `waitFor`

If `autoWait` is disabled and there are no actions, the search matches disabled controls as well.

The next example shows that the `enabled` property has priority over `autoWait`:

```javascript
this.waitFor({
    controlType: "sap.m.Button",
    enabled: false,
    autoWait: true,
    success: function () {...}
})
```

## Writing Nested Arrangements and Actions

UI elements may be recursive, for example in a tree. Instead of triggering the action for each known element, you can also define it recursively (see the code snippet below). OPA ensures that the `waitFor` statements triggered in a `success` handler are executed before the next arrangement, action, or assertion. That also allows you to work with an unknown number of entries, for example in a list. First, you wait for the list, and then trigger actions on each list item.

```javascript
iExpandRecursively : function() {
    return this.waitFor({
        controlType : "sap.ui.commons.TreeNode",
        matchers : new sap.ui.test.matchers.PropertyStrictEquals({
            name : "expanded",
            value : false
        }),
        actions : function (oTreeNode) {
            if (oTreeNode.getNodes().length){
                oTreeNode.expand();
                that.iExpandRecursively()
            }
        },
        errorMessage : "Didn't find collapsed tree nodes"
    });
}
```