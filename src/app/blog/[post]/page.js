import client from "@/lib/contentful";
import Link from "next/link";
import Image from "next/image";

import RichTextComponent from "@/components/RichText";
import convertISOToFormattedDate from "@/util/timestamp";
import { redirect } from 'next/navigation'


export const revalidate = 10;

export async function generateMetadata({ params }) {

    let data;

    try {
        data = await client.getEntry(params.post);
    } catch(error) {
        console.error(`Error fetching entry: ${error.message}`);
        return <h1>Something went wrong</h1>;
    }
   
    return {
      title: data.fields.title,
    }
  }

export default async function Page({ params }) {

    let data;

    try {
        data = await client.getEntry(params.post);
    } catch(error) {
        console.error(`Error fetching entry: ${error.message}`);
        redirect('/')
    }

    if (!data) {
        return <h1>404: Not Found</h1>;
    }

    // Assuming your rich text field is named 'content'
    const richTextContent = data.fields.content;

    return (
        <div className="blog-wrapper">
            <Image
                src={"https:" + data.fields.banner.fields.file.url}
                alt={data.fields.banner.fields.title}
                style={{objectFit: "cover"}}
                width={1000}
                height={1000}
                className="blog-banner"
                quality={100}
            />
            <div>
                <h1 className="blog-title">{data.fields.title}</h1>
                <span>Published by {data.fields.author.fields.name}, {convertISOToFormattedDate(data.sys.createdAt)}</span>
            </div>
            <div>
                <RichTextComponent props={richTextContent} />
            </div>
        </div>
    );
}
