import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LocationObj {
    id: string;
    Position: [number, number];
    Name: string;
}

interface LocationState {
    currentLocation: LocationObj;
}



const initialState: LocationState = {
    currentLocation: {
        id: '',
        Position: [31.5497, 74.3436],  // Empty array for initial Position
        Name: 'Default Location'
    }
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation : (state, action: PayloadAction<LocationState>) =>{
            state.currentLocation = action.payload.currentLocation;
        },
        setDefault: (state) => {
            state.currentLocation = initialState.currentLocation;
        }
    }
})

export const {setLocation, setDefault} = locationSlice.actions;

export default locationSlice.reducer;