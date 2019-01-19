import base from "@/api/base";
import Mock from "mockjs";

import { getData } from "./dataDetail";

export default Mock.mock(`${base}/invitationDetails`, "post", getData);
