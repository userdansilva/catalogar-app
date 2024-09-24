import { designService } from "@/services/designService";

export async function DesignsCatalog() {
  const data = await designService.getAll();

  console.log(data);

  return (
    <div>
      ...
    </div>
  );
}
