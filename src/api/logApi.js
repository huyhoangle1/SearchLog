import { customAxios } from "./customAxios";

export default {
    getLog: async () => {
      const res = await customAxios({
        method: "get",
        url: `http://localhost:62325/api/Log`,
      });
      return res.data;
    },
  };