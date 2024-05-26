import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    isOpen: boolean;
    expanded: string[];
}

const initialState: SidebarState = {
    isOpen: false,
    expanded: [],
};

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        setExpanded(state, action: PayloadAction<string[]>) {
            state.expanded = action.payload;
        },
        collapseAll(state) {
            state.expanded = [];
        },
    },
});

export const { toggleSidebar, setExpanded, collapseAll } = sidebarSlice.actions;

export default sidebarSlice.reducer;
