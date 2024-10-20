import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Dialog from "sap/m/Dialog";
import MessageToast from "sap/m/MessageToast";
import Input from "sap/m/Input";
import {ValueState} from "sap/ui/core/library";

/**
 * @namespace pixiedust.controller
 */
export default class Main extends BaseController {
	private dialog: Dialog;

	public sayHello(): void {
		this.onInit()
		MessageBox.show("Hello World!");
	}

	public onInit(): void {
		const oModel = new JSONModel({
			users: [
				{
					notes: 'Buy it now',
					name: "John Doe",
					link: 'https://www.youtube.com/watch?v=5YAaeOonFRI&ab_channel=Money%26Macro',
					quantity: 6,
					price: '5.0$'
				},
				{
					notes: 'Buy it tomorrow',
					name: "Jane Smith",
					link: 'https://www.youtube.com/watch?v=5YAaeOonFRI&ab_channel=Money%26Macro',
					quantity: 6,
					price: '5.0$'
				}
			]
		});
		this.getView().setModel(oModel);
	}


	// Open the dialog when the "Add User" button is pressed
	public onOpenDialog(): void {
		this.dialog = this.byId("userDialog") as Dialog;
		this.dialog.open();
	}

	 // Handle the "Add" button press inside the dialog
    public onAddUser(): void {
        const oModel = this.getView().getModel() as JSONModel;
        const users = oModel.getProperty("/users");

        // Get references to the input fields
        const nameInput = this.byId("nameInput") as Input;
        const quantityInput = this.byId("quantity") as Input;
        const linkInput = this.byId("link") as Input;
        const priceInput = this.byId("price") as Input;

        const name = nameInput.getValue();
        const age = quantityInput.getValue();
        const link = linkInput.getValue();
        const price = priceInput.getValue();

        // Reset validation states
        nameInput.setValueState(ValueState.None);
        quantityInput.setValueState(ValueState.None);
        linkInput.setValueState(ValueState.None);

        // Perform validation
        let isValid = true;

        if (!name) {
            nameInput.setValueState(ValueState.Error);
            nameInput.setValueStateText("Name cannot be empty");
            isValid = false;
        }

				if (!link) {
            linkInput.setValueState(ValueState.Error);
            linkInput.setValueStateText("Link cannot be empty");
            isValid = false;
        }

        if (!age || isNaN(Number(age)) || Number(age) <= 0) {
            quantityInput.setValueState(ValueState.Error);
            quantityInput.setValueStateText("Please enter a valid age greater than 0");
            isValid = false;
        }

				if (!price || isNaN(Number(price)) || Number(price) <= 0) {
            priceInput.setValueState(ValueState.Error);
            priceInput.setValueStateText("Please enter a valid price greater than 0");
            isValid = false;
        }

        // If inputs are valid, add the user and close the dialog
        if (isValid) {
            users.push({ name, age: parseInt(age, 10) });
            oModel.setProperty("/users", users);
            MessageToast.show("User added successfully");

            // Close the dialog
            this.dialog.close();
        } else {
            MessageToast.show("Please fix the errors before adding the user.");
        }
    }

	// Handle the "Cancel" button press inside the dialog
	public onCancel(): void {
		this.dialog.close();
	}

	// Handle dialog close event
	public onDialogClose(): void {
		// Clear the inputs when the dialog is closed
		(this.byId("nameInput") as any).setValue("");
		(this.byId("ageInput") as any).setValue("");
	}

}
