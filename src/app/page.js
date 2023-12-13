import client from "@/lib/contentful"
import Link from "next/link";
import Image from "next/image";

export const revalidate = 10;

async function getData() {
  const res = await client.getEntries({ content_type: "post"})
 
  return res;
}

export default async function Home() {

  const data = await getData();

  return (
    <div className="page-layout">
      <div className="blog-grid">
          {
            data.items.map(item => (
              <Link key={item.sys.id} href={"blog/" + item.sys.id}>
                <div className="blog-grid-item">
                  <Image 
                    src={"https:" + item.fields.banner.fields.file.url}
                    alt={item.fields.banner.fields.title}
                    width={1000}
                    height={1000}
                    style={{objectFit: "contain"}}
                    className="blog-grid-item-banner"
                    quality={100}
                    priority
                  />
                  <div className="blog-grid-item-info-container">
                    <h1 className="blog-grid-item-info-title">{item.fields.title}</h1>
                    <span className="blog-grid-item-info-author">Published by {item.fields.author.fields.name}</span>
                  </div>
                </div>
              </Link>
            ))
          }
      </div>
    </div>
  );
}