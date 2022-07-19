sap.ui.define(
    ["./BaseController", "sap/m/MessageToast", "sap/ui/core/routing/History",],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, History) {
        "use strict";

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
            }
        });
    }
);
