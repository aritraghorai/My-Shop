import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const alertSlice = createSlice({
  name: 'alert',
  initialState: { alert: false, Message: '', type: 'primary' },
  reducers: {
    showAlert(
      state,
      action: PayloadAction<{ Message: string; Type: string | undefined }>
    ) {
      state.alert = true;
      state.Message = action.payload.Message;
      state.type = action.payload.Type ?? 'primary';
    },
    hideAlert(state) {
      state.alert = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
