'use client'

import Title from "@/components/AppComponents/PrimaryTitle";
import Resume from "@/components/AppComponents/Resume"
import { useEffect, useState } from "react";


export default function Page() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/resume', {
          method: 'GET'
        });
        const allResume = await response.json();
        setResults(allResume);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title title="Resume" />
      <Resume allResume={results} />
    </div>

  );
}