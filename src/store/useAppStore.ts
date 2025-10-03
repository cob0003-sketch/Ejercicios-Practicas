import {create} from "zustand"
import { persist, devtools} from 'zustand/middleware';
import { createPersonsSlice, type PersonsSlice } from "./personsSlice"


export const useAppStore = create<PersonsSlice>()(
    devtools(
        persist(
            (...a)=> ({
            ...createPersonsSlice(...a)
        }),
        {
            name:"personsStorage",
            partialize: (state)=> ({
                persons: state.persons
            })
        }
        )
        
    )
)

