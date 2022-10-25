import axios from "axios";
import store from "../../Redux/store";
import updateUserBodyType from "../../Utils/Types/UpdateUserBodyType";

const baseurl = import.meta.env.VITE_URL;
const config = {
  "Content-Type": "application/json",
  headers: {
    Authorization: `Bearer ${store.getState().loginDetail.token}`,
  },
};

const getUserDetailById = async (id: string) => {
  const req = axios.get(`${baseurl}/api/user/${id}`, config);
  const res = await req;
  return res.data;
};
const updateUserById = async (id: string, body: updateUserBodyType) => {
  const req = axios.post(`${baseurl}/api/user/${id}`, body, config);
  const res = await req;
  return res.data;
};

export { getUserDetailById, updateUserById };
