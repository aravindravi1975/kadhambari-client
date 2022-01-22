import Link from "next/link";
import Image from "next/image";
import bedspread from "../public/bedspread.jpeg";

function SubCategory() {
  return (
    <div className="flex gap-2 ml-4 lg:gap-5 lg:ml-5 mt-5">
      <Link href="/bedspread" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={bedspread}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            All
          </p>
        </div>
      </Link>
      <Link href="/bedspread/king" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={bedspread}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            King
          </p>
        </div>
      </Link>
      <Link href="/bedspread/queen" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={bedspread}
            layout="fill"
            className="object-cover absolute  rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            Queen
          </p>
        </div>
      </Link>
      <Link href="/bedspread/single" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={bedspread}
            layout="fill"
            className="object-cover absolute  rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            Single
          </p>
        </div>
      </Link>
      <Link href="/bedspread/fittedsheet" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={bedspread}
            layout="fill"
            className="object-cover absolute  rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold  z-50 absolute text-slate-600">
            Fitted Sheet
          </p>
        </div>
      </Link>
      <Link href="/bedspread/bedcover" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={bedspread}
            layout="fill"
            className="object-cover absolute  rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold  z-50 absolute text-slate-600">
            Bed Cover
          </p>
        </div>
      </Link>
      <Link href="/bedspread/superking" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={bedspread}
            layout="fill"
            className="object-cover absolute  rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold  z-50 absolute text-slate-600">
            Super King
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SubCategory;
