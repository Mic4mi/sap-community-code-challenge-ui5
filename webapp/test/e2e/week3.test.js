const { wdi5 } = require("wdio-ui5-service")
const Detail = require("./pageObjects/Detail")

describe("week3: detail page", () => {
    const oInputSelector = {
        selector: {
            id: "nameInput",
            viewName: Detail._viewName
        }
    }

    const oButtonSelector = {
        selector: {
            id: "sendNameBtn",
            viewName: Detail._viewName
        }
    }

    const oTextSelector = {
        selector: {
            id: "nameText",
            viewName: Detail._viewName
        }
    }

    before(async () => {
        await Detail.open()
    })

    it("should have the right title", async () => {
        const title = await browser.getTitle()
        expect(title).toEqual("ui5-challenge")
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

    it("after typing in the input, the button should make the input value appear as text", async () => {
        const oInput = await browser.asControl(oInputSelector);
        await oInput.setValue('Mica');

        const oButton = await browser.asControl(oButtonSelector);
        await oButton.firePress();

        const oText = await browser.asControl(oTextSelector);
        const sText = await oText.getText();

        expect(sText).toBe('Mica');
    })

    it("if you send empty text in the input and press the button, a warning should appear", async () => {
        const oInput = await browser.asControl(oInputSelector);
        await oInput.setValue('');

        const oButton = await browser.asControl(oButtonSelector);
        await oButton.firePress();

        const oText = await browser.asControl(oTextSelector);
        const sText = await oText.getText();

        expect(sText).toBe('It seems that there is no name...');
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
})