import Link from "next/link";
import Image from "next/image";
import mat from "../public/mat.jpeg";

function SubCategoryMats() {
  return (
    <div className="flex gap-2 ml-4 lg:gap-5 lg:ml-5 mt-5">
      <Link href="/mats" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={mat}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            All
          </p>
        </div>
      </Link>
      <Link href="/mats/floor" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={mat}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            Floor
          </p>
        </div>
      </Link>
      <Link href="/mats/bathmats" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={mat}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            Bath Mats
          </p>
        </div>
      </Link>
      <Link href="/mats/yoga" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={mat}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            Yoga
          </p>
        </div>
      </Link>
      <Link href="/mats/runner" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={mat}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600">
            Runner
          </p>
        </div>
      </Link>
      <Link href="/mats/carpet" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={mat}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600">
            Carpet
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SubCategoryMats;
