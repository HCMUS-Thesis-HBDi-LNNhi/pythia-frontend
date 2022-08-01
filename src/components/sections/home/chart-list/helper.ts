import { IData } from "interfaces/data.interface";

export const getTotalCustomers = (data: IData) => {
  const map = new Map<string, number>();
  data.dim_customers.forEach((customer) => {
    const mapKey = customer.country;
    const mapValue = map.get(mapKey) ?? 0;
    map.set(mapKey, mapValue + 1);
  });
  return map;
};
