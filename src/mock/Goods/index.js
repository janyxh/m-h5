import base from "@/api/base";
import Mock from "mockjs";

import { getData } from "./data";

export default Mock.mock(`${base}/goodslist`, "post", getData);
