import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "../types";

const initialState: ModalState = {
  modalState:{
		open: false,
		success: false,
	},
	modalContent: {
		heading: "",
		text: "",
		buttonText: "",
	},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<ModalState["modalState"]>) => {
			state.modalState = action.payload;
		},
		setModalContent: (state, action: PayloadAction<ModalState["modalContent"]>) => {
			state.modalContent = action.payload;
		},
  },
});

export default modalSlice;
