import { ORDER_PER_PAGE } from "@/src/app/_lib/constants";

export function getPaginationValues(currentPage: number) {
  const from = +currentPage * ORDER_PER_PAGE - ORDER_PER_PAGE;
  const to = +currentPage * ORDER_PER_PAGE - 1;

  return { from, to };
}
