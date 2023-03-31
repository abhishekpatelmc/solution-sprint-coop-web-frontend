import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import type { Company } from "../types";
import PaginationButtons from "./components/PaginationButtons";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const Home: NextPage = () => {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [topCompanies, setTopCompanies] = useState<Company[]>([]);
  const [itemOffset, setItemOffset] = useState<number>(0);

  const [query, setQuery] = useState<string>("");

  const itemsPerPage = 5;

  const handlePageClick = (event: { selected: number }): number => {
    const newOffset = (event.selected * itemsPerPage) % topCompanies.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    return 1;
  };

  const pageCount = Math.ceil(topCompanies.length / itemsPerPage);
  console.log(`Pagecount is ${pageCount}`);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies`)
        .then((res) => res.json())
        .then((data: Company[]) => {
          setAllCompanies(data);
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/top`)
        .then((res) => res.json())
        .then((data: Company[]) => {
          setTopCompanies(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 bg-cover bg-center">
      <Navbar />
      <Hero />
      <Head>
        <title>Lancer&apos;s View</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-slate-800">
        <div>
          {/* <Image src={bannerImg} alt="Banner Image" className="w-full" /> */}
          <div className="my-8 mx-10">
            <span className="text-4xl font-bold text-slate-900">
              Top Companies
            </span>
          </div>
          <div className="mx-20 mb-14 flex justify-between space-x-5">
            {topCompanies.slice(0, 5).map((company) => (
              <Link
                key={company.company_name}
                href={{
                  pathname: "/company",
                  query: { company_id: company._id },
                }}
                className={
                  "flex items-center justify-center rounded-xl bg-white bg-gradient-to-t py-4 px-12 text-base shadow-2xl shadow-slate-400 transition duration-300 ease-in-out hover:scale-110"
                }
              >
                <Image
                  src={company.logo_image_url}
                  width={200}
                  height={200}
                  alt={""}
                />
              </Link>
            ))}
          </div>
          <div className="mb-14 flex justify-center">
            <div className="flex flex-row items-center gap-3">
              <p className="text-xl text-slate-700">
                Have an employer in mind?
              </p>
              <input
                className="h-11 w-96 rounded-lg px-2 py-1 text-center text-base shadow-2xl shadow-slate-600"
                placeholder="Search companies or locations"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="space-y-5">
              {allCompanies
                .filter((filtered) =>
                  filtered.company_name?.toLowerCase().includes(query)
                )
                .slice(itemOffset, itemOffset + itemsPerPage)
                .map((comp) => (
                  <div
                    key={comp._id}
                    className="flex flex-col items-center justify-center"
                  >
                    <Link
                      href={{
                        pathname: "/company",
                        query: { company_id: comp._id },
                      }}
                      className="relative mx-auto flex max-w-xs flex-col rounded-xl border border-white bg-white px-8 shadow-xl shadow-slate-300 transition duration-300 ease-in-out hover:scale-105 md:max-w-3xl md:flex-row md:space-x-5 md:space-y-0"
                    >
                      <div className="grid w-full place-items-center bg-white  py-8 px-6 md:w-96">
                        <Image
                          width={320}
                          height={200}
                          src={comp.logo_image_url}
                          alt="company images"
                          className="rounded-xl object-fill"
                        />
                      </div>
                      <div className="flex w-full flex-col justify-center space-y-2 bg-white py-6 md:w-2/3">
                        <h3 className="text-xl font-black  md:text-3xl">
                          {comp.company_name}
                        </h3>
                        <div className="item-center flex justify-between">
                          <p className="hidden font-medium text-slate-500 md:block">
                            {comp.location}
                          </p>
                        </div>
                        <div className="item-center flex justify-between">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <p className="ml-1 text-sm font-bold text-slate-600">
                              {comp.acceptance_rate}
                              <span className="font-normal text-slate-500">
                                ({comp.review_count} reviews)
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <p className="ml-1 text-sm font-bold text-slate-600">
                              {comp.acceptance_rate}
                              <span className="font-normal text-slate-500">
                                ({comp.interview_count} interviews)
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <p className="ml-1 text-sm font-bold text-slate-600">
                              {comp.acceptance_rate}
                              <span className="font-normal text-slate-500">
                                ({comp.review_count} reviews)
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-black text-slate-800">
                          <span>Common jobs</span>
                          {comp.common_job_posts}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <PaginationButtons
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
