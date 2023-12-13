import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import Image from "next/image";

const RichTextComponent = ({ props }) => {
    const options = {
        renderText: text => {
            return text.split('\n').reduce((props, textSegment, index) => {
              return [...props, index > 0 && <br key={index} />, textSegment];
            }, []);
        },
        renderMark: {
          [MARKS.CODE]: text => {
            return (
              <pre>
                <code>{text}</code>
              </pre>
            )
          }
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => {
                if (
                node.content.find(item =>
                    item.marks?.find(mark => mark.type === 'code')
                )
                ) {
                return (
                    <div>
                    <pre>
                        <code>{children}</code>
                    </pre>
                    </div>
                )
                }
        
                return <p>{children}</p>
            },
            [INLINES.ENTRY_HYPERLINK]: node => {
                if (node.data.target.sys.contentType.sys.id === 'post') {
                return (
                    <Link href={`/posts/${node.data.target.fields.slug}`}>
                    {node.data.target.fields.title}
                    </Link>
                )
                }
            },
            [INLINES.HYPERLINK]: node => {
                const text = node.content.find(item => item.nodeType === 'text')?.value
                return (
                <a href={node.data.uri} target='_blank' rel='noopener noreferrer'>
                    {text}
                </a>
                )
            },
            [BLOCKS.EMBEDDED_ENTRY]: node => {
                if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
                return (
                    <iframe
                    height='400'
                    width='100%'
                    src={node.data.target.fields.embedUrl}
                    title={node.data.target.fields.title}
                    allowFullScreen={true}
                    style={{ border: "0"}}
                    />
                )
                }
            },
            [BLOCKS.EMBEDDED_ASSET]: node => {
                return (
                <Image
                    src={"https:" + node.data.target.fields.file.url}
                    height={node.data.target.fields.file.details.image.height}
                    width={node.data.target.fields.file.details.image.width}
                    alt={node.data.target.fields.title}
                />
                )
            }
        }
    }
      
    return(
        <div>
            {documentToReactComponents(props, options)}
        </div>
    )
}

export default RichTextComponent;