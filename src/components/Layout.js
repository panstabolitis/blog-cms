import Link from "next/link";

export const PageLayout = ({ children }) => {
    return (
        <div className="page-layout">
            <Link className="header" href="/">MY BLOG</Link>
            {children}
        </div>
    )
}

export default PageLayout;