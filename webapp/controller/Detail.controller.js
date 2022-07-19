sap.ui.define(
    [
        "./BaseController",
        "sap/m/MessageToast",
        "sap/ui/core/routing/History",
        "sap/m/Dialog",
        "sap/m/Button",
        "sap/m/library",
        "sap/m/List",
        "sap/m/StandardListItem",
        "sap/m/Text"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
        Controller,
        MessageToast,
        History,
        Dialog,
        Button,
        mobileLibrary,
        List,
        StandardListItem,
        Text
    ) {
        "use strict";

        // shortcut for sap.m.ButtonType
        var ButtonType = mobileLibrary.ButtonType;

        // shortcut for sap.m.DialogType
        var DialogType = mobileLibrary.DialogType;

        return Controller.extend("ui5.challenge.controller.Detail", {
            onInit: function () {

            },

            onNavBack: function () {
                let sPreviousHash = History.getInstance().getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.getRouter().navTo("Main", {}, true /*no history*/);
                }
            },

            onOpenDialog: function (oEvent) {
                if (!this.oDefaultDialog) {
                    this.oDefaultDialog = new Dialog({
                        id: "myDialog",
                        title: "Hello friend!",
                        type: "Message",
                        content: new Text({
                            text: "Hello",
                            class: "sapUiMediumMarginBegin"
                        }),
                        endButton: new Button({
                            text: "Close",
                            press: function () {
                                this.oDefaultDialog.close();
                            }.bind(this)
                        })
                    });

                    // to get access to the controller's model
                    this.getView().addDependent(this.oDefaultDialog);
                }

                this.oDefaultDialog.open();
            },
        });
    }
);
