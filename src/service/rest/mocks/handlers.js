import { rest } from "msw";

export const handlers = [
  rest.get("https://baseurl/getHedefListesi", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          target: "cemal",
          targetType: "imei",
        },
        {
          target: "cemal2",
          targetType: "msdn",
        },
      ]),
    );
  }),
];
