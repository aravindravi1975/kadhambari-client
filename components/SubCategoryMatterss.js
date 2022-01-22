import Link from "next/link";
import Image from "next/image";
import matterrs from "../public/matterrs.jpeg";

function SubCategoryMatterss() {
  return (
    <div className="flex gap-2 ml-4 lg:gap-5 lg:ml-5 mt-5">
      <Link href="/matterss" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={matterrs}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            All
          </p>
        </div>
      </Link>
      <Link href="/matterss/sleepkarft" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={matterrs}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            Sleep Karft
          </p>
        </div>
      </Link>
      <Link href="/matterss/recron" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={matterrs}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            Recron
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SubCategoryMatterss;
