export interface DeliveryMethod {
  name: string;
  enum: string;
  order: number;
  isDefault: boolean;
  selected: boolean;
}

export interface FulfillmentFormat {
  rfid: boolean;
  print: boolean;
}

export interface Printer {
  id: string;
}

export interface PrintingFormat {
  formatA: boolean;
  formatB: boolean;
}

export interface Scanning {
  scanManually: boolean;
  scanWhenComplete: boolean;
}

export interface PaymentMethods {
  cash: boolean;
  creditCard: boolean;
  comp: boolean;
}

export interface TicketDisplay {
  leftInAllotment: boolean;
  soldOut: boolean;
}

export interface CustomerInfo {
  active: boolean;
  basicInfo: boolean;
  addressInfo: boolean;
}

export interface ClientConfig {
  clientId: number;
  deliveryMethods: DeliveryMethod[];
  fulfillmentFormat: FulfillmentFormat;
  printer: Printer;
  printingFormat: PrintingFormat;
  scanning: Scanning;
  paymentMethods: PaymentMethods;
  ticketDisplay: TicketDisplay;
  customerInfo: CustomerInfo;
}

export interface ClientConfigState {
  data: ClientConfig | null;
  loading: boolean;
  error: string | null;
}
