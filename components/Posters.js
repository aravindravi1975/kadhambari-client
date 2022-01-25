import "antd/dist/antd.css";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import Image from "next/image";

const Posters = () => {
  const [poster, setPoster] = useState();
  const [loading, setLoading] = useState(true);

  // const contentStyle = {
  //   height: "460px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#344CB7",
  // }

  const getPoster = () => {
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/poster/getposter`)
      .then((response) => response.json())
      .then((data) => {
        setPoster(data.poster);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPoster();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Carousel autoplay>
          {poster &&
            poster.map((item) => {
              return (
                <div
                  key={item.name}
                  className="relative h-[200px] lg:h-[430px] w-full"
                >
                  <Image
                    // loader={() => item.posterPictures[0].img}
                    priority={true}
                    src={item.posterPictures[0].img}
                    className="object-cover"
                    layout="fill"
                    // style={contentStyle}
                  />
                </div>
              );
            })}
        </Carousel>
      )}
    </>
  );
};

export default Posters;
