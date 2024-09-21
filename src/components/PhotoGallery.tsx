"use client";

import { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: {
    id: number;
    title: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    title: "",
    "album.title": "",
    "album.user.email": "",
  });

  useEffect(() => {
    fetchPhotos();
  }, [offset, limit, filters]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        offset: offset.toString(),
        limit: limit.toString(),
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/externalapi/photos?${queryParams}`
      );
      if (!response.ok) throw new Error("Failed to fetch photos");
      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching photos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setOffset(0);
  };

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setOffset(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
      <Pagination
        offset={offset}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}
