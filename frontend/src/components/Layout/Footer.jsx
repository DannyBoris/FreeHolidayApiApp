function Footer() {
  return (
    <footer>
      <div className="wow fadeInUp bg-primary py-7 dark:bg-black h-[80px] ">
        <div className="container max-w-[1390px]">
          <div className="-mx-3 flex flex-wrap justify-around">
            <div className="order-last w-full px-3 lg:order-first lg:w-1/3">
              <p className="mt-4 text-center text-base text-white lg:mt-0 lg:text-left">
                © {new Date().getFullYear()} FreeHolidayApi. All rights reserved
              </p>
            </div>

            <div className="w-full px-3 md:w-1/2 lg:w-1/3">
              <div className="flex items-center justify-center space-x-4 sm:space-x-8 md:justify-end lg:justify-end">
                <a
                  href="https://www.termsfeed.com/live/104a0add-72df-4d8d-a097-6b72fed99e41"
                  className="text-base text-white"
                >
                  Privacy Policy
                </a>
                <a href="/terms" className="text-base text-white">
                  Terms and conditions
                </a>
                <a href="https://www.termsfeed.com/live/91ce10aa-e6c2-47e7-ae84-1a02698e5d43">
                  Refund policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
