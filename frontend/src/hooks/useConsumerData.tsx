import { useQuery } from "@tanstack/react-query";

const getAllConsumers = async () => {
  const response = await fetch(`http://localhost:3333/api/consumers`);
  return response.json();
};

export const useConsumerData = () => {
  return useQuery({
    queryKey: ["consumers"],
    queryFn: getAllConsumers,
  });
};
