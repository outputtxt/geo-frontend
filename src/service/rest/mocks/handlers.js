import { rest } from "msw";
import mockHedefListesiData from "./data/mockHedefListesiData.json";

export const handlers = [
  rest.get("https://baseurl/getHedefListesi", async (req, res, ctx) => {
    return res(
      ctx.json([mockHedefListesiData]),
      // ctx.json([
      //   {
      //     target: "cemal",
      //     targetType: "imei",
      //   },
      //   {
      //     target: "cemal2",
      //     targetType: "msdn",
      //   },
      // ]),
    );
  }),
];
