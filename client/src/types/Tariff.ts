// Define the attributes structure of a tariff
export interface TariffAttributes {
  gesellschaft: string;
  tarifname: string;
  deckungssumme: number;
  jahresbeitrag: number;
  erfuellungsgrad: number;
}

// Define the full tariff structure
export interface Tariff {
  id: string;
  type: string;
  attributes: TariffAttributes;
}
