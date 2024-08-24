import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { toast } from "react-toastify";

function Landing() {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const faq = document.querySelectorAll(".faq");
    Array.from(faq).forEach((item) => {
      const toggleBtn = item.querySelector(".faq-btn");
      toggleBtn.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
  }, []);



  async function handleSupportSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      await api.post("/api/v1/mailing/send", {
        to: data.email,
        subject: "Support - " + data.name,
        text: data.message,
      });
      toast.success("Message sent successfully");
      console.log(data);
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const [plan, setPlan] = useState("monthly");

  return (
    <main>
      <section id="home" className="pt-[165px]">
        <div className="container lg:max-w-[1305px] lg:px-10">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-7/12">
              <div
                className="wow fadeInUp mb-12 lg:mb-0 lg:max-w-[570px] "
                data-wow-delay=".2s"
                style={{ visibility: "visible", animationDelay: "0.2s" }}
              >
                <h1 className="mb-6 text-4xl font-bold leading-tight text-black dark:text-white sm:text-[40px] md:text-[50px] lg:text-[42px] xl:text-[50px]">
                  <span className="inline bg-gradient-1 bg-clip-text text-transparent ">
                    Free Holiday API
                  </span>
                </h1>
                <p className="mb-10 max-w-[475px] text-base leading-relaxed text-body"></p>
                <p className="mb-10 max-w-[475px] text-lg leading-relaxed text-body">
                  Discover the worlds holidays with our free Holiday API. From
                  traditional celebrations to observances, our API provides the
                  holiday data you need.
                </p>
              </div>
            </div>
            <div className="w-full px-4 lg:w-5/12">
              <div
                className="wow fadeInUp relative z-10 mx-auto w-full max-w-[530px] pt-8 lg:mr-0"
                data-wow-delay=".3s"
              >
                <div className="max-auto absolute top-0 left-0 right-0 -z-10 aspect-square w-full rounded-full bg-gradient-1">
                  <div className="absolute bottom-10 left-0">
                    <svg
                      width="65"
                      height="36"
                      viewBox="0 0 65 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.4149 1.83203C53.339 1.57898 51.3475 2.4214 49.2904 4.18456C45.9052 7.08611 40.0313 8.52953 34.7368 4.19769C32.4686 2.34195 30.4917 2.04856 28.8583 2.32079C27.1672 2.60264 25.7448 3.50424 24.6267 4.24961C22.8559 5.43014 20.9059 6.67067 18.66 6.9618C16.3417 7.2623 13.8664 6.54246 11.0465 4.19256C8.68539 2.22501 6.66504 1.84655 5.11312 2.08531C3.52522 2.32961 2.288 3.24185 1.57603 4.08328C1.25719 4.46008 0.69326 4.50708 0.316454 4.18824C-0.0603521 3.86941 -0.107346 3.30548 0.21149 2.92867C1.13803 1.83367 2.73868 0.642115 4.84131 0.318626C6.97991 -0.0103986 9.50274 0.579362 12.1908 2.81939C14.7333 4.93815 16.7266 5.40998 18.4302 5.18915C20.2062 4.95894 21.831 3.96513 23.6352 2.76234L24.131 3.50597L23.6352 2.76234C24.7515 2.01814 26.4572 0.908837 28.5644 0.557635C30.7295 0.196804 33.2212 0.648204 35.8687 2.81426C40.3566 6.48615 45.2562 5.28815 48.1272 2.82739C50.3886 0.889088 52.8657 -0.279434 55.6312 0.057691C58.3691 0.391448 61.1615 2.17558 64.1309 5.60179C64.4541 5.9748 64.4138 6.53924 64.0408 6.86252C63.6678 7.18579 63.1034 7.14547 62.7801 6.77246C59.9402 3.49563 57.5184 2.08846 55.4149 1.83203Z"
                        fill="#F76D8D"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.4149 11.2026C53.339 10.9496 51.3475 11.792 49.2904 13.5552C45.9052 16.4567 40.0312 17.9001 34.7367 13.5683C32.4686 11.7126 30.4916 11.4192 28.8583 11.6914C27.1671 11.9732 25.7447 12.8748 24.6267 13.6202C22.8559 14.8007 20.9058 16.0413 18.66 16.3324C16.3417 16.6329 13.8663 15.9131 11.0464 13.5632C8.68536 11.5956 6.66501 11.2172 5.11309 11.4559C3.52519 11.7002 2.28797 12.6125 1.576 13.4539C1.25716 13.8307 0.69323 13.8777 0.316424 13.5588C-0.0603826 13.24 -0.107377 12.6761 0.211459 12.2993C1.138 11.2043 2.73865 10.0127 4.84128 9.68923C6.97988 9.36021 9.50271 9.94997 12.1907 12.19C14.7333 14.3088 16.7266 14.7806 18.4302 14.5598C20.2061 14.3295 21.831 13.3357 23.6352 12.1329L24.1309 12.8766L23.6352 12.1329C24.7515 11.3887 26.4572 10.2794 28.5644 9.92824C30.7294 9.56741 33.2212 10.0188 35.8686 12.1849C40.3565 15.8568 45.2562 14.6588 48.1271 12.198C50.3885 10.2597 52.8657 9.09117 55.6312 9.4283C58.3691 9.76205 61.1614 11.5462 64.1308 14.9724C64.4541 15.3454 64.4138 15.9098 64.0408 16.2331C63.6678 16.5564 63.1033 16.5161 62.7801 16.1431C59.9401 12.8662 57.5184 11.4591 55.4149 11.2026Z"
                        fill="#F76D8D"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.4149 20.5825C53.339 20.3295 51.3475 21.1719 49.2904 22.935C45.9052 25.8366 40.0312 27.28 34.7367 22.9482C32.4686 21.0924 30.4916 20.7991 28.8583 21.0713C27.1671 21.3531 25.7447 22.2547 24.6267 23.0001C22.8559 24.1806 20.9058 25.4212 18.66 25.7123C16.3417 26.0128 13.8663 25.293 11.0464 22.9431C8.68536 20.9755 6.66501 20.597 5.11309 20.8358C3.52519 21.0801 2.28797 21.9923 1.576 22.8338C1.25716 23.2106 0.69323 23.2576 0.316424 22.9387C-0.0603826 22.6199 -0.107377 22.056 0.211459 21.6792C1.138 20.5842 2.73865 19.3926 4.84128 19.0691C6.97988 18.7401 9.50271 19.3299 12.1907 21.5699C14.7333 23.6886 16.7266 24.1605 18.4302 23.9396C20.2061 23.7094 21.831 22.7156 23.6352 21.5128L24.1309 22.2565L23.6352 21.5128C24.7515 20.7686 26.4572 19.6593 28.5644 19.3081C30.7294 18.9473 33.2212 19.3987 35.8686 21.5647C40.3565 25.2366 45.2562 24.0386 48.1271 21.5779C50.3885 19.6396 52.8657 18.4711 55.6312 18.8082C58.3691 19.1419 61.1614 20.9261 64.1308 24.3523C64.4541 24.7253 64.4138 25.2897 64.0408 25.613C63.6678 25.9363 63.1033 25.896 62.7801 25.523C59.9401 22.2461 57.5184 20.8389 55.4149 20.5825Z"
                        fill="#F76D8D"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.4149 29.9619C53.339 29.7089 51.3475 30.5513 49.2904 32.3144C45.9052 35.216 40.0312 36.6594 34.7367 32.3276C32.4686 30.4718 30.4916 30.1784 28.8583 30.4507C27.1671 30.7325 25.7447 31.6341 24.6267 32.3795C22.8559 33.56 20.9058 34.8006 18.66 35.0917C16.3417 35.3922 13.8663 34.6723 11.0464 32.3224C8.68536 30.3549 6.66501 29.9764 5.11309 30.2152C3.52519 30.4595 2.28797 31.3717 1.576 32.2132C1.25716 32.59 0.69323 32.637 0.316424 32.3181C-0.0603826 31.9993 -0.107377 31.4354 0.211459 31.0586C1.138 29.9635 2.73865 28.772 4.84128 28.4485C6.97988 28.1195 9.50271 28.7092 12.1907 30.9493C14.7333 33.068 16.7266 33.5399 18.4302 33.319C20.2061 33.0888 21.831 32.095 23.6352 30.8922L24.1309 31.6359L23.6352 30.8922C24.7515 30.148 26.4572 29.0387 28.5644 28.6875C30.7294 28.3267 33.2212 28.7781 35.8686 30.9441C40.3565 34.616 45.2562 33.418 48.1271 30.9573C50.3885 29.019 52.8657 27.8504 55.6312 28.1876C58.3691 28.5213 61.1614 30.3055 64.1308 33.7317C64.4541 34.1047 64.4138 34.6691 64.0408 34.9924C63.6678 35.3157 63.1033 35.2754 62.7801 34.9023C59.9401 31.6255 57.5184 30.2183 55.4149 29.9619Z"
                        fill="#F76D8D"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
            data-wow-delay=".2s"
          >
            <p className="text-base text-body">
              <Link to="dashboard">
                <button className="btn-primary btn-lg">
                  Get your free API key
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 pt-[110px]">
        <div className="container max-w-[1390px]">
          <div className="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pt-20 lg:pb-5 xl:px-10">
            <div className="-mx-4 flex flex-wrap justify-center">
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".2s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      fill="currentColor"
                      width="44px"
                      height="44px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        color="currentColor"
                        d="M21.41,8.64s0,0,0-.05a10,10,0,0,0-18.78,0s0,0,0,.05a9.86,9.86,0,0,0,0,6.72s0,0,0,.05a10,10,0,0,0,18.78,0s0,0,0-.05a9.86,9.86,0,0,0,0-6.72ZM4.26,14a7.82,7.82,0,0,1,0-4H6.12a16.73,16.73,0,0,0,0,4Zm.82,2h1.4a12.15,12.15,0,0,0,1,2.57A8,8,0,0,1,5.08,16Zm1.4-8H5.08A8,8,0,0,1,7.45,5.43,12.15,12.15,0,0,0,6.48,8ZM11,19.7A6.34,6.34,0,0,1,8.57,16H11ZM11,14H8.14a14.36,14.36,0,0,1,0-4H11Zm0-6H8.57A6.34,6.34,0,0,1,11,4.3Zm7.92,0h-1.4a12.15,12.15,0,0,0-1-2.57A8,8,0,0,1,18.92,8ZM13,4.3A6.34,6.34,0,0,1,15.43,8H13Zm0,15.4V16h2.43A6.34,6.34,0,0,1,13,19.7ZM15.86,14H13V10h2.86a14.36,14.36,0,0,1,0,4Zm.69,4.57a12.15,12.15,0,0,0,1-2.57h1.4A8,8,0,0,1,16.55,18.57ZM19.74,14H17.88A16.16,16.16,0,0,0,18,12a16.28,16.28,0,0,0-.12-2h1.86a7.82,7.82,0,0,1,0,4Z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    240+ Countries Supported
                  </h3>
                  <p className="text-base text-body">
                    From Afghanistan to Zimbabwe, our API supports over 240 countries.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".3s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_211_934)">
                        <path
                          d="M23.2007 4.24461L38.2241 13.2576C38.3511 13.3337 38.4562 13.4413 38.5292 13.5701C38.6022 13.6989 38.6406 13.8444 38.6406 13.9924C38.6406 14.1405 38.6022 14.286 38.5292 14.4147C38.4562 14.5435 38.3511 14.6512 38.2241 14.7272L22.3203 24.2695L6.41652 14.7272C6.28951 14.6512 6.18437 14.5435 6.11137 14.4147C6.03837 14.286 6 14.1405 6 13.9924C6 13.8444 6.03837 13.6989 6.11137 13.5701C6.18437 13.4413 6.28951 13.3337 6.41652 13.2576L21.4382 4.24461C21.7046 4.08456 22.0095 4 22.3203 4C22.6311 4 22.936 4.08456 23.2024 4.24461H23.2007Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M36.1653 19.9874L38.2241 21.2224C38.3512 21.2984 38.4563 21.4061 38.5293 21.5349C38.6023 21.6637 38.6407 21.8092 38.6407 21.9572C38.6407 22.1052 38.6023 22.2507 38.5293 22.3795C38.4563 22.5083 38.3512 22.616 38.2241 22.692L22.3204 32.2343L6.41658 22.692C6.28956 22.616 6.18443 22.5083 6.11143 22.3795C6.03843 22.2507 6.00005 22.1052 6.00005 21.9572C6.00005 21.8092 6.03843 21.6637 6.11143 21.5349C6.18443 21.4061 6.28956 21.2984 6.41658 21.2224L8.47542 19.9874L22.3204 28.2947L36.1653 19.9874ZM36.1653 28.0378L38.2241 29.2728C38.3512 29.3488 38.4563 29.4565 38.5293 29.5853C38.6023 29.714 38.6407 29.8595 38.6407 30.0076C38.6407 30.1556 38.6023 30.3011 38.5293 30.4299C38.4563 30.5587 38.3512 30.6664 38.2241 30.7424L23.2025 39.7554C22.9361 39.9154 22.6311 40 22.3204 40C22.0096 40 21.7046 39.9154 21.4382 39.7554L6.41658 30.7424C6.28956 30.6664 6.18443 30.5587 6.11143 30.4299C6.03843 30.3011 6.00005 30.1556 6.00005 30.0076C6.00005 29.8595 6.03843 29.714 6.11143 29.5853C6.18443 29.4565 6.28956 29.3488 6.41658 29.2728L8.47542 28.0378L22.3204 36.3451L36.1653 28.0378Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_211_934">
                          <rect width="44" height="44" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Always up-to-date
                  </h3>
                  <p className="text-base text-body">
                    The API is updating daily to provide you with the most
                    accurate and up-to-date holiday data.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".4s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      fill="currentColor"
                      width="44px"
                      height="44px"
                      viewBox="0 0 512 512"
                      enableBackground="new 0 0 512 512"
                    >
                      <g>
                        <path
                          d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
               c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"
                        />
                        <g>
                          <path
                            d="M350.281,169.609l-23.594,21.625C343.016,209.047,352,232.047,352,256c0,52.938-43.062,96-96,96s-96-43.062-96-96
                 s43.062-96,96-96v-32c-70.578,0-128,57.422-128,128s57.422,128,128,128s128-57.422,128-128
                 C384,224.016,372.031,193.344,350.281,169.609z"
                          />
                          <polygon points="272,262.391 307.188,138.688 240,249.609 248,272 		" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Fast and reliable
                  </h3>
                  <p className="text-base text-body">
                    Our machines are always up.
                    <br /> No cold starts and no delays.
                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".2s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      fill="currentColor"
                      width="44px"
                      height="44px"
                      viewBox="0 0 512 512"
                      enableBackground="new 0 0 512 512"
                    >
                      <g>
                        <path
                          d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472
                   c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"
                        />
                        <g>
                          <path
                            d="M350.281,169.609l-23.594,21.625C343.016,209.047,352,232.047,352,256c0,52.938-43.062,96-96,96s-96-43.062-96-96
                     s43.062-96,96-96v-32c-70.578,0-128,57.422-128,128s57.422,128,128,128s128-57.422,128-128
                     C384,224.016,372.031,193.344,350.281,169.609z"
                          />
                          <polygon points="272,262.391 307.188,138.688 240,249.609 248,272 		" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    All holidays between 2000 and 2040
                  </h3>
                  <p className="text-base text-body">
                    Our API delivers holidays spanning from the year 2000 to
                    2040.{" "}
                  </p>
                </div>
              </div>

              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".4s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_211_982)">
                        <path
                          d="M10.0155 8.12727C13.3422 5.24464 17.5981 3.66062 22 3.66677C32.1255 3.66677 40.3333 11.8746 40.3333 22.0001C40.3333 25.9161 39.105 29.5461 37.015 32.5234L31.1667 22.0001H36.6667C36.6669 19.1247 35.822 16.3127 34.2369 13.9137C32.6518 11.5147 30.3965 9.63456 27.7515 8.50699C25.1064 7.37943 22.1883 7.05422 19.3599 7.5718C16.5315 8.08938 13.9177 9.42691 11.8433 11.4181L10.0155 8.12727Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M33.9845 35.8729C30.6578 38.7555 26.4018 40.3396 22 40.3334C11.8745 40.3334 3.66663 32.1256 3.66663 22.0001C3.66663 18.0841 4.89496 14.4541 6.98496 11.4767L12.8333 22.0001H7.33329C7.33306 24.8754 8.178 27.6874 9.76308 30.0864C11.3481 32.4854 13.6034 34.3656 16.2485 35.4932C18.8935 36.6207 21.8117 36.946 24.64 36.4284C27.4684 35.9108 30.0823 34.5733 32.1566 32.5821L33.9845 35.8729Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_211_982">
                          <rect width="44" height="44" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Regular Updates
                  </h3>
                  <p className="text-base text-body">
                    Alway up-to-date with the latest holidays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -z-10">
          <svg
            width="602"
            height="1154"
            viewBox="0 0 602 1154"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.25" filter="url(#filter0_f_26_84)">
              <circle
                cx="577"
                cy="577"
                r="317"
                fill="url(#paint0_linear_26_84)"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_26_84"
                x="0"
                y="0"
                width="1154"
                height="1154"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="130"
                  result="effect1_foregroundBlur_26_84"
                ></feGaussianBlur>
              </filter>
              <linearGradient
                id="paint0_linear_26_84"
                x1="183.787"
                y1="894"
                x2="970.173"
                y2="346.491"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EA5FE"></stop>
                <stop offset="0.541667" stopColor="#BEB3FD"></stop>
                <stop offset="1" stopColor="#90D1FF"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute left-0 -bottom-1/2 -z-10 hidden md:block">
          <svg
            width="622"
            height="1236"
            viewBox="0 0 622 1236"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.2" filter="url(#filter0_f_26_85)">
              <circle
                cx="4"
                cy="618"
                r="368"
                fill="url(#paint0_linear_26_85)"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_26_85"
                x="-614"
                y="0"
                width="1236"
                height="1236"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="125"
                  result="effect1_foregroundBlur_26_85"
                ></feGaussianBlur>
              </filter>
              <linearGradient
                id="paint0_linear_26_85"
                x1="-364"
                y1="250"
                x2="506.12"
                y2="754.835"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF8FE8"></stop>
                <stop offset="1" stopColor="#FFC960"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <section id="work-process" className="relative z-10 pt-[110px]">
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              How it Works?
            </h2>
          </div>
        </div>
        <div className="container max-w-[1390px]">
          <div className="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pt-20 lg:pb-5 xl:px-10">
            <div className="-mx-4 flex flex-wrap justify-center">
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".2s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_40_12)">
                        <path
                          d="M21.6667 16.6667H30L20 26.6667L10 16.6667H18.3333V5H21.6667V16.6667ZM6.66668 31.6667H33.3333V20H36.6667V33.3333C36.6667 33.7754 36.4911 34.1993 36.1785 34.5118C35.866 34.8244 35.442 35 35 35H5.00001C4.55798 35 4.13406 34.8244 3.8215 34.5118C3.50894 34.1993 3.33334 33.7754 3.33334 33.3333V20H6.66668V31.6667Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_40_12">
                          <rect width="40" height="40" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Sign in
                  </h3>
                  <p className="text-base text-body">We support Github auth</p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".3s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_40_15)">
                        <path
                          d="M20 36.6667C10.795 36.6667 3.33333 29.205 3.33333 20C3.33333 10.795 10.795 3.33337 20 3.33337C29.205 3.33337 36.6667 10.795 36.6667 20C36.6667 29.205 29.205 36.6667 20 36.6667ZM11.6883 30.4267C14.0476 32.3129 16.9795 33.3382 20 33.3334C23.2833 33.3334 26.2883 32.1467 28.6117 30.18C27.5262 29.0663 26.2284 28.1815 24.7951 27.578C23.3617 26.9746 21.8219 26.6647 20.2667 26.6667C18.6543 26.6648 17.0592 26.9981 15.5824 27.6454C14.1057 28.2927 12.7796 29.2398 11.6883 30.4267ZM9.36 28.0334C10.7608 26.5468 12.4511 25.3629 14.3269 24.5546C16.2027 23.7462 18.2241 23.3306 20.2667 23.3334C22.2361 23.3308 24.1866 23.7173 26.0062 24.4707C27.8259 25.224 29.4788 26.3294 30.87 27.7234C32.2968 25.7152 33.1394 23.3511 33.3043 20.8932C33.4692 18.4354 32.9499 15.9798 31.8041 13.7991C30.6584 11.6184 28.9309 9.79775 26.8133 8.53912C24.6957 7.28049 22.2708 6.6331 19.8077 6.66879C17.3445 6.70448 14.9394 7.42185 12.8592 8.7413C10.779 10.0608 9.10493 11.9307 8.02282 14.1437C6.94071 16.3567 6.49282 18.8262 6.72886 21.2783C6.9649 23.7304 7.87562 26.0691 9.36 28.035V28.0334ZM20 21.6667C18.2319 21.6667 16.5362 20.9643 15.286 19.7141C14.0357 18.4638 13.3333 16.7682 13.3333 15C13.3333 13.2319 14.0357 11.5362 15.286 10.286C16.5362 9.03575 18.2319 8.33337 20 8.33337C21.7681 8.33337 23.4638 9.03575 24.714 10.286C25.9643 11.5362 26.6667 13.2319 26.6667 15C26.6667 16.7682 25.9643 18.4638 24.714 19.7141C23.4638 20.9643 21.7681 21.6667 20 21.6667ZM20 18.3334C20.8841 18.3334 21.7319 17.9822 22.357 17.3571C22.9821 16.7319 23.3333 15.8841 23.3333 15C23.3333 14.116 22.9821 13.2681 22.357 12.643C21.7319 12.0179 20.8841 11.6667 20 11.6667C19.1159 11.6667 18.2681 12.0179 17.643 12.643C17.0179 13.2681 16.6667 14.116 16.6667 15C16.6667 15.8841 17.0179 16.7319 17.643 17.3571C18.2681 17.9822 19.1159 18.3334 20 18.3334Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_40_15">
                          <rect width="40" height="40" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Get an API key
                  </h3>
                  <p className="text-base text-body">
                    Well generate an API key in a click of a button
                  </p>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".4s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_40_18)">
                        <path
                          d="M5.26834 7.44836C7.20178 5.51458 9.79501 4.38351 12.5277 4.28211C15.2603 4.18072 17.9302 5.11651 20.0017 6.9017C22.0713 5.11948 24.7377 4.18475 27.467 4.28463C30.1964 4.38452 32.7873 5.51165 34.7211 7.44037C36.6549 9.3691 37.7888 11.9571 37.8959 14.6862C38.0029 17.4153 37.0751 20.0841 35.2983 22.1584L22.3567 35.1417C21.7621 35.7365 20.9646 36.0845 20.1242 36.1161C19.2838 36.1476 18.4625 35.8603 17.825 35.3117L17.6417 35.1434L4.70168 22.1584C2.92583 20.0859 1.99764 17.4195 2.1027 14.6923C2.20776 11.9651 3.33832 9.37805 5.26834 7.44836ZM7.62501 9.80503C6.26208 11.1683 5.47643 13.0041 5.43112 14.9313C5.38581 16.8585 6.08432 18.7292 7.38168 20.155L7.62501 20.4117L20 32.7867L28.8383 23.9467L22.9467 18.055L21.18 19.8217C20.7158 20.2861 20.1646 20.6546 19.558 20.906C18.9514 21.1575 18.3012 21.287 17.6445 21.2871C16.3183 21.2874 15.0463 20.7609 14.1083 19.8234C13.1704 18.8858 12.6432 17.6141 12.6429 16.2879C12.6426 14.9617 13.1691 13.6897 14.1067 12.7517L17.61 9.2467C16.2158 8.13399 14.4707 7.55451 12.6878 7.61224C10.9049 7.66997 9.20099 8.36112 7.88168 9.5617L7.62501 9.80503ZM21.7683 14.5184C22.0809 14.2059 22.5047 14.0304 22.9467 14.0304C23.3886 14.0304 23.8125 14.2059 24.125 14.5184L31.195 21.5884L32.375 20.4117C33.7608 19.0269 34.5497 17.1549 34.5731 15.196C34.5964 13.237 33.8524 11.3467 32.5 9.92929C31.1477 8.51185 29.2944 7.67981 27.3366 7.61112C25.3787 7.54242 23.4717 8.24253 22.0233 9.5617L21.7683 9.80503L16.465 15.1084C16.1761 15.3971 16.0033 15.7818 15.9793 16.1895C15.9554 16.5972 16.0819 16.9995 16.335 17.32L16.465 17.465C16.7537 17.7539 17.1384 17.9267 17.5461 17.9507C17.9538 17.9747 18.3561 17.8481 18.6767 17.595L18.8217 17.465L21.7683 14.5184Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_40_18">
                          <rect width="40" height="40" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Access the API
                  </h3>
                  <p className="text-base text-body">
                    Get holidays from around the world!
                    <br />
                    Any country, any year!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-28 left-0 -z-10 hidden md:block">
          <svg
            width="632"
            height="1179"
            viewBox="0 0 632 1179"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.25" filter="url(#filter0_f_38_24)">
              <circle
                cx="42.5"
                cy="589.5"
                r="329.5"
                fill="url(#paint0_linear_38_24)"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_38_24"
                x="-547"
                y="0"
                width="1179"
                height="1179"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="130"
                  result="effect1_foregroundBlur_38_24"
                ></feGaussianBlur>
              </filter>
              <linearGradient
                id="paint0_linear_38_24"
                x1="-366.218"
                y1="919"
                x2="451.176"
                y2="349.901"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EA5FE"></stop>
                <stop offset="0.541667" stopColor="#BEB3FD"></stop>
                <stop offset="1" stopColor="#90D1FF"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute right-0 top-20 -z-10">
          <svg
            width="637"
            height="1277"
            viewBox="0 0 637 1277"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.2" filter="url(#filter0_f_38_23)">
              <circle
                cx="638.5"
                cy="638.5"
                r="388.5"
                fill="url(#paint0_linear_38_23)"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_38_23"
                x="0"
                y="0"
                width="1277"
                height="1277"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="125"
                  result="effect1_foregroundBlur_38_23"
                ></feGaussianBlur>
              </filter>
              <linearGradient
                id="paint0_linear_38_23"
                x1="250"
                y1="250"
                x2="1168.59"
                y2="782.957"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF8FE8"></stop>
                <stop offset="1" stopColor="#FFC960"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <section id="pricing" className="relative z-10 pt-[110px]">
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Choose Your Plan
            </h2>
          </div>
        </div>
        <div className="container max-w-[1120px] overflow-hidden">
          <div
            className="wow fadeInUp mb-[60px] flex items-center justify-center"
            data-wow-delay=".25s"
          >

            <label htmlFor="togglePlan" className="inline-flex items-center">
              <input
                onChange={(e) => {
                  e.target.checked ? setPlan("yearly") : setPlan("monthly");
                }}
                type="checkbox"
                name="togglePlan"
                id="togglePlan"
                className="sr-only"
              />
              <span className="monthly text-sm font-medium text-black dark:text-white">
                Monthly
              </span>
              <span className="mx-5 flex h-[34px] w-[60px] cursor-pointer items-center rounded-full bg-primary p-[3px]">
                <span className="dot block h-7 w-7 rounded-full bg-white duration-300"></span>
              </span>
              <span className="yearly text-sm font-medium text-black dark:text-white">
                Yearly
              </span>
            </label>
          </div>
          <div className="-mx-6 flex flex-wrap justify-center">
            <div className="w-full px-6 md:w-1/2 lg:w-1/4">
              <div
                className="wow fadeInUp mb-10 rounded-xl bg-white py-10 px-9 shadow-card dark:bg-dark dark:shadow-card-dark lg:mb-4 lg:px-7 xl:px-9"
                data-wow-delay=".2s"
              >
                <h3 className="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
                  Free
                </h3>

                <p className="border-b border-stroke pb-5 text-black dark:border-stroke-dark dark:text-white">
                  <span className="text-[40px] font-bold leading-none">
                    <sup className="text-[22px] font-medium"> $ </sup>0
                  </span>
                  <span className="text-base text-body"> /month </span>
                </p>
                <div className="space-y-4 pt-[30px] pb-10">
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    1000 requests/month
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Countries API
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Holidays API
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </p>
                </div>
                <div className="flex justify-center w-full">
                  <a
                    href="/dashboard"
                    className="btn-lg btn-outline w-full text-center"
                  >
                    Choose Plan
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-6 md:w-1/2 lg:w-1/4">
              <div
                className="wow fadeInUp relative mb-10 rounded-xl bg-white py-10 px-9 shadow-card dark:bg-dark dark:shadow-card-dark lg:mb-4 lg:px-7 xl:px-9"
                data-wow-delay=".3s"
              >
                <span className="absolute top-5 right-5 text-sm font-medium text-primary underline">
                  Most popular
                </span>
                <h3 className="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
                  Unlimited
                </h3>

                <p className="border-b border-stroke pb-5 text-black dark:border-stroke-dark dark:text-white">
                  <span className="text-[40px] font-bold leading-none">
                    <sup className="text-[22px] font-medium"> $ </sup>
                    <span id="unlimited-price">
                      {plan === "monthly" ? "9.99" : "89"}
                    </span>
                  </span>
                  <span className="text-base text-body">
                    {plan === "monthly" ? "/ month" : "/ year"}{" "}
                  </span>
                </p>
                <div className="space-y-4 pt-[30px] pb-10">
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Unlimited requests
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    35 GB cloud storage
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    24/7 Support
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Custom Branding Strategy
                  </p>
                </div>
                <div className="flex justify-center w-full">
                  <button
                    onClick={() => {
                      toast.info("Coming soon");
                    }}
                    href="#"
                    className="btn-lg btn-primary w-full text-center"
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
            <Link to="checkout">To checkout</Link>
          </div>
        </div>
      </section>



      <section
        id="faq"
        className="relative z-10 bg-[#F8FAFB] dark:bg-[#15182B]"
      >
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div
            className="faqs  wow fadeInUp mx-auto w-full max-w-[785px] rounded-lg bg-white px-6 py-[6px] shadow-card dark:bg-black dark:shadow-card-dark"
            data-wow-delay=".3s"
          >
            <div className="faq  border-b border-stroke last-of-type:border-none dark:border-stroke-dark">
              <button className="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
                Can I cancel my subscription?
              </button>
              <div className="faq-content  h-auto  border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px] spacing ">
                <p className="text-base text-body leading-relaxed">
                  Cancelling you subscription is possible at any time. All you
                  have to do is click the cancel button in your account
                  settings. If you cancel your subscription, you will still have
                  access to your account until the end of your billing period.
                </p>
              </div>
            </div>
            <div className="faq  border-b border-stroke last-of-type:border-none dark:border-stroke-dark">
              <button className="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
                Is FreeHolidayApi really free?
              </button>
              <div className="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
                <p className="text-base text-body">
                  Yes, FreeHolidayApi is free to use. We offer a free plan with
                  montly requests. If you need more requests, you can upgrade to
                  a paid plan.
                </p>
              </div>
            </div>
            <div className="faq border-b border-stroke last-of-type:border-none dark:border-stroke-dark ">
              <button className="faq-btn relative flex w-full justify-between py-6 px-[18px] text-left text-base font-medium text-black dark:text-white sm:px-[26px] sm:text-lg">
                Who is FreeHolidayApi for?
              </button>
              <div className="faq-content h-auto overflow-hidden border-t border-stroke px-[18px] dark:border-stroke-dark sm:px-[26px]">
                <p className="text-base text-body">
                  FreeHolidayApi is for developers who need a simple and easy to
                  use API to get holidays from around the world. It is also for
                  developers who want to get holidays from a specific country or
                  year.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 -top-24 -z-10">
          <svg
            width="95"
            height="190"
            viewBox="0 0 95 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="95"
              cy="95"
              r="77"
              stroke="url(#paint0_linear_49_603)"
              strokeWidth="36"
            ></circle>
            <defs>
              <linearGradient
                id="paint0_linear_49_603"
                x1="0"
                y1="0"
                x2="224.623"
                y2="130.324"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF8FE8"></stop>
                <stop offset="1" stopColor="#FFC960"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute left-0 -bottom-24 -z-10">
          <svg
            width="95"
            height="190"
            viewBox="0 0 95 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cy="95"
              r="77"
              stroke="url(#paint0_linear_52_83)"
              strokeWidth="36"
            ></circle>
            <defs>
              <linearGradient
                id="paint0_linear_52_83"
                x1="-117.84"
                y1="190"
                x2="117.828"
                y2="25.9199"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EA5FE"></stop>
                <stop offset="0.541667" stopColor="#BEB3FD"></stop>
                <stop offset="1" stopColor="#90D1FF"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <section id="support" className="pt-[100px] pb-[110px]">
        <div className="container">
          <div className="mx-auto mb-10 max-w-[690px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Support center
            </h2>
            <p className="text-base text-body">
              Want to add a new feature? Have a question? We would love to hear
              from you!
            </p>
          </div>
        </div>
        <div className="container">
          <div
            className="wow fadeInUp mx-auto w-full max-w-[925px] rounded-lg bg-[#F8FAFB] px-8 py-10 shadow-card dark:bg-[#15182B] dark:shadow-card-dark sm:px-10"
            data-wow-delay=".3s"
          >
            <form onSubmit={handleSupportSubmit}>
              <div className="-mx-[22px] flex flex-wrap">
                <div className="w-full px-[22px] md:w-1/2">
                  <div className="mb-8">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      className="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="w-full px-[22px] md:w-1/2">
                  <div className="mb-8">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your email"
                      className="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="w-full px-[22px]">
                  <div className="mb-8">
                    <textarea
                      rows="6"
                      name="message"
                      id="message"
                      placeholder="Tell us about yourself"
                      className="w-full rounded border border-stroke bg-white py-4 px-[30px] text-base text-body outline-none focus:border-primary dark:border-[#34374A] dark:bg-[#2A2E44] dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full px-[22px]">
                  <div className="text-center">
                    <p className="mb-5 text-center text-base text-body">
                      By clicking contact us button, you agree our terms and
                      policy,
                    </p>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn-primary btn-lg"
                    >
                      {isLoading ? "Sending..." : "Contact Us"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
