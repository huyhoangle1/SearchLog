import { customAxios } from "./customAxios";

export default {
    getLog: async (courseId, courseCode, courseTitle, userName, path, domain, status, fromDate, toDate) => {
      const res = await customAxios({
        method: "get",
        url: `http://localhost:62325/api/Log`,
        params: {
          courseId: courseId,
          courseCode: courseCode,
          courseTitle: courseTitle,
          userName: userName,
          path: path,
          domain: domain,
          status: status,
          fromDate: fromDate,
          toDate: toDate,
        },
      });
      return res.data;
    },
  };