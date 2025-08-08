"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { DetailsSchema } from "./schema";
import { getDetailsByRegistrationId, updateDetails } from "@/actions/details";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/lib/i18n/client";

type FormData = z.infer<typeof DetailsSchema>;

function DetailsPageContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useParams();

export default function DetailsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(DetailsSchema),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const data = await getDetailsByRegistrationId(id as string);
        if (data) {
          setValue("type", data.type);
          setValue("name", data.name);
          setValue("registrationNumber", data.registrationNumber);
          setValue("tonnage", data.tonnage);
          setValue("length", data.length);
          setValue("breadth", data.breadth);
          setValue("depth", data.depth);
          setValue("engineMake", data.engineMake);
          setValue("horsepower", data.horsepower);
          setValue("netTonnage", data.netTonnage);
          setValue("grossTonnage", data.grossTonnage);
          setValue("fishingGear", data.fishingGear);
        }
      } catch (error) {
        toast.error("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateDetails(id as string, data);
      toast.success("Details saved successfully!");
      router.push(`/fisherfolk/register/complete/${id}`);
    } catch (error) {
      toast.error("Failed to save details.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold font-headline tracking-tight">

        {t("New Registration - Step 2")}
      </h1>
      <p className="text-muted-foreground">
        {t("Provide the details for your vessel or fishing gear.")}
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* form fields */}
          <div>
            <Label htmlFor="type">{t("Type")}</Label>
            <Input id="type" {...register("type")} />
            {errors.type && <p>{errors.type.message}</p>}
          </div>

          {/* Add other fields similarly... */}

          <Button type="submit" disabled={isSubmitting}>
            {t("Save & Continue")}
          </Button>
        </form>
      )}
    </div>
  );
}
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DetailsPageContent />
    </Suspense>
  );
}
