import Link from "next/link";
import Image from "next/image";
import blanket from "../public/blanket.jpeg";

function SubCategoryBlankets() {
  return (
    <div className="flex gap-2 ml-4 lg:gap-5 lg:ml-5 mt-5">
      <Link href="/blankets" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            All
          </p>
        </div>
      </Link>
      <Link href="/blankets/comforter" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            Comforter
          </p>
        </div>
      </Link>
      <Link href="/blankets/mink" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            Mink
          </p>
        </div>
      </Link>
      <Link href="/blankets/allseasons" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            All Seasons
          </p>
        </div>
      </Link>
      <Link href="/blankets/dohar" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            Dohar
          </p>
        </div>
      </Link>
      <Link href="/blankets/bedsheet" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            Bedsheet
          </p>
        </div>
      </Link>
      <Link href="/blankets/quilt" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            Quilt
          </p>
        </div>
      </Link>
      <Link href="/blankets/woolean" replace>
        <div className="w-[50px] h-[50px] relative cursor-pointer hover:shadow-2xl lg:w-[100px] lg:h-[100px]">
          <Image
            src={blanket}
            layout="fill"
            className="object-cover absolute rounded-md lg:w-[100px] lg:h-[100px]"
          />
          <p className="text-[10px] lg:text-[15px] pl-2 font-bold z-50 absolute text-white">
            Woolean
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SubCategoryBlankets;
