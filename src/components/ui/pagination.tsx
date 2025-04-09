import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  additionalParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, baseUrl, additionalParams = {} }: PaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Calculate range around current page
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where needed
    let l;
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  // Helper function to build URL with all parameters
  const buildUrl = (page: number) => {
    const params = new URLSearchParams({ ...additionalParams, page: page.toString() });
    return `${baseUrl}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex justify-center items-center space-x-2"
    >
      <Link
        href={buildUrl(currentPage - 1)}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4",
          "hover:bg-gray-100",
          currentPage <= 1 ? "pointer-events-none opacity-50" : ""
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Link>

      <div className="flex items-center space-x-2">
        {pageNumbers.map((pageNumber, i) => (
          pageNumber === '...' ? (
            <span
              key={`dots-${i}`}
              className="px-4 py-2"
            >
              ...
            </span>
          ) : (
            <Link
              key={pageNumber}
              href={buildUrl(pageNumber as number)}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 w-10",
                pageNumber === currentPage
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100"
              )}
              aria-current={pageNumber === currentPage ? "page" : undefined}
            >
              {pageNumber}
            </Link>
          )
        ))}
      </div>

      <Link
        href={buildUrl(currentPage + 1)}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4",
          "hover:bg-gray-100",
          currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Link>
    </nav>
  );
} 