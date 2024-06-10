export type Item = {
  id: number;
  item_name: string;
  item_details: string;
  hsn_sac: string;
  qty: number;
  rate: number;
};

export const fakeData: Item[] = [
  {
    id: 1,
    item_name: "Item1",
    item_details: "Item1 Detail",
    hsn_sac: "123/321",
    qty: 1,
    rate: 20,
  },
  {
    id: 2,
    item_name: "Item2",
    item_details: "Item2 Detail",
    hsn_sac: "183/321",
    qty: 10,
    rate: 20,
  },
  {
    id: 3,
    item_name: "Item3",
    item_details: "Item3 Detail",
    hsn_sac: "183/327",
    qty: 5,
    rate: 50,
  },
];

// export const items = [
//   {
//     id: "vszax",
//     itemName: "Item1",
//   },
//   {
//     id: "btlac",
//     itemName: "Item2",
//   },
//   {
//     id: "dnhtr",
//     itemName: "Item3",
//   },
// ];
