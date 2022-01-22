import Link from "next/link";
import Image from "next/image";
import pillow from "../public/pilliow.jpeg";

function SubCategoryPillows() {
  return (
    <div className="flex gap-2 ml-4 lg:gap-5 lg:ml-5 mt-5">
      <Link href="/pillows" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={pillow}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-slate-600 font-body">
            All
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SubCategoryPillows;
