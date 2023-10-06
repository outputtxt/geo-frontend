import { setupWorker, rest } from 'msw'

const getHedefListesiWorker = setupWorker(
  rest.get('https://baseurl/getHedefListesi', async (req, res, ctx) => {
    

    return res(
      ctx.json( [{
        target= "cemal",
        targetType= "imei"
      },{
        target= "cemal2",
        targetType= "msdn"
      }]
      )
    )
  }),
)

getHedefListesiWorker.start();
