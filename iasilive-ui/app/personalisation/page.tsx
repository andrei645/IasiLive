"use client"
import { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import CustomBanner from "../components/CustomBanner";
import Favorites from "../auth/components/Favorites";

export default function PersonalisationPage () {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query:string) => {
        setSearchQuery(query);
    }

    return (
        <>
        <CustomHeader onSearch={handleSearch}/>
        <CustomBanner title="It's all about you!"
        description="Ai parte de o experinta personalizata doar pentru tine!"
        src="/images/iasi_night2.png"/>
        </>
    );
}