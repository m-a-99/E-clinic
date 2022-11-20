import { useCallback, useRef } from "react";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import useDeleteFetch from "../../../../custom hooks/useDeleteFetch";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import MyBlogsBlogTmp from "../../columns_Components/middle_column_components/MyBlogsBlogTmp";
import Searchbar from "../../columns_Components/middle_column_components/Searchbar";

const MyBlogsMiddleColumns = ({ blogs, setblogs }) => {

    const page = useRef(1)
    const [url, seturl] = useState("/get/personal/blogs/?page=1");
    const hasnext = useRef(true);

    const { data, IsPending, err } = useGetFetch(url);
    const [search, setsearch] = useState("");
    useEffect(() => {
        if(search.length>0){
            page.current=1;
            setblogs([])
            seturl(`/get/personal/blogs/?page=${page.current}&search=${search}`);
        }
        else{
            page.current = 1;
            setblogs([])
            seturl(`/get/personal/blogs/?page=${page.current}`);
        }
    }, [search,setblogs])

    useEffect(() => {
        if (data) {
            setblogs(blogss => [...blogss, ...data.results]);
            if (!data.next) {
                hasnext.current = false;
            }
            else {
                hasnext.current = true;
                page.current += 1;
            }
        }
    }, [data, setblogs])


    const [lastElement, setlastElement] = useState(null);

    const handle = useCallback(() => {
        if (hasnext.current) {
            if (search.length===0){
                seturl("/get/personal/blogs/?page=" + page.current);
            }
            else{
                seturl(`/get/personal/blogs/?page=${page.current}&search=${search}`);
            }
        }
    }, [])

    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: 0
        }
    }, [])
    const handleIntersect = useCallback((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                handle()
                console.log("intersct")
            }
        });
    }, [handle])
    const observer = useRef(new IntersectionObserver(handleIntersect, options));

    useEffect(() => {
        if (lastElement) {
            observer.current.disconnect();
            observer.current = new IntersectionObserver(handleIntersect, options);
            observer.current.observe(lastElement);
        }
    }, [lastElement, handleIntersect, options]);

    const { data: blogDeleteData, IsPending: blogDeleteIsPending, DeleteFetch: blogDeleteFetch } = useDeleteFetch()

    useEffect(() => {
        if (blogDeleteData) {
            setblogs(blogs => blogs.filter(blog => blog.id !== blogDeleteData.id))
        }
    }, [blogDeleteData, setblogs])

    return (
        <div className="w3-col m7" style={{ paddingTop: 3 }}>
            <div style={{ position: "relative" }}>
                {blogDeleteIsPending &&
                    < div className="w3-container w3-card  w3-round" style={{ zIndex: 1, position: "absolute", padding: "0px 25px 0 25px", height: '100%', margin: "0px 16px 0px 16px", width: "-webkit-fill-available", backgroundColor: "rgb(125 151 165 / 38%)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="loader"></div>
                    </div>
                }
                <Searchbar search={search} setsearch={setsearch}/>
                {
                    blogs.map((blog, index) => {
                        if (index === blogs.length - 1) {

                            return <div ref={setlastElement} key={blog.id}>
                                <MyBlogsBlogTmp blog={blog} blogDeleteFetch={blogDeleteFetch} />
                            </div>

                        }
                        else {
                            return <div key={blog.id}>
                                <MyBlogsBlogTmp blog={blog} blogDeleteFetch={blogDeleteFetch} />
                            </div>
                        }
                    })
                }
                {IsPending && <h4 className='w3-center'>Loadding...</h4>}
                {err && <>{err}</>}
            </div>
        </div>

    );

}

export default MyBlogsMiddleColumns;