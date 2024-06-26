import CardWrapper, { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import {
  fetchLatestInvoices,
  fetchRevenue,
  fetchCardData,
} from "@/app/lib/data";
import { Suspense } from "react";
import { CardsSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";
export default async function Page() {
  const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
  const revenue = await fetchRevenue();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); // wait for fetchLatestInvoices() to finish
  return (
    <main>
      <h1 className={` mb-4 text-xl md:text-2xl text-tea-300`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
          <Card
            title="Total Invoices"
            value={numberOfInvoices}
            type="invoices"
          />
          <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
          />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
