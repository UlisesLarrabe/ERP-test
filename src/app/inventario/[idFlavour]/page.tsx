import { createClient } from "@/utils/supabase/server";
import FlavourEdit from "@/components/inventory/flavour-edit";

const FlavourDetail = async ({
  params,
}: {
  params: Promise<{ idFlavour: string }>;
}) => {
  const { idFlavour } = await params;
  const supabase = await createClient();
  const { data: flavour } = await supabase
    .from("flavours")
    .select("*")
    .eq("id", idFlavour);

  return <FlavourEdit flavour={flavour?.[0]} />;
};

export default FlavourDetail;
