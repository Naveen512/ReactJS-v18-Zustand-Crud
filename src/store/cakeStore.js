import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

export const useCakeStore = create(
  devtools(
    immer((set) => ({
      cakesData: [],
      getApi: async () => {
        const apiResponse = await axios.get("http://localhost:4000/cakes");
        set((state) => {
          state.cakesData = apiResponse.data;
        });
      },
      createCakeAPI: async (payload) => {
        const apiResponse = await axios.post(
          "http://localhost:4000/cakes",
          payload
        );
        set((state) => {
          state.cakesData.push(apiResponse.data);
        });
      },
      updateCakeAPI: async (payload) => {
        const apiResponse = await axios.put(
          `http://localhost:4000/cakes/${payload.id}`,
          payload
        );
        set((state) => {
          let cakeState = state.cakesData.filter((_) => _.id !== payload.id);
          cakeState.push(apiResponse.data);
          state.cakesData = cakeState;
        });
      },
      deleteCakeAPI: async (id) => {
        const apiResponse = await axios.delete(
          `http://localhost:4000/cakes/${id}`
        );
        set((state) => {
          state.cakesData = state.cakesData.filter((_) => _.id !== id);
        });
      },
    }))
  )
);

export const getcakeById = (id) => {
  return (state) => {
    let cake = state.cakesData.filter((c) => c.id === Number(id));
    if (cake) {
      return cake[0];
    }
    return null;
  };
};
