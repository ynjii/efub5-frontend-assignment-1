import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.efub-seminar.o-r.kr",
  headers: {
    //콘텐츠 타입 넣기
    "Content-Type": "application/json",
    //jwt를 사용한다면 여기에 Authorization 헤더를 추가
  },
});

export default axiosInstance;
