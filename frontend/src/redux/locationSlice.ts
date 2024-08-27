import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LocationObj {
    Position: [number, number];
    Name: string;
}

interface LocationState {
    currentLocation: LocationObj;
}



const initialState: LocationState = {
    currentLocation: {
        Position: [31.5497, 74.3436], // Coordinates for Lahore
        Name: 'Lahore'
    }
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation : (state, action: PayloadAction<LocationState>) =>{
            state.currentLocation = action.payload.currentLocation;
        },
        clearLocation: (state) => {
            state.currentLocation = initialState.currentLocation;
        }
    }
})

export const {setLocation, clearLocation} = locationSlice.actions;

export default locationSlice.reducer;