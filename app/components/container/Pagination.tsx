"use client";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

const Pagination = ({
  totalPages,
  onPageChange,
}: {
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
    router.push(createPageURL(page));
  };

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const allPages = generatePagination(currentPage, totalPages);

  const PaginationNumber = ({
    page,
    position,
    isActive,
  }: {
    page: number | string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "rounded-l-sm": position === "first" || position === "single",
        "rounded-r-sm": position === "last" || position === "single",
        "z-10 bg-yellow-600 border-yellow-800 text-white": isActive,
        "hover:bg-gray-100": !isActive && position !== "middle",
        "text-gray-300 pointer-events-none": position === "middle",
      }
    );

    return (
      <button
        onClick={() => typeof page === "number" && handlePageChange(page)}
        className={className}
        disabled={page === "..."}
      >
        {page}
      </button>
    );
  };

  const PaginationArrow = ({
    page,
    direction,
    isDisabled,
  }: {
    page: number;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "pointer-events-none text-gray-300": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );

    const icon =
      direction === "left" ? (
        <HiChevronLeft size={20} />
      ) : (
        <HiChevronRight size={20} />
      );

    return (
      <button
        onClick={() => !isDisabled && handlePageChange(page)}
        disabled={isDisabled}
        className={className}
      >
        {icon}
      </button>
    );
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        page={currentPage - 1}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        page={currentPage + 1}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

export default Pagination;
