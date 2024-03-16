"use client";
import React, { useState, useEffect } from "react";
import Item from "./Item";
import Pagination from "./Pagination";
import { Product } from "../../common/types";
import axios from "axios";

const Container = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCache, setProductsCache] = useState<{
    [key: number]: Product[];
  }>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    const fetchData = async (pageToFetch: number) => {
      setIsLoading(true);
      if (productsCache[pageToFetch]) {
        if (pageToFetch === page) {
          setProducts(productsCache[pageToFetch]);
        }
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/paginatedproducts?page=${pageToFetch}&limit=${limit}`
        );
        const newProducts = response.data.products;
        setProductsCache((prevCache) => ({
          ...prevCache,
          [pageToFetch]: newProducts,
        }));

        if (pageToFetch === page) {
          setProducts(newProducts);
          setTotalPages(Math.ceil(response.data.total / limit));
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(page);
    if (page > 1) {
      fetchData(page - 1);
    }
    fetchData(page + 1);
  }, [page, productsCache]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (productsCache[newPage]) {
      setProducts(productsCache[newPage]);
    }
  };

  return (
    <div className="mb-[200px]">
      {isLoading && products.length == 0 ? (
        <div>Loading Products... Please wait! 🔄</div>
      ) : (
        <>
          <div className="flex">
            <div className="px-20">
              <Item products={products} />
            </div>
          </div>
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Container;
