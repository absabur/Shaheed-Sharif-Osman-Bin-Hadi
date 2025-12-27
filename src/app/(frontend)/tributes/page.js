import { AllTribute } from "@/serverAction";
import Tributes from "@/components/Tributes";
import { Suspense } from "react";
import TributeSkeleton from "@/components/common/TributeSkeleton";

export default async function TributesPage({ searchParams }) {
  const params = await searchParams;
  return (
    <Suspense fallback={<TributeSkeleton />}>
      <TributesLoad key={JSON.stringify(params)} searchParams={params} />
    </Suspense>
  );
}
async function TributesLoad({ searchParams }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 20;

  const { tributes, totalPages } = await AllTribute(currentPage, limit);

  return (
    <Tributes
      key={JSON.stringify(tributes)} // To force re-render on data change
      tributes={tributes}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
