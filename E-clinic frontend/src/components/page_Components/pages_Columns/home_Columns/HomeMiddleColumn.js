import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useGetFetch from "../../../../custom hooks/useGetFetch";
import Blogtmp2 from "../../columns_Components/middle_column_components/Blogtmp2";
import Searchbar from "../../columns_Components/middle_column_components/Searchbar";

const HomeMiddleColumn = ({ blogs, setblogs }) => {

    const page = useRef("1");
    const [url, seturl] = useState("/get/all/blogs/?page=1");
    const hasnext = useRef(true);

    const [search, setsearch] = useState("");

    const { data, IsPending, err } = useGetFetch(url);
    // useEffect(() => {
    //     seturl("/get/all/blogs/?page=" + page);

    // }, [page])


    useEffect(() => {
        if (search.length > 0) {
            page.current=1;
            setblogs([])
            seturl(`/get/all/blogs/?page=${page.current}&search=${search}`);
        }
        else{
            page.current=1;
            setblogs([])
            seturl(`/get/all/blogs/?page=${page.current}`);
        }
    }, [search,page])

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
            if (search.length === 0) {
                seturl(`/get/all/blogs/?page=${page.current}`);

            }
            else {
                seturl(`/get/all/blogs/?page=${page.current}&search=${search}`);
            }
        }
    }, [seturl, page, search])

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


    return (
        <div className="w3-col m7" style={{ paddingTop: 3 }}>
            <Searchbar search={search} setsearch={setsearch}/>
            {
                blogs.map((blog, index) => {
                    if (index === blogs.length - 1) {

                        return <div ref={setlastElement} key={blog.id}>
                            <Blogtmp2 blog={blog} />
                        </div>

                    }
                    else {
                        return <div key={blog.id}>
                            <Blogtmp2 blog={blog} />
                        </div>
                    }
                })
            }
            {IsPending && <h4 className='w3-center'>Loadding...</h4>}
            {err && <>{err}</>}
        </div>
    );
}

export default HomeMiddleColumn;