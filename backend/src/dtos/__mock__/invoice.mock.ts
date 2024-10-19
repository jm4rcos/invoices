export const mockInvoice = {
  id: "1",
  consumerUnitId: "1",
  referenceMonth: "JAN/2023",
  electricityKwh: 100,
  electricityValue: 50,
  sceeEnergyKwh: 20,
  sceeEnergyValue: 10,
  distributor: "distribuidora",
  compensatedEnergyGDIKwh: 10,
  compensatedEnergyGDIValue: 5,
  totalValue: 55,
  pdfUrl: "https://cloudinary.com/pdf/12345",
  createdAt: new Date("2023-01-01T00:00:00Z"),
  updatedAt: new Date("2023-01-01T00:00:00Z"),
};

export const mockCreateInvoice = {
  consumerUnitId: "1",
  referenceMonth: "JAN/2023",
  distributor: "distribuidora",
  electricityKwh: 100,
  electricityValue: 50,
  sceeEnergyKwh: 20,
  sceeEnergyValue: 10,
  compensatedEnergyGDIKwh: 10,
  compensatedEnergyGDIValue: 5,
  totalValue: 55,
  pdfUrl: "https://cloudinary.com/pdf/12345",
};

export const mockWhereInvoices = [
  {
    id: "1234",
    consumerUnitId: "consumer-1",
    referenceMonth: "2023-01",
  },
  {
    id: "5678",
    consumerUnitId: "consumer-2",
    referenceMonth: "2023-02",
  },
];
