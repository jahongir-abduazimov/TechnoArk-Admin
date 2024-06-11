import { useParams } from "react-router-dom";
import useProductStore from "../../store/products";
import { useEffect, useState } from "react";
import { ProductDetail } from "@modals";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { DeleteDetail, UpdateDetail } from "@modals";
const index = () => {
  const { getProductById } = useProductStore();
  const { id }: any = useParams();
  const [detail, setDetail]: any = useState({});
  const [product, setProduct]: any = useState([]);
  const getData = async () => {
    const response = await getProductById(id);
    setDetail(response.data.data.product_detail);
    setProduct(response.data.data.product);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {detail === null ? (
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-4">
            <p className="text-[20px]">Product name:</p>
            <p className="text-[20px] font-medium text-[#1677FF]">
              {product.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[20px]">Product price:</p>
            <p className="text-[20px] font-medium text-[#1677FF]">
              {product.price} $
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[20px]">Product detail:</p>
            <ProductDetail />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            {detail?.images && (
              <ImageGallery
                autoPlay={false}
                infinite={true}
                thumbnailPosition={"left"}
                showPlayButton={false}
                showFullscreenButton={true}
                items={detail?.images?.map((image: any) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            )}
          </div>
          <div className="w-[45%] px-3">
            <h1 className="font-medium text-[24px] text-center mb-5">
              {product.name}
            </h1>
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-3">
                <p className="font-medium text-[18px]">Description:</p>
                <p className="text-[16px]">{detail.description}</p>
              </div>
              <div className="flex gap-3 justify-between border-b">
                <p className="font-medium text-[18px]">Product colors:</p>
                <p className="text-[16px]">
                  {detail?.colors?.map((e: any) => (
                    <span>
                      {e}
                      {", "}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex gap-3 justify-between border-b">
                <p className="font-medium text-[18px]">Product quantity:</p>
                <p className="text-[16px]">{detail.quantity}</p>
              </div>
              <div className="flex gap-3 justify-between border-b">
                <p className="font-medium text-[18px]">Product discount:</p>
                <p className="text-[16px]">{detail.discount}%</p>
              </div>
              <div className="flex gap-3 justify-between border-b items-end">
                <p className="font-medium text-[18px]">Product price:</p>
                <div>
                  {detail?.discount === 0 ? (
                    ""
                  ) : (
                    <del className="text-[16px] text-[#00000082]">
                      {product.price} $
                    </del>
                  )}
                  <p className="text-[16px]">
                    {Math.round(
                      product?.price - (product?.price / 100) * detail?.discount
                    )}{" "}
                    $
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex gap-3">
              <UpdateDetail detail={detail} product={product}/>
              <DeleteDetail id={detail.id}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
