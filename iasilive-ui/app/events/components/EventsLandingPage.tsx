import EventsList from "./EventsList";
import CustomHeader from "../../components/CustomHeader";
import EventsPannel from "./EventsPannel";
import { useState } from "react";

export default function EventsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <>
        <CustomHeader onSearch={handleSearch}/>
        <EventsPannel input = {searchQuery} />
        </>
    )
}