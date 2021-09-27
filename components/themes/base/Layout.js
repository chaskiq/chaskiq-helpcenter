//import Menu from './menu'
import Footer from "./Footer";
import Link from "next/link";
import Dropdown from "./Dropdown";
import CustomizedInputBase from "./SearchBar";

import { LangGlobeIcon, LaunchIcon } from "../../themes/base/icons/icons";
import { useRouter } from "next/router";

export default function Layout({ children, className, site }) {
  const settings = site.data.helpCenter;

  const router = useRouter();

  function handleLangChange(item) {
    router.push(`/${item.name}`);
  }

  return (
    <div className="flex flex-col antialiased sm:subpixel-antialiased md:antialiased">
      {/*<Menu/>*/}

      <div
        className="bg-black"
        // className={'classes.heroContent'}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('${settings.headerImageLarge}')`,
        }}
      >
        <div className="lg:px-40 px-2">
          <div className="flex items-center justify-between py-2 md:mx-24 md:px-3">
            <div>
              <Link href={`/`}>
                <a>
                  <img src={settings.logo} className={"h-10 md:h-16"} />
                </a>
              </Link>
            </div>

            <div>
              <div className={"flex items-center space-between"}>
                <a
                  variant="outlined-transparent"
                  className={
                    "mr-2 inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  }
                  color={"primary"}
                  href={`${settings.website}`}
                  target={"_blank"}
                >
                  <LaunchIcon className="h-5 w-5 outline-none" />
                  {" Go to"} {settings.siteTitle}
                </a>

                <div>
                  <hr className={"classes.hr"} />
                </div>

                {settings.availableLanguages && (
                  <Dropdown
                    icon={<LangGlobeIcon className="h-5 w-5 outline-none" />}
                    filterHandler={handleLangChange}
                    options={settings.availableLanguages.map((o) => ({
                      name: o,
                      id: o,
                    }))}
                  />
                )}
              </div>
            </div>
          </div>

          <CustomizedInputBase
            lang={"es"}
            settings={settings}
            subdomain={settings.subdomain}
          />
        </div>
      </div>

      <div
        className={
          className || `flex flex-row items-center justify-center bg-gray-100`
        }
      >
        {/*JSON.stringify(site)*/}
        {children}
      </div>

      <Footer settings={settings} />
    </div>
  );
}
