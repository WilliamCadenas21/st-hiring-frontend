import { rest } from "msw";

const exampleResponse = {
  clientId: 123,
  deliveryMethods: [
    {
      name: "Print Now",
      enum: "PRINT_NOW",
      order: 1,
      isDefault: true,
      selected: true,
    },
    {
      name: "Print@Home",
      enum: "PRINT_AT_HOME",
      order: 2,
      isDefault: false,
      selected: true,
    },
  ],
  fulfillmentFormat: {
    rfid: false,
    print: false,
  },
  printer: {
    id: "423",
  },
  printingFormat: {
    formatA: true,
    formatB: false,
  },
  scanning: {
    scanManually: true,
    scanWhenComplete: false,
  },
  paymentMethods: {
    cash: true,
    creditCard: false,
    comp: false,
  },
  ticketDisplay: {
    leftInAllotment: true,
    soldOut: true,
  },
  customerInfo: {
    active: false,
    basicInfo: false,
    addressInfo: false,
  },
};

export const handlers = [
  rest.get("http://localhost:3000/mobile-config-by-client-id", (req, res, ctx) => {
    const clientId = req.url.searchParams.get("clientId");
    // you can vary response based on id if needed
    return res(
      ctx.status(200),
      ctx.json({ ...exampleResponse, clientId: Number(clientId) })
    );
  }),
];
