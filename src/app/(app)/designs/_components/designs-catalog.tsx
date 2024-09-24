import Image from "next/image";
import { designService } from "@/services/designService";
import { Badge } from "@/lib/shadcn/ui/badge";

export async function DesignsCatalog() {
  const { designs } = await designService.getAll();

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-6">
      {designs.map((design) => (
        <div className="space-y-2" key={design.id}>
          <Image
            src={design.images[0].url}
            alt="design"
            width={600}
            height={600}
            className="rounded-lg"
          />

          <div className="space-x-1 space-y-1">
            {design.categories.map((category) => (
              <Badge
                key={category.id}
                style={{
                  color: category.textColor,
                  backgroundColor: category.backgroundColor,
                }}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <div className="font-semibold">
            {design.name}
          </div>
        </div>
      ))}
    </div>
  );
}
