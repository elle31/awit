"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { DetailsSchema } from "./schema";
import { getDetailsByRegistrationId, updateDetails } from '@/actions/details';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck2, Upload, X, ArrowLeft } from "lucide-react";
import { useSearchParams } from 'next/navigation';

type FormData = z.infer<typeof DetailsSchema>;

export const dynamic = 'force-dynamic';

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

function DetailsPageContent() {
  const { t } = useTranslation(); // Ensure useTranslation is called within the component
  const searchParams = useSearchParams(); // useSearchParams requires a client component
  const id = searchParams.get('id'); // Get id from search params


 const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(DetailsSchema),
    defaultValues: { // Set default values here
      type: '',
      name: '',
      registrationNumber: '',
      tonnage: 0,
      length: 0,
      breadth: 0,
      depth: 0,
      engineMake: '',
      horsepower: 0,
      netTonnage: 0,
      grossTonnage: 0,
      fishingGear: '',
    }
  });

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const data = await getDetailsByRegistrationId(id as string);
        if (data) {
          // Set form values with loaded data
          Object.keys(data).forEach(key => {
            setValue(key as keyof FormData, (data as any)[key]);
          });
        }
      } catch (error) {
        toast.error("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  });
 const registrationType = watch("type");

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

        {t("Registration Details")}
      </h1>
      <p className="text-muted-foreground">
        {t("Provide the details for your vessel or fishing gear.")}
      </p>
      {loading ? ( // Conditional rendering based on loading state
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* form fields */}
          <div>
            <Label htmlFor="type">{t("Type")}</Label>
            <Input id="type" {...register("type")} />
            {errors.type && <p>{errors.type.message}</p>}
          </div>

           {registrationType === 'Vessel' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("Vessel Information")}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("Vessel Name")}</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="registrationNumber">{t("Registration Number")}</Label>
                    <Input id="registrationNumber" {...register("registrationNumber")} />
                    {errors.registrationNumber && <p className="text-red-500 text-sm">{errors.registrationNumber.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tonnage">{t("Tonnage (Gross)")}</Label>
                    <Input id="tonnage" type="number" step="0.01" {...register("tonnage", { valueAsNumber: true })} />
                    {errors.tonnage && <p className="text-red-500 text-sm">{errors.tonnage.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="length">{t("Length (meters)")}</Label>
                    <Input id="length" type="number" step="0.01" {...register("length", { valueAsNumber: true })} />
                    {errors.length && <p className="text-red-500 text-sm">{errors.length.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="breadth">{t("Breadth (meters)")}</Label>
                    <Input id="breadth" type="number" step="0.01" {...register("breadth", { valueAsNumber: true })} />
                    {errors.breadth && <p className="text-red-500 text-sm">{errors.breadth.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="depth">{t("Depth (meters)")}</Label>
                    <Input id="depth" type="number" step="0.01" {...register("depth", { valueAsNumber: true })} />
                    {errors.depth && <p className="text-red-500 text-sm">{errors.depth.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engineMake">{t("Engine Make")}</Label>
                    <Input id="engineMake" {...register("engineMake")} />
                     {errors.engineMake && <p className="text-red-500 text-sm">{errors.engineMake.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="horsepower">{t("Horsepower")}</Label>
                    <Input id="horsepower" type="number" step="0.01" {...register("horsepower", { valueAsNumber: true })} />
                     {errors.horsepower && <p className="text-red-500 text-sm">{errors.horsepower.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="netTonnage">{t("Net Tonnage")}</Label>
                    <Input id="netTonnage" type="number" step="0.01" {...register("netTonnage", { valueAsNumber: true })} />
                     {errors.netTonnage && <p className="text-red-500 text-sm">{errors.netTonnage.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="grossTonnage">{t("Gross Tonnage")}</Label>
                    <Input id="grossTonnage" type="number" step="0.01" {...register("grossTonnage", { valueAsNumber: true })} />
                     {errors.grossTonnage && <p className="text-red-500 text-sm">{errors.grossTonnage.message}</p>}
                  </div>
                </CardContent>
              </Card>
            )}

            {registrationType === 'Fishing Gear' && (
                <Card>
                    <CardHeader>
                        <CardTitle>{t("Fishing Gear Information")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Textarea id="fishingGear" {...register("fishingGear")} placeholder={t("Describe your fishing gear")} />
                    </CardContent>
                </Card>
            )}
          {/* Add other fields similarly... */}

          <Button type="submit" disabled={isSubmitting}>
            {t("Save & Continue")}
          </Button>
        </form>
      )}
    </div>
  );
}
export default function DetailsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DetailsPageContent />
    </Suspense>
  );
}
