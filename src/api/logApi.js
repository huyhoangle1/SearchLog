import { customAxios } from "./customAxios";

const LOG_API_URL = process.env.REACT_APP_LOG_API_URL;

export default {
    getLog: async (courseId, courseCode, courseTitle, userName, path, domain, status, fromDate, toDate, pageNumber, pageSize) => {
      const res = await customAxios({
        method: "get",
        url: LOG_API_URL,
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
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      });
      return res.data;
    },
  };