"use client";

import { DEFAULT_PAGE, ORDER_PER_PAGE } from "@/src/app/_lib/constants";
import { getPaginationValues } from "@/src/app/utils/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ButtonLabelType = "prev" | "next";
interface OrderPaginationType {
  totalOrders: number | null;
  rangeOrderDataLength: number | undefined;
}

const BUTTONS = [
  { icon: ChevronLeft, label: "prev" },
  { icon: ChevronRight, label: "next" },
];

export default function OrderPagination({
  totalOrders,
  rangeOrderDataLength,
}: OrderPaginationType) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [paginationValues, setPaginationValues] = useState({
    from: 0,
    to: 0,
  });

  const currentPage = searchParams.get("page") ?? DEFAULT_PAGE;
  const totalPages = totalOrders ? Math.ceil(totalOrders / ORDER_PER_PAGE) : 1;

  const lastPage = +currentPage === +totalPages;

  console.log(lastPage, currentPage, totalPages);

  useEffect(() => {
    const { from, to } = getPaginationValues(+currentPage);

    setPaginationValues((cur) => ({ ...cur, from, to }));
  }, [currentPage]);

  function onClickPageControlBtns(label: "prev" | "next") {
    const param = new URLSearchParams(searchParams.toString());

    let page = +currentPage;
    if (label === "prev") {
      page -= 1;
    } else {
      page += 1;
    }

    param.set("page", page.toString());

    router.replace(`${pathname}?${param.toString()}`, { scroll: false });
  }

  const isButtonDisabled = (label: "prev" | "next") => {
    switch (label) {
      case "prev":
        return +currentPage === 1 ? true : false;

      case "next":
        return +currentPage === totalPages ? true : false;
      default:
        break;
    }
  };

  return (
    <div className="pagination flex items-center justify-between">
      <p className="pagination__step">
        Showing <span>{paginationValues?.from + 1}</span> to{" "}
        <span>{lastPage ? (totalOrders ?? 0) : paginationValues?.to + 1}</span>{" "}
        of <span>{totalOrders ?? 0}</span>
      </p>

      <div className="flex items-center gap-4">
        {BUTTONS?.map((button) => (
          <button
            key={button?.label}
            className="group border border-black p-1 hover:bg-black disabled:cursor-not-allowed disabled:border-neutral-400 disabled:bg-transparent"
            aria-label={button?.label}
            onClick={() =>
              onClickPageControlBtns(button.label as ButtonLabelType)
            }
            disabled={isButtonDisabled(button.label as ButtonLabelType)}
          >
            <button.icon className="size-5 transition-all group-hover:text-white group-disabled:text-neutral-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
