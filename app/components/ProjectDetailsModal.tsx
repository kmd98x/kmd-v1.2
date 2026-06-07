import { Project } from "@/types/project";
import { useState } from "react";

interface ProjectDetailsModalProps {
    project: Project;
}

export default function ProjectDetailsModal({ project }: ProjectDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<string>(project.tabs[0].title);

    return (
        <div className="max-w-7xl mx-auto px-4 pt-20 overflow-y-auto z-50">
            <h3 className="font-montez text-7xl text-center">{project.title}</h3>
            <p className="font-alegreya-sans text-center max-w-[60ch] mx-auto text-[clamp(1rem,1.5vw+1rem,1.25rem)] mt-5">{project.excerpt}</p>

            <div className="flex flex-wrap gap-4 justify-center mt-10">
                {project.tags.map((tag) => (
                    <span key={tag} className="font-alegreya-sans text-sm bg-[#231F1C]/50 px-4 py-2 rounded-full">{tag}</span>
                ))}
            </div>

            <div className="relative">
                <span className="absolute bottom-0 blur-2xl rounded-full w-full h-10 "></span>
                {project.heroMedia.type === "image" && (
                    <img src={project.heroMedia.url} alt={project.heroMedia.caption || project.title} className="w-full h-auto mt-10" />
                )}
                {project.heroMedia.type === "video" && (
                    <video src={project.heroMedia.url} controls className="w-full h-auto mt-10" />
                )}
            </div>

            <div className="mt-10 bg-linear-to-br from-[#231F1C]/50 to-[#231F1C]/0 via-[#000000]/20 border border-[#231F1C]/50 border-b-0 rounded-tr-3xl rounded-tl-3xl p-10">
                <div className="flex flex-wrap justify-center items-center gap-10 p-4 border-b border-[#231F1C]/50">
                    {project.tabs.map((tab) => (
                        <h4
                            key={tab.title}
                            className={`font-alegreya-sans text-2xl 
                                ${activeTab === tab.title ? 'bg-black/75 rounded-lg px-8 py-3' : ''} cursor-pointer`}
                            onClick={() => setActiveTab(tab.title)}
                        >{tab.title}</h4>
                    ))}
                </div>

                <div className="mt-10 grid grid-cols-12 gap-4">
                    {project.tabs.find((tab) => tab.title === activeTab)?.content?.map((content, index) => {
                        switch (content.type) {
                            case "title":
                            case "subtitle":
                            case "text":
                                return <p key={index} className={content.styles}>{content.value}</p>;
                            case "image":
                                return <img key={index} src={content.url} alt="" className={content.styles} />;

                            case "video":
                                return <video key={index} src={content.url} controls className={content.styles} />;

                            default:
                                const _exhaustive: never = content;
                                return _exhaustive;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}