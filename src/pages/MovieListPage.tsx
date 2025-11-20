import React, { useEffect, useState, type JSX } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdb';
import { Header } from '../components/layout/Header';

type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  release_date?: string;
};

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function ShimmerCard() {
  return (
    <div className="bg-dark-800 rounded overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-dark-700" />
      <div className="p-3">
        <div className="h-4 bg-dark-700 rounded mb-2 w-3/4" />
        <div className="h-3 bg-dark-700 rounded mb-1 w-1/2" />
        <div className="h-3 bg-dark-700 rounded mt-2 w-full" />
      </div>
    </div>
  );
}

export default function MovieListPage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // reset to first page when query changes
  useEffect(() => {
    setPage(1);
  }, [q]);

  useEffect(() => {
    if (!q.trim()) {
      setMovies([]);
      setError(null);
      setTotalPages(1);
      return;
    }

    let mounted = true;
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        // keep previous results visible until new data arrives by removing setMovies([])

        const res = await searchMovies(q.trim(), page);
        const list: Movie[] = Array.isArray(res.data?.results) ? res.data.results : [];
        if (mounted) {
          setMovies(list);
          setTotalPages(res.data?.total_pages ?? 1);
        }
      } catch (err: any) {
        if (mounted) setError(err?.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchMovies();
    return () => {
      mounted = false;
    };
  }, [q, page]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goTo = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  // number of shimmer placeholders to show while loading
  const SHIMMER_COUNT = 12;

  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-white mb-4">Results for &quot;{q}&quot;</h1>

      {error && <p className="text-red-400">Error: {error}</p>}

      {(!loading && movies.length === 0 && !error) && (
        <p className="text-gray-400">No movies found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {loading
          ? // show shimmer placeholders while loading
            Array.from({ length: SHIMMER_COUNT }).map((_, i) => <ShimmerCard key={`shimmer-${i}`} />)
          : // show movie results
            movies.map((m) => (
              <div key={m.id} className="bg-dark-800 rounded overflow-hidden">
                {m.poster_path ? (
                  <img
                    src={`${IMAGE_BASE}${m.poster_path}`}
                    alt={m.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-dark-700 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-3">
                  <h2 className="text-white font-medium text-sm">{m.title}</h2>
                  {m.release_date && <p className="text-gray-400 text-xs">{m.release_date}</p>}
                  {m.overview && (
                    <p className="text-gray-300 text-xs mt-2 line-clamp-3">{m.overview}</p>
                  )}
                </div>
              </div>
            ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={page <= 1}
            className={`px-3 py-1 bg-dark-700 text-gray-300 rounded ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-600'}`}
          >
            Prev
          </button>

          <span className="text-gray-300">
            Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
            {loading && <span className="ml-3 text-sm text-gray-400">Loading...</span>}
          </span>

          <button
            onClick={goNext}
            disabled={page >= totalPages}
            className={`px-3 py-1 bg-dark-700 text-gray-300 rounded ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-dark-600'}`}
          >
            Next
          </button>
        </div>

        {/* Quick jump */}
        <div className="flex items-center gap-2">
          <label className="text-gray-300 text-sm">Go to:</label>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => {
              const v = Number(e.target.value || 1);
              if (!Number.isNaN(v)) goTo(Math.min(Math.max(1, v), totalPages));
            }}
            className="w-20 px-2 py-1 rounded bg-dark-800 text-white border border-dark-700"
          />
        </div>
      </div>
    </div>
    </>
  );
}