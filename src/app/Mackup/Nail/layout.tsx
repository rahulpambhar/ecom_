import Breadcrumb from "@/components/admin/breadcrumb";

import Footer from "@/components/frontside/Footer";
import Navbar from "@/components/frontside_viraj/Navbar/page";
import Deals from "@/components/frontside_viraj/deals/Deals";
import Filter from "@/components/frontside_viraj/filter/Filter";
import Sidebar from "@/components/frontside_viraj/sidebar/Sidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <div className="grid">
        <div className="grid">
          <div>
            <Breadcrumb />
          </div>
          <div className="">
            {" "}
            <Filter />
          </div>
        </div>
        <div className="flex border-b-2">
          <div>
            {" "}
            <Sidebar />
          </div>
          <div> {children}</div>
        </div>
        <div>
          {" "}
          <Deals />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default layout;
