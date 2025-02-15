'use client'
import { Resume } from "@/interfaces"
import React from 'react'
// import { Button } from "../ui/button";
// import { Download } from "lucide-react";

function AppResume({ allResume }: { allResume: Resume[] }) {
    // const generatePDF = async (title: string) => {
    //     try {
    //         const pdfElement = document.getElementById(`${title}`);
    //         if (!pdfElement) {
    //             throw new Error('Element with ID "pdf-download" not found');
    //         }
    //         const htmlContent = pdfElement.outerHTML;
    //         const response = await fetch('/api/generate-pdf', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ htmlContent }),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to generate PDF');
    //         }

    //         const pdfBlob = await response.blob();
    //         const downloadUrl = URL.createObjectURL(pdfBlob);

    //         const downloadLink = document.createElement("a") as HTMLAnchorElement;
    //         downloadLink.href = downloadUrl;
    //         downloadLink.download = `${title}.pdf`;

    //         document.body.appendChild(downloadLink);
    //         downloadLink.click();

    //         document.body.removeChild(downloadLink);
    //         window.URL.revokeObjectURL(downloadUrl);
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //     }
    // };


    return (
        allResume.map((resume) => {
            const meta = resume.meta
            const data = resume.data
            return (
                <div key={meta.title}>
                    <div className="flex flex-wrap justify-between items-center">
                        {/* <Button variant="outline" onClick={() => { generatePDF(meta.title) }}><Download />Download as PDF</Button> */}
                        <div className="italic text-sm text-muted-foreground text-center md:text-start">{meta.lang.toUpperCase()} | {new Date(meta.date).toDateString()}</div>
                    </div>
                    <div className="w-full p-4 shadow-lg bg-white mb-4" id={`${meta.title}`}>
                        <header className="text-center mb-2">
                            <h1 className="text-3xl font-bold">{data.infos.name}</h1>
                            <div className="text-sm text-muted-foreground flex flex-wrap justify-center gap-2">
                                <span className="text-gray-600">
                                    {data.infos.location}
                                </span>
                                |
                                {data.infos.items.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <span key={item.url.href}>
                                            <a target="_blank" href={item.url.href} className="text-blue-500 hover:underline">
                                                {item.network}
                                            </a>
                                        </span>
                                        |
                                    </React.Fragment>
                                ))}
                                <span>
                                    <a target="_blank" href={`mailto:${data.infos.email}`} className="text-blue-500 hover:underline">
                                        {data.infos.email}
                                    </a>
                                </span>
                            </div>
                        </header>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{data.education.name}</h2>
                            <hr />
                            {data.education.items.map((edu) => (
                                <div key={edu.url.href} className="ml-5">
                                    <div className="flex flex-wrap justify-between items-center">
                                        <a target="_blank" href={edu.url.href} className="hover:underline"><h3 className="text-md font-medium">{edu.institution}</h3></a>
                                        <p className="text-gray-600 text-sm font-light">{edu.date}</p>
                                    </div>
                                    <p className="text-sm font-normal">{edu.studyType} - {edu.area}</p>
                                </div>
                            ))}
                        </section>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{data.skills.name}</h2>
                            <hr />
                            {data.skills.items.map((skill) => (
                                <div key={skill.name} className="mb-1 flex flex-wrap items-center gap-1 ml-5">
                                    <h3 className="text-md font-normal">{skill.name}: </h3>
                                    {skill.keywords.map((keyword, i) => (
                                        <span key={i} className="text-sm font-light">{keyword}{i === skill.keywords.length - 1 ? '' : ','}</span>
                                    ))}
                                </div>
                            ))}
                        </section>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{data.experience.name}</h2>
                            <hr />
                            {data.experience.items.map((exp) => (
                                <div key={exp.url.href} className="ml-5">
                                    <div className="flex flex-wrap justify-between items-center">
                                        <a target="_blank" href={exp.url.href} className="hover:underline"><h3 className="text-md font-medium">{exp.company}</h3></a>
                                        <p className="text-gray-600 text-sm font-light">{exp.date}</p>
                                    </div>
                                    <span className="text-sm font-normal">{exp.position} - {exp.location}</span>
                                    <ul className="list-disc ml-5 md:ml-10">
                                        {exp.summary.map((item, i) => (
                                            <li key={i} className="text-sm font-light">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{data.projects.name}</h2>
                            <hr />
                            {data.projects.items.map((proj) => (
                                <div key={proj.url.href} className="ml-5">
                                    <div className="flex flex-wrap justify-between items-center ">
                                        <a target="_blank" href={proj.url.href} className="hover:underline"><h3 className="text-md font-medium">{proj.url.label}</h3></a>
                                        <p className="text-gray-600 text-sm font-light">{proj.date}</p>
                                    </div>
                                    <ul className="list-disc ml-5 md:ml-10">
                                        {proj.summary.map((item, i) => (
                                            <li key={i} className="text-sm font-light">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    </div >
                </div >
            )
        })
    )
}

export default AppResume
