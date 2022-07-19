const { wdi5 } = require("wdio-ui5-service")
const Detail = require("./pageObjects/Detail")

describe("week3: detail page", () => {
    before(async () => {
        await Detail.open()
    })

    it("should have the right title", async () => {
        const title = await browser.getTitle()
        expect(title).toEqual("ui5-challenge")
    })

    it("should have button to navigate back", async () => {
        const navButton = await browser.asControl({
            selector: {
                id: /.*navButton$/,
                viewName: Detail._viewName
              }
        })
        expect(await navButton.getVisible()).toBeTruthy()
    })

    it("should have button that opens dialog", async () => {
        const dialogButton = await browser.asControl({
            selector: {
                id: "dialogButton",
                viewName: Detail._viewName
              }
        })
        await dialogButton.firePress()

        //it's also possible to use WebdriverIO selectors
        const dialog = await $("#myDialog")
        expect(dialog.error).toBeFalsy()
    })

    it("After typing in the input, the button should make the input value appear as text", async () => {
        const oInput = await browser.asControl({
            selector: {
                id: "nameInput",
                viewName: Detail._viewName
            }
        });
        await oInput.setValue('Mica');

        const oButton = await browser.asControl({
            selector: {
                id: "sendNameBtn",
                viewName: Detail._viewName
            }
        });
        await oButton.firePress();

        const oText = await browser.asControl({
            selector: {
                id: "nameText",
                viewName: Detail._viewName
            }
        });
        const sText = await oText.getText();

        expect(sText).toBe('Mica');
    })
})