import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Dialog from "sap/m/Dialog";
import MessageToast from "sap/m/MessageToast";

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
				{name: "John Doe", age: 30},
				{name: "Jane Smith", age: 25}
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

		// Get values from the input fields
		const name = (this.byId("nameInput") as any).getValue();
		const age = (this.byId("ageInput") as any).getValue();

		// Add user to model if inputs are valid
		if (name && age) {
			users.push({name, age: parseInt(age, 10)});
			oModel.setProperty("/users", users);
			MessageToast.show("User added successfully");

			// Close the dialog
			this.dialog.close();
		} else {
			MessageToast.show("Please fill in all fields");
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
