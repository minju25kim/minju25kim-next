'use client'
import { Resume } from "@/interfaces/Data"
import { useIsMobile } from '@/hooks/use-mobile';

function AppResume({ allResume }: { allResume: Resume[] }) {
    const isMobile = useIsMobile()
    return (
        <>
            {isMobile ?
                <h2>mobile</h2>
                :
                allResume.map((resume) => resume.data).map((resume, i) => (
                    <div key={i} className="w-full p-4 shadow-lg bg-white mb-4">
                        <header className="text-center mb-2">
                            <h1 className="text-3xl font-bold">{resume.infos.name}</h1>
                            <div className="text-sm text-muted-foreground">
                                <span className="text-gray-600">
                                    {resume.infos.location}
                                </span>
                                {' | '}
                                {resume.infos.items.map((item, index) => (
                                    <span key={index}>
                                        <a target="_blank" href={item.url.href} className="text-blue-500 hover:underline">
                                            {item.network}
                                        </a>
                                        {' | '}
                                    </span>
                                ))}
                                <span>
                                    <a target="_blank" href={`mailto:${resume.infos.email}`} className="text-blue-500 hover:underline">
                                        {resume.infos.email}
                                    </a>
                                </span>
                            </div>
                        </header>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{resume.education.name}</h2>
                            <hr />
                            {resume.education.items.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center">
                                        <a target="_blank" href={edu.url.href} className="hover:underline"><h3 className="text-md font-medium">{edu.institution}</h3></a>
                                        <p className="text-gray-600 text-sm font-light">{edu.date}</p>
                                    </div>
                                    <p className="text-md font-normal">{edu.studyType} - {edu.area}</p>
                                </div>
                            ))}
                        </section>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{resume.skills.name}</h2>
                            <hr />
                            {resume.skills.items.map((skill, index) => (
                                <div key={index} className="mb-1 flex items-center gap-1">
                                    <h3 className="text-md font-medium">{skill.name}: </h3>
                                    {skill.keywords.map((keyword, i) => (
                                        <span key={i} className="text-sm font-light">{keyword}{i === skill.keywords.length - 1 ? '' : ','}</span>
                                    ))}
                                </div>
                            ))}
                        </section>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{resume.experience.name}</h2>
                            <hr />
                            {resume.experience.items.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center">
                                        <a target="_blank" href={exp.url.href} className="hover:underline"><h3 className="text-md font-medium">{exp.company}</h3></a>
                                        <p className="text-gray-600 text-sm font-light">{exp.date}</p>
                                    </div>
                                    <span className="text-sm font-medium">{exp.position} - {exp.location}</span>
                                    <ul className="list-disc ml-10">
                                        {exp.summary.map((item, i) => (
                                            <li key={i} className="text-sm font-light">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                        <section className="mb-2">
                            <h2 className="text-xl font-semibold">{resume.projects.name}</h2>
                            <hr />
                            {resume.projects.items.map((proj, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center">
                                        <a target="_blank" href={proj.url.href} className="hover:underline"><h3 className="text-md font-medium">{proj.url.label}</h3></a>
                                        <p className="text-gray-600 text-sm font-light">{proj.date}</p>
                                    </div>
                                    <ul className="list-disc ml-10">
                                        {proj.summary.map((item, i) => (
                                            <li key={i} className="text-sm font-light">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    </div >
                ))
            }
        </>
    )
}

export default AppResume
