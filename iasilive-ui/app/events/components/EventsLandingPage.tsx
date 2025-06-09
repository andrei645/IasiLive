import CustomHeader from "../../components/CustomHeader";
import EventsPannel from "./EventsPannel";
import { useEffect, useState } from "react";
import CustomCarousel from "../../auth/components/CustomCarousel"
import { usePathname } from "next/navigation";
import CustomBanner from "@/app/components/CustomBanner";
import CustomSearch from "@/app/components/CustomSearch";

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        if (pathName.includes("auth")) setIsLogged(true);
    }, [pathName]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <>
        {/* <CustomSearch onSearch={handleSearch} /> */}
        {/* <CustomHeader onSearch={handleSearch}/> */}
        {/* { !isLogged ? <CustomCarousel /> : "" } */}
        <EventsPannel input = {searchQuery} />
        </>
    )
}