import StaticCard from "@/components/StaticCard"
import ProductCard from "@/components/ProductCard"
import { Card } from "@/components/ui/card"
import { H3 } from "@/components/ui/typography"

interface ProductDemoData{
    soldNumber:number,
    category:string,
    productName:string,
    favourite:number,
    coverImage:string
  }
  
const ProductDemoData:ProductDemoData[]=[
    {
      soldNumber:20,
      category:"Fashion / Shoes",
      productName:"Red Nike Air",
      favourite:12840,
      coverImage:""
    },
    {
      soldNumber:20,
      category:"Fashion / Shoes",
      productName:"Red Nike Air",
      favourite:12840,
      coverImage:""
    },
    {
      soldNumber:20,
      category:"Fashion / Shoes",
      productName:"Red Nike Air",
      favourite:12840,
      coverImage:""
    },
    {
      soldNumber:20,
      category:"Fashion / Shoes",
      productName:"Red Nike Air",
      favourite:12840,
      coverImage:""
    },
    {
      soldNumber:20,
      category:"Fashion / Shoes",
      productName:"Red Nike Air",
      favourite:12840,
      coverImage:""
    },
    {
        soldNumber:20,
        category:"Fashion / Shoes",
        productName:"Red Nike Air",
        favourite:12840,
        coverImage:""
      },
      {
        soldNumber:20,
        category:"Fashion / Shoes",
        productName:"Red Nike Air",
        favourite:12840,
        coverImage:""
      },
      {
        soldNumber:20,
        category:"Fashion / Shoes",
        productName:"Red Nike Air",
        favourite:12840,
        coverImage:""
      },
      {
        soldNumber:20,
        category:"Fashion / Shoes",
        productName:"Red Nike Air",
        favourite:12840,
        coverImage:""
      },
      {
        soldNumber:20,
        category:"Fashion / Shoes",
        productName:"Red Nike Air",
        favourite:12840,
        coverImage:""
      },
  ]
  function Page() {
    return (
      <div className="space-y-5">
        <h3>Engagements</h3>
        <div className="bg-[#f9f9f9] flex justify-between overflow-x-auto">
          <StaticCard amount={180000} isDue={false} percentage={3} subTitle="" title="Monthly store bookmarks" isView={true} showConcurrency={false} hideBage={false} />
          <StaticCard amount={180000} isDue={true} percentage={3} subTitle="" title="Monthly items favourite" isView={true} showConcurrency={false} hideBage={false} />
          <StaticCard amount={180000} isDue={true} percentage={3} subTitle="" title="Store Monthly visit" isView={true} showConcurrency={false} hideBage={true} />
        </div>
        <div>
          <Card className="p-6 bg-[#F6F6F6] mt-5 shadow-none border-[#f9f9f9]">
            <H3 className="my-2 mb-4">All items</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {ProductDemoData.map((item, index) => (
                <ProductCard
                  key={index}
                  soldNumber={item.soldNumber}
                  category={item.category}
                  productName={item.productName}
                  favourite={item.favourite}
                  coverImage={item.coverImage}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  export default Page;
  