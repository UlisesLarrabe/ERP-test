export type Client = {
  name: string;
  value: string;
};

export const CLIENTS = <Client[]>[
  {
    name: "Local",
    value: "local",
  },
  {
    name: "Delivery",
    value: "delivery",
  },
  {
    name: "Pedidos Ya",
    value: "pedidos_ya",
  },
  {
    name: "Rappi",
    value: "rappi",
  },
];
