import { Project } from "@/types/project";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import RichText from "./global/RichText";

interface ProjectDetailsModalProps {
    project: Project;
}

export default function ProjectDetailsModal({ project }: ProjectDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<string>(project.tabs[0].title);

    return (
        <div className="max-w-7xl mx-auto px-4 pt-20 overflow-y-auto z-50">
            <h3 className="font-montez text-7xl text-center">{project.title}</h3>
            <p className="font-alegreya-sans text-center max-w-[90ch] mx-auto text-[clamp(0.875rem,5.172vw-0.224rem,1.5rem)]! mt-5">{project.excerpt}</p>

            <div className="flex flex-wrap gap-4 justify-center mt-4">
                {project.tags.map((tag) => (
                    <span key={tag} className="font-alegreya-sans text-lg bg-[#231F1C]/50 px-4 py-2 rounded-lg">{tag}</span>
                ))}
            </div>

            <div className="relative">
                {project.heroMedia.type === "image" && (
                    <img src={project.heroMedia.url} alt={project.heroMedia.caption || project.title} loading="eager" className="w-full max-w-245 mx-auto h-auto mt-10" />
                )}
                {project.heroMedia.type === "video" && (
                    <video src={project.heroMedia.url} controls className="w-full max-w-245 mx-auto h-auto mt-10" />
                )}
            </div>

            <div className="mt-4 pb-20">
                <div className="flex max-md:overflow-x-auto md:justify-center items-center p-4 border-b border-[#231F1C]">
                    {project.tabs.map((tab) => (
                        <h4
                            key={tab.title}
                            className={`font-alegreya-sans-sc hover:scale-105 px-8 py-3 transition-all duration-300 text-2xl whitespace-nowrap
                                ${activeTab === tab.title ? 'rounded-lg bg-[#231F1C]/50 scale-105' : ''} cursor-pointer`}
                            onClick={(e) => {
                                setActiveTab(tab.title);
                                e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
                            }}
                        >{tab.title}</h4>
                    ))}
                </div>

                <div className="mt-10 grid grid-cols-12 gap-4">
                    {project.tabs.find((tab) => tab.title === activeTab)?.content?.map((content, index) => {
                        switch (content.type) {
                            case "title":
                            case "subtitle":
                            case "text":
                                return (
                                    <RichText key={index} text={content.value} className={twMerge("col-start-2 col-span-10 whitespace-pre-line text-[clamp(0.875rem,5.172vw-0.224rem,1.5rem)]!", content?.styles || "")} />
                                );
                            case "image":
                                return (
                                    <img key={index} src={content.url} alt="" loading="eager" className={twMerge("col-start-2 col-span-10", content?.styles || "")} />
                                );
                            case "gallery":
                                return (
                                    <div key={index} className={twMerge("grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 col-start-1 col-span-12", content?.styles || "")}>
                                        {content.images.map((image, imageIndex) => (
                                            <a
                                                key={imageIndex}
                                                href={`${image}-thumbnail.svg`}
                                                data-lightbox={content.lightboxTag ?? ""}
                                            >
                                                <img src={image} alt="" loading="eager" className="w-full h-auto" />
                                            </a>
                                        ))}
                                    </div>
                                );
                            case "video":
                                return (
                                    <video key={index} src={content.url} controls className={twMerge("col-start-2 col-span-10", content?.styles || "")} />
                                );

                            case "title-text":
                                return (
                                    <div key={index} className={twMerge("border border-[#231F1C] bg-[#231F1C]/15 rounded-lg p-4", content?.blockStyles || "")}>
                                        <h5 className={twMerge("font-alegreya-sans text-2xl font-bold", content?.titleStyles || "")}>{content.title}</h5>
                                        <RichText text={content.text} className={twMerge("whitespace-pre-line text-[clamp(0.875rem,5.172vw-0.224rem,1.5rem)]!", content?.textStyles || "")} />
                                        {content.media && (
                                            <div className={twMerge("mt-4", content.media.styles || "")}>
                                                {content.media.type === "image" && (
                                                    <img src={content.media.url} alt="" loading="eager" className="w-full h-auto" />
                                                )}

                                                {content.media.type === "video" && (
                                                    <video src={content.media.url} controls className="w-full h-auto" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            case "link":
                                return (
                                    <a key={index} href={content.url} target={content.target} rel={content.rel} className={twMerge("underline col-start-2 col-span-10", content?.styles || "")}>{content.text}</a>
                                );

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