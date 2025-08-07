
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from 'react';
import { registrations, getStatusIcon, Registration } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RefreshCw, FilePenLine, Eye } from "lucide-react";
import { useTranslation } from "@/contexts/language-context";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import MyRegistrationsClientComponent from './MyRegistrationsClientComponent';

export const dynamic = 'force-dynamic';
export default function MyRegistrationsPage() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [myRegistrations, setMyRegistrations] = useState<Registration[]>(registrations.filter(r => r.ownerName === 'Juan Dela Cruz'));
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

    const handleRenew = (registrationId: string) => {
        const newExpiryDate = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];
        
        const updatedRegistrations = myRegistrations.map(reg => {
            if (reg.id === registrationId) {
                const newHistory = [...reg.history, {
                    action: 'Renewed',
                    date: new Date().toISOString().split('T')[0],
                    actor: reg.ownerName
                }];
                return { ...reg, status: 'Approved' as 'Approved', expiryDate: newExpiryDate, history: newHistory };
            }
            return reg;
        });

        const globalUpdatedRegistrations = registrations.map(reg => {
             if (reg.id === registrationId) {
                const newHistory = [...reg.history, {
                    action: 'Renewed',
                    date: new Date().toISOString().split('T')[0],
                    actor: reg.ownerName
                }];
                return { ...reg, status: 'Approved' as 'Approved', expiryDate: newExpiryDate, history: newHistory };
            }
            return reg;
        });
        
        setMyRegistrations(updatedRegistrations);
        registrations.length = 0;
        Array.prototype.push.apply(registrations, globalUpdatedRegistrations);


        toast({
            title: "License Renewed",
            description: `Registration ${registrationId} has been renewed until ${newExpiryDate}.`,
        });
    };

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <MyRegistrationsClientComponent />
    </Suspense>
  );
}

function MyRegistrationsClientComponent() {
 const { t } = useTranslation();
    const { toast } = useToast();
    const [myRegistrations, setMyRegistrations] = useState<Registration[]>(registrations.filter(r => r.ownerName === 'Juan Dela Cruz'));
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

    const handleRenew = (registrationId: string) => {
        const newExpiryDate = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];

        const updatedRegistrations = myRegistrations.map(reg => {
            if (reg.id === registrationId) {
                const newHistory = [...reg.history, {
                    action: 'Renewed',
                    date: new Date().toISOString().split('T')[0],
                    actor: reg.ownerName
                }];
                return { ...reg, status: 'Approved' as 'Approved', expiryDate: newExpiryDate, history: newHistory };
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                        <p><strong>{t("Registration Date:")}</strong> {reg.registrationDate}</p>
                        <p><strong>{t("Expiry Date:")}</strong> {reg.expiryDate}</p>
                    </CardContent>
                    <div className="p-6 pt-0 flex gap-2">
                        {reg.status !== 'Pending' && (
                            <Button variant="default" size="sm" className="flex-1" onClick={() => handleRenew(reg.id)}>
                                <RefreshCw className="mr-2 h-4 w-4" /> {t("Renew")}
                            </Button>
                        )}
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedRegistration(reg)}>
                                <Eye className="mr-2 h-4 w-4" /> {t("Details")}
                            </Button>
                        </DialogTrigger>

                    </div>
                </Card>
                )
            })}
            </div>
        )}
        </div>
            </div>
        )}

        {/* Dialog for Registration Details */}
      {selectedRegistration && (
 <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{t("Registration Details")}</DialogTitle>
                    <DialogDescription>
                        {t("Summary for registration ID")}: {selectedRegistration.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
                     <div>
                        <h4 className="font-medium text-sm mb-2">{t("Owner Information")}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                             <p><strong>{t("Name")}:</strong> {selectedRegistration.ownerName}</p>
                             <p><strong>{t("Address")}:</strong> {selectedRegistration.address}</p>
                             <p><strong>{t("Contact")}:</strong> {selectedRegistration.contact}</p>
                        </div>
                    </div>
                    <Separator />
                    {selectedRegistration.type === 'Vessel' ? (
                        <div>
                            <h4 className="font-medium text-sm mb-2">{t("Vessel Details")}</h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRegistration.vesselDetails}</p>
                        </div>
                    ) : (
                        <div>
                            <h4 className="font-medium text-sm mb-2">{t("Fishing Gear Details")}</h4>
                             <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRegistration.fishingGearDetails}</p>
                         </div>

                     )}
                     <Separator />
                     <div>
                         <h4 className="font-medium text-sm mb-2">{t("History")}</h4>
                         <div className="text-sm text-muted-foreground space-y-2">
                             {selectedRegistration.history.map((item, index) => (
                                 <p key={index}><strong>{item.date}:</strong> {t(item.action)} {t("by")} {item.actor}</p>
                             ))}
                         </div>
                     </div>
                     <Separator />
                      <div>
                         <h4 className="font-medium text-sm mb-2">{t("Fees and Payments")}</h4>
                         <div className="text-sm text-muted-foreground space-y-1">
                             <p><strong>{t("Total Fee")}:</strong> {selectedRegistration.fees.totalFee.toFixed(2)}</p>
                             <p><strong>{t("Status")}:</strong> <Badge variant={selectedRegistration.fees.paymentStatus === 'Paid' ? 'default' : 'secondary'}>{t(selectedRegistration.fees.paymentStatus)}</Badge></p>
                             {selectedRegistration.fees.paymentDate && <p><strong>{t("Payment Date")}:</strong> {selectedRegistration.fees.paymentDate}</p>}
                             {selectedRegistration.fees.transactionId && <p><strong>{t("Transaction ID")}:</strong> {selectedRegistration.fees.transactionId}</p>}
                             {selectedRegistration.fees.paymentMethod && <p><strong>{t("Payment Method")}:</strong> {t(selectedRegistration.fees.paymentMethod)}</p>}
                         </div>
                     </div>
                      <Separator />
                       <div>
                         <h4 className="font-medium text-sm mb-2">{t("Documents")}</h4>
                         <div className="text-sm text-muted-foreground space-y-1">
                             {selectedRegistration.documents.length === 0 ? (
                                 <p>{t("No documents uploaded.")}</p>
                             ) : (
                                 selectedRegistration.documents.map((doc, index) => (
                                     <p key={index}><strong>{t(doc.name)}:</strong> <a href={doc.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">{t("View Document")}</a></p>
                                 ))
                             )}
                         </div>
                        </div>
                </div>
            </DialogContent>
        )}
    </Dialog>
  );
}

