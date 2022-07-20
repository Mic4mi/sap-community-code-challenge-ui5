const { wdi5 } = require("wdio-ui5-service")
const Main = require("./pageObjects/Main")

// /*
// You have all done a great job so far in building an app that passes predefined tests 🎉
// Now it's time to take it one step further and write your own tests 🚀
// For week 4 the task is to write a minimum of 2 tests and make them pass ✅✅
// There are no boundaries, get creative and explore the framework 🎨
// You can get inspiration here:
//     🗓  test files of the previous weeks
//     ℹ️  examples in wdi5 repository: https://github.com/js-soft/wdi5/tree/main/examples/ui5-js-app/e2e-test-config
//     📚  official wdi5 documentation: https://js-soft.github.io/wdi5/#/
// You can share your results and experience in the SAP Community 💙
// https://groups.community.sap.com/t5/coffee-corner-discussions/sap-community-code-challenge-testing-ui5-apps-with-wdi5/td-p/5229
// */

describe("week4: main page", () => {
    before(async () => {
        await Main.open()
    })

    // Selector conseguido con test-recorder!
    it("this item should exist", async () => {
        // Acá copio las lineas y reemplazo viewId por viewName
        const item = await browser.asControl({
            controlType: "sap.m.Text",
            viewName: Main._viewName,
            bindingPath: {
                path: "/0",
                propertyPath: "Name",
                modelName: "mainModel"
            }
        })

        expect(item).toBeTruthy();
    })


    it("The searchfield should filter the table", async () => {
        // First, we must fetch the searchfield, insert a value in it and fire its event       
        const Searchfield = await browser.asControl({
            selector: {
                id: "mySearchfield",
                viewName: Main._viewName
            }
        });

        await Searchfield.setValue('18');
        await Searchfield.fireLiveChange();

        // Then, we must check that the items in the table have been filtered
        const Table = await browser.asControl({
            selector: {
                viewName: Main._viewName,
                id: "idProductsTable"
            }
        })

        const TableItems = await Table.getItems();
        expect(TableItems.length).toBe(1)
    })
})
