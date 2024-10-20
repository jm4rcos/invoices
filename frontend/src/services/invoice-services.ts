import toast from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;

export const uploadInvoice = async (file: File) => {
  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await fetch(`${apiUrl}/invoices/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Erro ao fazer upload da fatura");
      throw new Error("Erro ao fazer upload da fatura");
    }

    const data = await response.json();
    toast.success("Fatura enviada com sucesso!");
    return data;
  } catch (error) {
    toast.error("Erro ao fazer upload da fatura");
    console.error("Erro ao fazer upload da fatura:", error);
  }
};
