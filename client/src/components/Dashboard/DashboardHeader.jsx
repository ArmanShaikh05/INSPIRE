import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUniversity } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { MdSchool } from "react-icons/md";

const DashboardHeader = () => {

  return (
    <div className="py-3 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card className=" w-[18rem] flex flex-col justify-center text-black ">
          <CardHeader>
            <CardTitle>Total Universities</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full items-center justify-between py-0 px-4 pb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">+45,231</h2>
              <p className="text-sm text-green-400">+20.1% from last month</p>
            </div>
            <FaUniversity size={35} />
          </CardContent>
        </Card>

        <Card className=" w-[18rem] flex flex-col justify-center text-black ">
          <CardHeader>
            <CardTitle>Total Institutes</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full items-center justify-between py-0 px-4 pb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">+2350</h2>
              <p className="text-sm text-green-400">+180.1% from last month</p>
            </div>
            <FaSchool size={35} />
          </CardContent>
        </Card>

        <Card className=" w-[18rem] flex flex-col justify-center text-black ">
          <CardHeader>
            <CardTitle>Total Alumnis</CardTitle>
          </CardHeader>
          <CardContent className="flex w-full items-center justify-between py-0 px-4 pb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">+12,234</h2>
              <p className="text-sm text-green-400">+19% from last month</p>
            </div>
            <MdSchool size={35} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}


export default DashboardHeader